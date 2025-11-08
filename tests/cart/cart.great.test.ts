/** Testes ótimos de carrinho — parametrização e property-based. */
import { describe, expect, it } from "vitest";
import fc from "fast-check";
import { Cart } from "../../src/domain/cart";
import { Product } from "../../src/domain/product";

function p(id: string, price: number, name = id) {
  return new Product({ id, name, price });
}

describe("Cart - ótimos", () => {
  it.each([
    [[p("p1", 10), 2, p("p2", 5), 1], 25],
    [[p("p1", 3.33), 3, p("p1", 3.33), 2], 16.65], // mescla: 5 * 3.33
  ])("total esperado parametrizado", (seq: any[], expected: number) => {
    const cart = new Cart();
    for (let i = 0; i < seq.length; i += 2) {
      cart.add(seq[i] as Product, seq[i + 1] as number);
    }
    expect(cart.total()).toBeCloseTo(expected, 2);
  });

  it("property-based: somatório dos itens bate com total()", () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            id: fc.uuid(),
            name: fc
              .string({ minLength: 1, maxLength: 12 })
              .filter((s: string) => s.trim().length > 0),
            price: fc.float({ min: 0, max: 100000, noNaN: true })
          }),
          { minLength: 1, maxLength: 15 }
        ),
        fc.array(fc.nat({ max: 5 }).map((n) => Math.max(1, n)), { minLength: 1, maxLength: 15 }),
        (productsRec, qtys) => {
          const cart = new Cart();
          const prods = productsRec.map((r) => new Product(r));
          const len = Math.min(prods.length, qtys.length);
          for (let i = 0; i < len; i++) {cart.add(prods[i], qtys[i]);}
          // calcula total esperado em centavos como no domínio
          const expectedCents = cart
            .list()
            .map((i) => Math.round(i.price * 100) * i.qty)
            .reduce((a, b) => a + b, 0);
          return Math.abs(cart.total() * 100 - expectedCents) <= 0.5;
        }
      ),
      { numRuns: 50 }
    );
  });
});
