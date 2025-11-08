/** Testes bons de pedido/pagamento. */
import { describe, expect, it } from "vitest";
import { FakePaymentGateway } from "../../src/domain/payment";
import type { OrderItem } from "../../src/domain/order";
import { InMemoryOrderRepository, OrderService } from "../../src/domain/order";

function criarServico() {
  const repo = new InMemoryOrderRepository();
  const gateway = new FakePaymentGateway();
  gateway.setSuccess(() => "tx-xyz");
  const idSeq = (() => {
    let n = 0;
    return () => `order-${++n}`;
  })();
  return { svc: new OrderService({ repo, gateway, idGen: idSeq }), repo, gateway };
}

function item(id: string, price: number, qty: number, name = id): OrderItem {
  return { productId: id, name, unitPrice: price, qty };
}

describe("OrderService - bons", () => {
  it("deve criar pedido com pagamento sucesso", async () => {
    const { svc, repo } = criarServico();
    const order = await svc.placeOrder({
      items: [item("p1", 10, 2)],
      card: { number: "4111111111111111", holder: "A", exp: "12/30", cvv: "123" },
      idempotencyKey: "k1",
    });
    expect(order.total).toBe(20);
    expect(repo.getById(order.id)).toBe(order);
  });

  it("deve falhar em pagamento se gateway retornar FAILED", async () => {
    const { svc, gateway } = criarServico();
    gateway.setFailure("cartão recusado");
    await expect(
      svc.placeOrder({
        items: [item("p1", 5, 1)],
        card: { number: "4111111111111111", holder: "B", exp: "12/30", cvv: "321" },
        idempotencyKey: "k2",
      })
    ).rejects.toThrow(/cartão recusado/);
  });

  it("deve ser idempotente: mesma key não duplica pedido nem cobra novamente", async () => {
    const { svc } = criarServico();
    const first = await svc.placeOrder({
      items: [item("p1", 2.5, 2)],
      card: { number: "4111111111111111", holder: "C", exp: "12/30", cvv: "111" },
      idempotencyKey: "k3",
    });
    const second = await svc.placeOrder({
      items: [item("p1", 2.5, 2)],
      card: { number: "4111111111111111", holder: "C", exp: "12/30", cvv: "111" },
      idempotencyKey: "k3",
    });
    expect(second.id).toBe(first.id);
  });

  it("deve falhar se pedido sem itens", async () => {
    const { svc } = criarServico();
    await expect(
      svc.placeOrder({
        items: [],
        card: { number: "4111111111111111", holder: "Z", exp: "12/30", cvv: "999" },
        idempotencyKey: "k4",
      })
    ).rejects.toThrow(/sem itens/);
  });
});
