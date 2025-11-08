/** Testes ruins (anti-padrões) — NÃO copie este estilo. */
import { describe, expect, it } from "vitest";
import { InMemoryUserRepository, UserService } from "../../src/domain/user";

// Estado global compartilhado indevidamente (NÃO FAÇA ISSO)
const REPO_COMPARTILHADO = new InMemoryUserRepository();
const SERVICE_COMPARTILHADO = new UserService(REPO_COMPARTILHADO);

describe("UserService - ruins", () => {
  it("tudo ao mesmo tempo sem clareza", () => {
    const u1 = SERVICE_COMPARTILHADO.register("a@a.com", "123456");
    expect(u1.id.startsWith("user-")).toBe(true);
    expect(u1.email).toBe("a@a.com");

    const u2 = SERVICE_COMPARTILHADO.register("b@b.com", "123456");
    expect(REPO_COMPARTILHADO.getByEmail("b@b.com")!.email).toBe("b@b.com");

    try {
      SERVICE_COMPARTILHADO.register("a@a.com", "123456");
      expect(false).toBe(true); // deveria falhar, mas estilo ruim
    } catch (e) {
      expect(true).toBe(true); // captura genérica
    }
  });

  it("nome_ruim", () => {
    const x = SERVICE_COMPARTILHADO.register("c@c.com", "123456");
    expect(x.email).toBe("c@c.com");
  });
});
