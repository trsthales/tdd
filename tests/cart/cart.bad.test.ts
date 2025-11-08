/** Testes ruins de carrinho — anti-padrões intencionais. */
import { describe, expect, it } from "vitest";
import { Cart } from "../../src/domain/cart";
import { Product } from "../../src/domain/product";

// Compartilhando estado global (ruim)
const CART = new Cart();

describe("Cart - ruins", () => {
  it("tudo misturado: add, remove, total sem clareza", () => {
    const p1 = new Product({ id: "p1", name: "A", price: 1.11 });
    const p2 = new Product({ id: "p2", name: "B", price: 2.22 });
    CART.add(p1, 2);
    CART.add(p2, 3);
    expect(CART.total()).toBeGreaterThan(0);
    CART.remove("p1");
    expect(CART.list().length).toBeGreaterThan(0);
  });

  it("nome ruim e valores mágicos", () => {
    const x = new Product({ id: "p3", name: "x", price: 3.33 });
    CART.add(x, 1);
    expect(CART.list()[0].name.length).toBeGreaterThan(0);
  });
});
