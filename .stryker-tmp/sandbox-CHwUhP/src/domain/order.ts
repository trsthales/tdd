/**
 * Domínio de Pedido (Order) e serviço de criação com pagamento.
 *
 * Regras:
 * - Cria pedido apenas quando pagamento SUCCESS.
 * - Idempotência por idempotencyKey: várias chamadas com a mesma key retornam
 *   o mesmo pedido, sem nova cobrança.
 */
// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
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
    if (stryMutAct_9fa48("75")) {
      {}
    } else {
      stryCov_9fa48("75");
      this.id = params.id;
      this.items = params.items;
      this.total = params.total;
      this.transactionId = params.transactionId;
    }
  }
}
export interface OrderRepository {
  save(order: Order): Order;
  getById(id: string): Order | undefined;
}
export class InMemoryOrderRepository implements OrderRepository {
  private byId = new Map<string, Order>();
  save(order: Order): Order {
    if (stryMutAct_9fa48("76")) {
      {}
    } else {
      stryCov_9fa48("76");
      this.byId.set(order.id, order);
      return order;
    }
  }
  getById(id: string): Order | undefined {
    if (stryMutAct_9fa48("77")) {
      {}
    } else {
      stryCov_9fa48("77");
      return this.byId.get(id);
    }
  }
}
export class OrderService {
  private readonly repo: OrderRepository;
  private readonly gateway: PaymentGateway;
  private readonly idGen: () => string;
  private readonly keyToOrderId = new Map<string, string>();
  constructor(opts: {
    repo: OrderRepository;
    gateway: PaymentGateway;
    idGen?: () => string;
  }) {
    if (stryMutAct_9fa48("78")) {
      {}
    } else {
      stryCov_9fa48("78");
      this.repo = opts.repo;
      this.gateway = opts.gateway;
      this.idGen = stryMutAct_9fa48("79") ? opts.idGen && (() => "order-1") : (stryCov_9fa48("79"), opts.idGen ?? (stryMutAct_9fa48("80") ? () => undefined : (stryCov_9fa48("80"), () => stryMutAct_9fa48("81") ? "" : (stryCov_9fa48("81"), "order-1"))));
    }
  }
  private static sumMoney(items: OrderItem[]): Money {
    if (stryMutAct_9fa48("82")) {
      {}
    } else {
      stryCov_9fa48("82");
      return items.reduce(stryMutAct_9fa48("83") ? () => undefined : (stryCov_9fa48("83"), (acc: Money, i) => acc.add(Money.fromNumber(i.unitPrice).multiply(i.qty))), Money.zero());
    }
  }
  async placeOrder(params: {
    items: OrderItem[];
    card: CardInfo;
    idempotencyKey: string;
    orderId?: string;
  }): Promise<Order> {
    if (stryMutAct_9fa48("84")) {
      {}
    } else {
      stryCov_9fa48("84");
      if (stryMutAct_9fa48("87") ? false : stryMutAct_9fa48("86") ? true : stryMutAct_9fa48("85") ? params.items.length : (stryCov_9fa48("85", "86", "87"), !params.items.length)) {
        if (stryMutAct_9fa48("88")) {
          {}
        } else {
          stryCov_9fa48("88");
          throw new Error(stryMutAct_9fa48("89") ? "" : (stryCov_9fa48("89"), "pedido sem itens"));
        }
      }
      if (stryMutAct_9fa48("92") ? false : stryMutAct_9fa48("91") ? true : stryMutAct_9fa48("90") ? params.idempotencyKey : (stryCov_9fa48("90", "91", "92"), !params.idempotencyKey)) {
        if (stryMutAct_9fa48("93")) {
          {}
        } else {
          stryCov_9fa48("93");
          throw new Error(stryMutAct_9fa48("94") ? "" : (stryCov_9fa48("94"), "idempotencyKey ausente"));
        }
      }

      // Idempotência: retorna o mesmo pedido se a key já foi usada.
      const existingOrderId = this.keyToOrderId.get(params.idempotencyKey);
      if (stryMutAct_9fa48("96") ? false : stryMutAct_9fa48("95") ? true : (stryCov_9fa48("95", "96"), existingOrderId)) {
        if (stryMutAct_9fa48("97")) {
          {}
        } else {
          stryCov_9fa48("97");
          const found = this.repo.getById(existingOrderId);
          if (stryMutAct_9fa48("99") ? false : stryMutAct_9fa48("98") ? true : (stryCov_9fa48("98", "99"), found)) {
            if (stryMutAct_9fa48("100")) {
              {}
            } else {
              stryCov_9fa48("100");
              return found;
            }
          }
        }
      }
      const total = OrderService.sumMoney(params.items).toNumber();
      const result = await this.gateway.charge(total, params.card);
      if (stryMutAct_9fa48("103") ? result.status === "SUCCESS" : stryMutAct_9fa48("102") ? false : stryMutAct_9fa48("101") ? true : (stryCov_9fa48("101", "102", "103"), result.status !== (stryMutAct_9fa48("104") ? "" : (stryCov_9fa48("104"), "SUCCESS")))) {
        if (stryMutAct_9fa48("105")) {
          {}
        } else {
          stryCov_9fa48("105");
          throw new Error(stryMutAct_9fa48("106") ? result.errorMessage && "pagamento falhou" : (stryCov_9fa48("106"), result.errorMessage ?? (stryMutAct_9fa48("107") ? "" : (stryCov_9fa48("107"), "pagamento falhou"))));
        }
      }
      const id = stryMutAct_9fa48("108") ? params.orderId && this.idGen() : (stryCov_9fa48("108"), params.orderId ?? this.idGen());
      const order = new Order(stryMutAct_9fa48("109") ? {} : (stryCov_9fa48("109"), {
        id,
        items: params.items,
        total,
        transactionId: stryMutAct_9fa48("110") ? result.transactionId && "tx" : (stryCov_9fa48("110"), result.transactionId ?? (stryMutAct_9fa48("111") ? "" : (stryCov_9fa48("111"), "tx")))
      }));
      this.repo.save(order);
      this.keyToOrderId.set(params.idempotencyKey, id);
      return order;
    }
  }
}