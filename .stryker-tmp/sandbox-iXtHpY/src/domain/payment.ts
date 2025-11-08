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
  } = stryMutAct_9fa48("112") ? {} : (stryCov_9fa48("112"), {
    kind: stryMutAct_9fa48("113") ? "" : (stryCov_9fa48("113"), "success")
  });
  setSuccess(txGenerator: () => string = stryMutAct_9fa48("114") ? () => undefined : (stryCov_9fa48("114"), () => stryMutAct_9fa48("115") ? "" : (stryCov_9fa48("115"), "tx-1"))): void {
    if (stryMutAct_9fa48("116")) {
      {}
    } else {
      stryCov_9fa48("116");
      this.behavior = stryMutAct_9fa48("117") ? {} : (stryCov_9fa48("117"), {
        kind: stryMutAct_9fa48("118") ? "" : (stryCov_9fa48("118"), "success"),
        txGenerator
      });
    }
  }
  setFailure(message = stryMutAct_9fa48("119") ? "" : (stryCov_9fa48("119"), "falha no gateway")): void {
    if (stryMutAct_9fa48("120")) {
      {}
    } else {
      stryCov_9fa48("120");
      this.behavior = stryMutAct_9fa48("121") ? {} : (stryCov_9fa48("121"), {
        kind: stryMutAct_9fa48("122") ? "" : (stryCov_9fa48("122"), "failure"),
        message
      });
    }
  }
  setTimeout(): void {
    if (stryMutAct_9fa48("123")) {
      {}
    } else {
      stryCov_9fa48("123");
      this.behavior = stryMutAct_9fa48("124") ? {} : (stryCov_9fa48("124"), {
        kind: stryMutAct_9fa48("125") ? "" : (stryCov_9fa48("125"), "timeout")
      });
    }
  }
  async charge(amount: number, _card: CardInfo): Promise<PaymentResult> {
    if (stryMutAct_9fa48("126")) {
      {}
    } else {
      stryCov_9fa48("126");
      if (stryMutAct_9fa48("130") ? amount > 0 : stryMutAct_9fa48("129") ? amount < 0 : stryMutAct_9fa48("128") ? false : stryMutAct_9fa48("127") ? true : (stryCov_9fa48("127", "128", "129", "130"), amount <= 0)) {
        if (stryMutAct_9fa48("131")) {
          {}
        } else {
          stryCov_9fa48("131");
          return stryMutAct_9fa48("132") ? {} : (stryCov_9fa48("132"), {
            status: stryMutAct_9fa48("133") ? "" : (stryCov_9fa48("133"), "FAILED"),
            errorMessage: stryMutAct_9fa48("134") ? "" : (stryCov_9fa48("134"), "valor inválido")
          });
        }
      }
      switch (this.behavior.kind) {
        case stryMutAct_9fa48("136") ? "" : (stryCov_9fa48("136"), "success"):
          if (stryMutAct_9fa48("135")) {} else {
            stryCov_9fa48("135");
            return stryMutAct_9fa48("137") ? {} : (stryCov_9fa48("137"), {
              status: stryMutAct_9fa48("138") ? "" : (stryCov_9fa48("138"), "SUCCESS"),
              transactionId: stryMutAct_9fa48("139") ? this.behavior.txGenerator?.() && "tx-default" : (stryCov_9fa48("139"), (stryMutAct_9fa48("140") ? this.behavior.txGenerator() : (stryCov_9fa48("140"), this.behavior.txGenerator?.())) ?? (stryMutAct_9fa48("141") ? "" : (stryCov_9fa48("141"), "tx-default")))
            });
          }
        case stryMutAct_9fa48("143") ? "" : (stryCov_9fa48("143"), "failure"):
          if (stryMutAct_9fa48("142")) {} else {
            stryCov_9fa48("142");
            return stryMutAct_9fa48("144") ? {} : (stryCov_9fa48("144"), {
              status: stryMutAct_9fa48("145") ? "" : (stryCov_9fa48("145"), "FAILED"),
              errorMessage: this.behavior.message
            });
          }
        case stryMutAct_9fa48("147") ? "" : (stryCov_9fa48("147"), "timeout"):
          if (stryMutAct_9fa48("146")) {} else {
            stryCov_9fa48("146");
            throw new Error(stryMutAct_9fa48("148") ? "" : (stryCov_9fa48("148"), "timeout pagamento"));
          }
      }
    }
  }
}