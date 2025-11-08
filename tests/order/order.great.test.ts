/** Testes ótimos de pedido/pagamento — idempotência e property-based. */
import { describe, expect, it } from "vitest";
import fc from "fast-check";
import { FakePaymentGateway } from "../../src/domain/payment";
import type { OrderItem } from "../../src/domain/order";
import { InMemoryOrderRepository, OrderService } from "../../src/domain/order";

function serviceBuilder() {
  const repo = new InMemoryOrderRepository();
  const gateway = new FakePaymentGateway();
  gateway.setSuccess(() => "tx-ok");
  let n = 0;
  const idGen = () => `ord-${++n}`;
  return { svc: new OrderService({ repo, gateway, idGen }), repo, gateway };
}

function makeItem(id: string, price: number, qty: number, name = id): OrderItem {
  return { productId: id, name, unitPrice: price, qty };
}

describe("OrderService - ótimos", () => {
  it("idempotência com mesma key retorna mesmo pedido", async () => {
    const { svc } = serviceBuilder();
    const items = [makeItem("p1", 1.99, 2)];
    const card = { number: "4111", holder: "A", exp: "12/30", cvv: "1" };
    const o1 = await svc.placeOrder({ items, card, idempotencyKey: "K" });
    const o2 = await svc.placeOrder({ items, card, idempotencyKey: "K" });
    expect(o2.id).toBe(o1.id);
  });

  it("property-based: total é a soma dos itens em centavos", async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(
          fc.record({
            id: fc.uuid(),
            name: fc
              .string({ minLength: 1, maxLength: 12 })
              .filter((s: string) => s.trim().length > 0),
            // Evita preços subnormais próximos de zero que causam total 0
            price: fc.double({ min: 0.01, max: 100000, noNaN: true }),
          }),
          { minLength: 1, maxLength: 10 }
        ),
        fc.array(fc.nat({ max: 5 }).map((n) => Math.max(1, n)), { minLength: 1, maxLength: 10 }),
        async (recProducts, qtys) => {
          const items: OrderItem[] = [];
          const len = Math.min(recProducts.length, qtys.length);
          for (let i = 0; i < len; i++) {
            items.push({ productId: recProducts[i].id, name: recProducts[i].name, unitPrice: recProducts[i].price, qty: qtys[i] });
          }
          const { svc } = serviceBuilder();
          const order = await svc.placeOrder({ items, card: { number: "4111", holder: "T", exp: "12/30", cvv: "1" }, idempotencyKey: String(Math.random()) });
          const expectedCents = items
            .map((i) => Math.round(i.unitPrice * 100) * i.qty)
            .reduce((a, b) => a + b, 0);
          return Math.abs(order.total * 100 - expectedCents) <= 0.5;
        }
      ),
      { numRuns: 40 }
    );
  });

  it.each([
  [[makeItem("p1", 0.1, 3), makeItem("p2", 0.2, 2)], 0.7],
  [[makeItem("p1", 1.005, 1)], 1.01],
  ])("parametrizado: arredondamento esperado", async (items: OrderItem[], expected: number) => {
    const { svc } = serviceBuilder();
    const order = await svc.placeOrder({ items, card: { number: "4111", holder: "R", exp: "12/30", cvv: "1" }, idempotencyKey: `key-${Math.random()}` });
    expect(order.total).toBeCloseTo(expected, 2);
  });
});
