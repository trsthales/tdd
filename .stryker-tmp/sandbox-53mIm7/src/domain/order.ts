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
    if (stryMutAct_9fa48("25")) {
      {}
    } else {
      stryCov_9fa48("25");
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
    if (stryMutAct_9fa48("26")) {
      {}
    } else {
      stryCov_9fa48("26");
      this.byId.set(order.id, order);
      return order;
    }
  }
  getById(id: string): Order | undefined {
    if (stryMutAct_9fa48("27")) {
      {}
    } else {
      stryCov_9fa48("27");
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
    if (stryMutAct_9fa48("28")) {
      {}
    } else {
      stryCov_9fa48("28");
      this.repo = opts.repo;
      this.gateway = opts.gateway;
      this.idGen = stryMutAct_9fa48("29") ? opts.idGen && (() => "order-1") : (stryCov_9fa48("29"), opts.idGen ?? (stryMutAct_9fa48("30") ? () => undefined : (stryCov_9fa48("30"), () => stryMutAct_9fa48("31") ? "" : (stryCov_9fa48("31"), "order-1"))));
    }
  }
  private static sumCents(items: OrderItem[]): number {
    if (stryMutAct_9fa48("32")) {
      {}
    } else {
      stryCov_9fa48("32");
      // Usa correção de floating point para valores como 1.005 que em binário
      // podem virar 1.004999... evitando arredondar incorretamente.
      return items.map(stryMutAct_9fa48("33") ? () => undefined : (stryCov_9fa48("33"), i => stryMutAct_9fa48("34") ? Math.round((i.unitPrice + Number.EPSILON) * 100) / i.qty : (stryCov_9fa48("34"), Math.round(stryMutAct_9fa48("35") ? (i.unitPrice + Number.EPSILON) / 100 : (stryCov_9fa48("35"), (stryMutAct_9fa48("36") ? i.unitPrice - Number.EPSILON : (stryCov_9fa48("36"), i.unitPrice + Number.EPSILON)) * 100)) * i.qty))).reduce(stryMutAct_9fa48("37") ? () => undefined : (stryCov_9fa48("37"), (a, b) => stryMutAct_9fa48("38") ? a - b : (stryCov_9fa48("38"), a + b)), 0);
    }
  }
  async placeOrder(params: {
    items: OrderItem[];
    card: CardInfo;
    idempotencyKey: string;
    orderId?: string;
  }): Promise<Order> {
    if (stryMutAct_9fa48("39")) {
      {}
    } else {
      stryCov_9fa48("39");
      if (stryMutAct_9fa48("42") ? false : stryMutAct_9fa48("41") ? true : stryMutAct_9fa48("40") ? params.items.length : (stryCov_9fa48("40", "41", "42"), !params.items.length)) {
        if (stryMutAct_9fa48("43")) {
          {}
        } else {
          stryCov_9fa48("43");
          throw new Error(stryMutAct_9fa48("44") ? "" : (stryCov_9fa48("44"), "pedido sem itens"));
        }
      }
      if (stryMutAct_9fa48("47") ? false : stryMutAct_9fa48("46") ? true : stryMutAct_9fa48("45") ? params.idempotencyKey : (stryCov_9fa48("45", "46", "47"), !params.idempotencyKey)) {
        if (stryMutAct_9fa48("48")) {
          {}
        } else {
          stryCov_9fa48("48");
          throw new Error(stryMutAct_9fa48("49") ? "" : (stryCov_9fa48("49"), "idempotencyKey ausente"));
        }
      }

      // Idempotência: retorna o mesmo pedido se a key já foi usada.
      const existingOrderId = this.keyToOrderId.get(params.idempotencyKey);
      if (stryMutAct_9fa48("51") ? false : stryMutAct_9fa48("50") ? true : (stryCov_9fa48("50", "51"), existingOrderId)) {
        if (stryMutAct_9fa48("52")) {
          {}
        } else {
          stryCov_9fa48("52");
          const found = this.repo.getById(existingOrderId);
          if (stryMutAct_9fa48("54") ? false : stryMutAct_9fa48("53") ? true : (stryCov_9fa48("53", "54"), found)) {
            if (stryMutAct_9fa48("55")) {
              {}
            } else {
              stryCov_9fa48("55");
              return found;
            }
          }
        }
      }
      const totalCents = OrderService.sumCents(params.items);
      const total = stryMutAct_9fa48("56") ? Math.round(totalCents) * 100 : (stryCov_9fa48("56"), Math.round(totalCents) / 100);
      const result = await this.gateway.charge(total, params.card);
      if (stryMutAct_9fa48("59") ? result.status === "SUCCESS" : stryMutAct_9fa48("58") ? false : stryMutAct_9fa48("57") ? true : (stryCov_9fa48("57", "58", "59"), result.status !== (stryMutAct_9fa48("60") ? "" : (stryCov_9fa48("60"), "SUCCESS")))) {
        if (stryMutAct_9fa48("61")) {
          {}
        } else {
          stryCov_9fa48("61");
          throw new Error(stryMutAct_9fa48("62") ? result.errorMessage && "pagamento falhou" : (stryCov_9fa48("62"), result.errorMessage ?? (stryMutAct_9fa48("63") ? "" : (stryCov_9fa48("63"), "pagamento falhou"))));
        }
      }
      const id = stryMutAct_9fa48("64") ? params.orderId && this.idGen() : (stryCov_9fa48("64"), params.orderId ?? this.idGen());
      const order = new Order(stryMutAct_9fa48("65") ? {} : (stryCov_9fa48("65"), {
        id,
        items: params.items,
        total,
        transactionId: stryMutAct_9fa48("66") ? result.transactionId && "tx" : (stryCov_9fa48("66"), result.transactionId ?? (stryMutAct_9fa48("67") ? "" : (stryCov_9fa48("67"), "tx")))
      }));
      this.repo.save(order);
      this.keyToOrderId.set(params.idempotencyKey, id);
      return order;
    }
  }
}