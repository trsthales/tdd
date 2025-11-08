/**
 * Domínio de Pagamento.
 *
 * Objetivo: abstrair um gateway de pagamento para que testes de Order possam
 * simular sucesso/falha/timeout sem dependências externas reais.
 *
 * Regras esperadas por OrderService:
 * - charge retorna PaymentResult com status SUCCESS ou FAILED.
 * - Em caso de timeout (simulado), pode lançar Error específica.
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
export type CardInfo = {
  number: string;
  holder: string;
  exp: string;
  cvv: string;
};
export type PaymentResult = {
  status: "SUCCESS" | "FAILED";
  transactionId?: string;
  errorMessage?: string;
};
export interface PaymentGateway {
  charge(amount: number, card: CardInfo): Promise<PaymentResult>;
}

/** Fake configurável para testes. */
export class FakePaymentGateway implements PaymentGateway {
  private behavior: {
    kind: "success";
    txGenerator?: () => string;
  } | {
    kind: "failure";
    message?: string;
  } | {
    kind: "timeout";
  } = stryMutAct_9fa48("68") ? {} : (stryCov_9fa48("68"), {
    kind: stryMutAct_9fa48("69") ? "" : (stryCov_9fa48("69"), "success")
  });
  setSuccess(txGenerator: () => string = stryMutAct_9fa48("70") ? () => undefined : (stryCov_9fa48("70"), () => stryMutAct_9fa48("71") ? "" : (stryCov_9fa48("71"), "tx-1"))): void {
    if (stryMutAct_9fa48("72")) {
      {}
    } else {
      stryCov_9fa48("72");
      this.behavior = stryMutAct_9fa48("73") ? {} : (stryCov_9fa48("73"), {
        kind: stryMutAct_9fa48("74") ? "" : (stryCov_9fa48("74"), "success"),
        txGenerator
      });
    }
  }
  setFailure(message = stryMutAct_9fa48("75") ? "" : (stryCov_9fa48("75"), "falha no gateway")): void {
    if (stryMutAct_9fa48("76")) {
      {}
    } else {
      stryCov_9fa48("76");
      this.behavior = stryMutAct_9fa48("77") ? {} : (stryCov_9fa48("77"), {
        kind: stryMutAct_9fa48("78") ? "" : (stryCov_9fa48("78"), "failure"),
        message
      });
    }
  }
  setTimeout(): void {
    if (stryMutAct_9fa48("79")) {
      {}
    } else {
      stryCov_9fa48("79");
      this.behavior = stryMutAct_9fa48("80") ? {} : (stryCov_9fa48("80"), {
        kind: stryMutAct_9fa48("81") ? "" : (stryCov_9fa48("81"), "timeout")
      });
    }
  }
  async charge(amount: number, _card: CardInfo): Promise<PaymentResult> {
    if (stryMutAct_9fa48("82")) {
      {}
    } else {
      stryCov_9fa48("82");
      if (stryMutAct_9fa48("86") ? amount > 0 : stryMutAct_9fa48("85") ? amount < 0 : stryMutAct_9fa48("84") ? false : stryMutAct_9fa48("83") ? true : (stryCov_9fa48("83", "84", "85", "86"), amount <= 0)) {
        if (stryMutAct_9fa48("87")) {
          {}
        } else {
          stryCov_9fa48("87");
          return stryMutAct_9fa48("88") ? {} : (stryCov_9fa48("88"), {
            status: stryMutAct_9fa48("89") ? "" : (stryCov_9fa48("89"), "FAILED"),
            errorMessage: stryMutAct_9fa48("90") ? "" : (stryCov_9fa48("90"), "valor inválido")
          });
        }
      }
      switch (this.behavior.kind) {
        case stryMutAct_9fa48("92") ? "" : (stryCov_9fa48("92"), "success"):
          if (stryMutAct_9fa48("91")) {} else {
            stryCov_9fa48("91");
            return stryMutAct_9fa48("93") ? {} : (stryCov_9fa48("93"), {
              status: stryMutAct_9fa48("94") ? "" : (stryCov_9fa48("94"), "SUCCESS"),
              transactionId: stryMutAct_9fa48("95") ? this.behavior.txGenerator?.() && "tx-default" : (stryCov_9fa48("95"), (stryMutAct_9fa48("96") ? this.behavior.txGenerator() : (stryCov_9fa48("96"), this.behavior.txGenerator?.())) ?? (stryMutAct_9fa48("97") ? "" : (stryCov_9fa48("97"), "tx-default")))
            });
          }
        case stryMutAct_9fa48("99") ? "" : (stryCov_9fa48("99"), "failure"):
          if (stryMutAct_9fa48("98")) {} else {
            stryCov_9fa48("98");
            return stryMutAct_9fa48("100") ? {} : (stryCov_9fa48("100"), {
              status: stryMutAct_9fa48("101") ? "" : (stryCov_9fa48("101"), "FAILED"),
              errorMessage: this.behavior.message
            });
          }
        case stryMutAct_9fa48("103") ? "" : (stryCov_9fa48("103"), "timeout"):
          if (stryMutAct_9fa48("102")) {} else {
            stryCov_9fa48("102");
            throw new Error(stryMutAct_9fa48("104") ? "" : (stryCov_9fa48("104"), "timeout pagamento"));
          }
      }
    }
  }
}