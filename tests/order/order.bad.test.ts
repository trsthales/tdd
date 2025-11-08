/** Testes ruins de pedido/pagamento — anti-padrões. */
import { describe, expect, it } from "vitest";
import { FakePaymentGateway } from "../../src/domain/payment";
import { InMemoryOrderRepository, OrderService } from "../../src/domain/order";

// Estado global compartilhado
const REPO = new InMemoryOrderRepository();
const GATEWAY = new FakePaymentGateway();
const SVC = new OrderService({ repo: REPO, gateway: GATEWAY });

describe("OrderService - ruins", () => {
  it("faz tudo junto", async () => {
    GATEWAY.setSuccess();
    const order = await SVC.placeOrder({
      items: [{ productId: "p", name: "P", unitPrice: 1, qty: 1 }],
      card: { number: "4111", holder: "A", exp: "12/30", cvv: "1" },
      idempotencyKey: "x",
    });
    expect(order.total).toBeGreaterThan(0);
    GATEWAY.setFailure();
    try {
      await SVC.placeOrder({
        items: [{ productId: "p2", name: "P2", unitPrice: 2, qty: 2 }],
        card: { number: "4111", holder: "A", exp: "12/30", cvv: "1" },
        idempotencyKey: "y",
      });
      expect(false).toBe(true);
    } catch (e) {
      expect(true).toBe(true);
    }
  });

  it("nome ruim", async () => {
    GATEWAY.setSuccess();
    const o = await SVC.placeOrder({
      items: [{ productId: "p3", name: "X", unitPrice: 3, qty: 1 }],
      card: { number: "4111", holder: "B", exp: "12/30", cvv: "1" },
      idempotencyKey: "z",
    });
    expect(o.id.length).toBeGreaterThan(0);
  });
});
