/** Testes ótimos (avançados) — exploram mais casos com pouco código. */
import { describe, expect, it } from "vitest";
import fc from "fast-check";
import { InMemoryUserRepository, User, UserService } from "../../src/domain/user";

function serviceBuilder() {
  const repo = new InMemoryUserRepository();
  let n = 0;
  const gen = () => `usr-${++n}`;
  return { svc: new UserService(repo, gen), repo };
}

describe("UserService - ótimos", () => {
  it.each([
    ["param1@example.com", "abcdef"],
    ["param2@example.com", "123456"],
    ["user.name+tag@dominio.org", "segura1"],
  ])("registro parametrizado %s", (email: string, password: string) => {
    const { svc, repo } = serviceBuilder();
    const user = svc.register(email, password);
    expect(repo.getByEmail(email)).toBe(user);
    expect(user.passwordHash.startsWith("hash::")).toBe(true);
  });

  it("property-based e-mails válidos", () => {
    fc.assert(
      fc.property(
  fc.string({ minLength: 1, maxLength: 10 }).filter((s: string) => !s.includes("@") && !s.includes(" ")),
  fc.string({ minLength: 1, maxLength: 10 }).filter((s: string) => !s.includes("@") && !s.includes(" ")),
  fc.constantFrom("com", "org", "io", "net"),
  (local: string, domain: string, tld: string) => {
          const email = `${local}@${domain}.${tld}`;
          const { svc } = serviceBuilder();
          const user = svc.register(email, "123456");
          return user.email === email;
        }
      ),
      { numRuns: 50 }
    );
  });

  it("id custom injetado", () => {
    const repo = new InMemoryUserRepository();
    const svc = new UserService(repo, () => "custom-id");
    const user = svc.register("injetado@example.com", "abcdef");
    expect(user.id).toBe("custom-id");
  });

  it("entidade User validação levanta", () => {
    expect(() => new User({ id: "x", email: "sem-arroba", passwordHash: "hash::x" })).toThrow();
  });
});
