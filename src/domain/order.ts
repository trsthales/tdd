/**
 * Domínio de Pedido (Order) e serviço de criação com pagamento.
 *
 * Regras:
 * - Cria pedido apenas quando pagamento SUCCESS.
 * - Idempotência por idempotencyKey: várias chamadas com a mesma key retornam
 *   o mesmo pedido, sem nova cobrança.
 */

import type { CardInfo, PaymentGateway } from "./payment";
import { Money } from "./money";

export type OrderItem = {
  productId: string;
  name: string;
  unitPrice: number; // decimal
  qty: number;
};

export class Order {
  public readonly id: string;
  public readonly items: OrderItem[];
  public readonly total: number; // decimal
  public readonly transactionId: string;

  constructor(params: {
    id: string;
    items: OrderItem[];
    total: number;
    transactionId: string;
  }) {
    this.id = params.id;
    this.items = params.items;
    this.total = params.total;
    this.transactionId = params.transactionId;
  }
}

export interface OrderRepository {
  save(order: Order): Order;
  getById(id: string): Order | undefined;
}

export class InMemoryOrderRepository implements OrderRepository {
  private byId = new Map<string, Order>();
  save(order: Order): Order {
    this.byId.set(order.id, order);
    return order;
  }
  getById(id: string): Order | undefined {
    return this.byId.get(id);
  }
}

export class OrderService {
  private readonly repo: OrderRepository;
  private readonly gateway: PaymentGateway;
  private readonly idGen: () => string;
  private readonly keyToOrderId = new Map<string, string>();

  constructor(opts: { repo: OrderRepository; gateway: PaymentGateway; idGen?: () => string }) {
    this.repo = opts.repo;
    this.gateway = opts.gateway;
    this.idGen = opts.idGen ?? (() => "order-1");
  }

  private static sumMoney(items: OrderItem[]): Money {
    return items.reduce(
      (acc: Money, i) => acc.add(Money.fromNumber(i.unitPrice).multiply(i.qty)),
      Money.zero()
    );
  }

  async placeOrder(params: {
    items: OrderItem[];
    card: CardInfo;
    idempotencyKey: string;
    orderId?: string;
  }): Promise<Order> {
    if (!params.items.length) {throw new Error("pedido sem itens");}
    if (!params.idempotencyKey) {throw new Error("idempotencyKey ausente");}

    // Idempotência: retorna o mesmo pedido se a key já foi usada.
    const existingOrderId = this.keyToOrderId.get(params.idempotencyKey);
    if (existingOrderId) {
      const found = this.repo.getById(existingOrderId);
      if (found) {return found;}
    }

  const total = OrderService.sumMoney(params.items).toNumber();
    const result = await this.gateway.charge(total, params.card);
    if (result.status !== "SUCCESS") {
      throw new Error(result.errorMessage ?? "pagamento falhou");
    }

    const id = params.orderId ?? this.idGen();
    const order = new Order({ id, items: params.items, total, transactionId: result.transactionId ?? "tx" });
    this.repo.save(order);
    this.keyToOrderId.set(params.idempotencyKey, id);
    return order;
  }
}
