/** Testes bons de carrinho: cada comportamento isolado. */
import { describe, expect, it } from "vitest";
import { Cart } from "../../src/domain/cart";
import { Product } from "../../src/domain/product";

function produto(id: string, price: number, name = id): Product {
  return new Product({ id, name, price });
}

describe("Cart - bons", () => {
  it("deve adicionar item novo", () => {
    const cart = new Cart();
    cart.add(produto("p1", 10, "Item"), 2);
    expect(cart.list()).toHaveLength(1);
    expect(cart.list()[0].qty).toBe(2);
  });

  it("deve mesclar quantidades de mesmo produto", () => {
    const cart = new Cart();
    cart.add(produto("p1", 5), 1);
    cart.add(produto("p1", 5), 3);
    const item = cart.list()[0];
    expect(item.qty).toBe(4);
  });

  it("deve calcular total com múltiplos itens", () => {
    const cart = new Cart();
    cart.add(produto("p1", 10), 2); // 20
    cart.add(produto("p2", 3.5), 1); // 3.5
    expect(cart.total()).toBe(23.5);
  });

  it("deve remover item pelo id", () => {
    const cart = new Cart();
    cart.add(produto("p1", 5), 1);
    cart.remove("p1");
    expect(cart.list()).toHaveLength(0);
  });

  it("deve falhar ao adicionar qty <= 0", () => {
    const cart = new Cart();
    expect(() => cart.add(produto("p1", 5), 0)).toThrow();
    expect(() => cart.add(produto("p2", 5), -2)).toThrow();
  });
});
