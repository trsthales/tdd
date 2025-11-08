/** Testes bons: claros, focados, uma razão principal de falha. */
import { describe, expect, it } from "vitest";
import { InMemoryUserRepository, UserService } from "../../src/domain/user";

function criarServico(idSeq?: () => string) {
  const repo = new InMemoryUserRepository();
  let n = 0;
  const gen = () => `user-${++n}`;
  return { svc: new UserService(repo, idSeq ?? gen), repo };
}

describe("UserService - bons", () => {
  it("deve registrar usuário válido", () => {
    // Arrange
    const { svc, repo } = criarServico();
    // Act
    const user = svc.register("alice@example.com", "segura1");
    // Assert
    expect(user.email).toBe("alice@example.com");
    expect(repo.getByEmail("alice@example.com")).toBe(user);
  });

  it.each([["a@b.com"], ["user.name@dominio.io"], ["x@y.org"]])(
    "deve aceitar vários emails válidos: %s",
    (email: string) => {
      const { svc } = criarServico();
      const user = svc.register(email, "abcdef");
      expect(user.email).toBe(email);
    }
  );

  it("deve rejeitar email inválido", () => {
    const { svc } = criarServico();
    expect(() => svc.register("invalido-sem-arroba", "abcdef")).toThrow();
  });

  it("deve rejeitar senha curta", () => {
    const { svc } = criarServico();
    for (const short of ["", "123", "abc", "12ab"]) {
      expect(() => svc.register("bob@example.com", short)).toThrow();
    }
  });

  it("deve rejeitar email duplicado", () => {
    const { svc } = criarServico();
    svc.register("dup@example.com", "abcdef");
    expect(() => svc.register("dup@example.com", "abcdef")).toThrow();
  });
});
