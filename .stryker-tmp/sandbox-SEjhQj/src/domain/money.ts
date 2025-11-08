/**
 * Value Object Money — centraliza regras de arredondamento e operações em centavos.
 *
 * Motivação didática:
 * - Evita espalhar lógica de (value * 100) + EPSILON por várias classes.
 * - Torna testes mais simples: comparar instâncias ou usar helpers em vez de repetir cálculos.
 * - Reforça conceito de Value Object imutável (TDD + DDD).
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
const EPSILON = 1e-9; // ajuda a estabilizar casos 1.005 * 100 => 100.5

export class Money {
  private readonly _cents: number; // inteiro não-negativo (para este domínio)

  private constructor(cents: number) {
    if (stryMutAct_9fa48("20")) {
      {}
    } else {
      stryCov_9fa48("20");
      if (stryMutAct_9fa48("23") ? false : stryMutAct_9fa48("22") ? true : stryMutAct_9fa48("21") ? Number.isInteger(cents) : (stryCov_9fa48("21", "22", "23"), !Number.isInteger(cents))) {
        if (stryMutAct_9fa48("24")) {
          {}
        } else {
          stryCov_9fa48("24");
          throw new Error(stryMutAct_9fa48("25") ? "" : (stryCov_9fa48("25"), "cents deve ser inteiro"));
        }
      }
      if (stryMutAct_9fa48("29") ? cents >= 0 : stryMutAct_9fa48("28") ? cents <= 0 : stryMutAct_9fa48("27") ? false : stryMutAct_9fa48("26") ? true : (stryCov_9fa48("26", "27", "28", "29"), cents < 0)) {
        if (stryMutAct_9fa48("30")) {
          {}
        } else {
          stryCov_9fa48("30");
          throw new Error(stryMutAct_9fa48("31") ? "" : (stryCov_9fa48("31"), "valor monetário negativo inválido"));
        }
      }
      this._cents = cents;
    }
  }
  static fromNumber(amount: number): Money {
    if (stryMutAct_9fa48("32")) {
      {}
    } else {
      stryCov_9fa48("32");
      if (stryMutAct_9fa48("35") ? amount < 0 && !isFinite(amount) : stryMutAct_9fa48("34") ? false : stryMutAct_9fa48("33") ? true : (stryCov_9fa48("33", "34", "35"), (stryMutAct_9fa48("38") ? amount >= 0 : stryMutAct_9fa48("37") ? amount <= 0 : stryMutAct_9fa48("36") ? false : (stryCov_9fa48("36", "37", "38"), amount < 0)) || (stryMutAct_9fa48("39") ? isFinite(amount) : (stryCov_9fa48("39"), !isFinite(amount))))) {
        if (stryMutAct_9fa48("40")) {
          {}
        } else {
          stryCov_9fa48("40");
          throw new Error(stryMutAct_9fa48("41") ? "" : (stryCov_9fa48("41"), "valor inválido"));
        }
      }
      const cents = Math.round(stryMutAct_9fa48("42") ? (amount + EPSILON) / 100 : (stryCov_9fa48("42"), (stryMutAct_9fa48("43") ? amount - EPSILON : (stryCov_9fa48("43"), amount + EPSILON)) * 100));
      return new Money(cents);
    }
  }
  static fromCents(cents: number): Money {
    if (stryMutAct_9fa48("44")) {
      {}
    } else {
      stryCov_9fa48("44");
      return new Money(cents);
    }
  }
  static zero(): Money {
    if (stryMutAct_9fa48("45")) {
      {}
    } else {
      stryCov_9fa48("45");
      return new Money(0);
    }
  }
  get cents(): number {
    if (stryMutAct_9fa48("46")) {
      {}
    } else {
      stryCov_9fa48("46");
      return this._cents;
    }
  }
  toNumber(): number {
    if (stryMutAct_9fa48("47")) {
      {}
    } else {
      stryCov_9fa48("47");
      return stryMutAct_9fa48("48") ? this._cents * 100 : (stryCov_9fa48("48"), this._cents / 100);
    }
  }
  add(other: Money): Money {
    if (stryMutAct_9fa48("49")) {
      {}
    } else {
      stryCov_9fa48("49");
      return new Money(stryMutAct_9fa48("50") ? this._cents - other._cents : (stryCov_9fa48("50"), this._cents + other._cents));
    }
  }
  multiply(quantity: number): Money {
    if (stryMutAct_9fa48("51")) {
      {}
    } else {
      stryCov_9fa48("51");
      if (stryMutAct_9fa48("54") ? !Number.isInteger(quantity) && quantity < 0 : stryMutAct_9fa48("53") ? false : stryMutAct_9fa48("52") ? true : (stryCov_9fa48("52", "53", "54"), (stryMutAct_9fa48("55") ? Number.isInteger(quantity) : (stryCov_9fa48("55"), !Number.isInteger(quantity))) || (stryMutAct_9fa48("58") ? quantity >= 0 : stryMutAct_9fa48("57") ? quantity <= 0 : stryMutAct_9fa48("56") ? false : (stryCov_9fa48("56", "57", "58"), quantity < 0)))) {
        if (stryMutAct_9fa48("59")) {
          {}
        } else {
          stryCov_9fa48("59");
          throw new Error(stryMutAct_9fa48("60") ? "" : (stryCov_9fa48("60"), "quantidade inválida"));
        }
      }
      return new Money(stryMutAct_9fa48("61") ? this._cents / quantity : (stryCov_9fa48("61"), this._cents * quantity));
    }
  }
  equals(other: Money): boolean {
    if (stryMutAct_9fa48("62")) {
      {}
    } else {
      stryCov_9fa48("62");
      return stryMutAct_9fa48("65") ? this._cents !== other._cents : stryMutAct_9fa48("64") ? false : stryMutAct_9fa48("63") ? true : (stryCov_9fa48("63", "64", "65"), this._cents === other._cents);
    }
  }
  compare(other: Money): number {
    if (stryMutAct_9fa48("66")) {
      {}
    } else {
      stryCov_9fa48("66");
      return stryMutAct_9fa48("67") ? this._cents + other._cents : (stryCov_9fa48("67"), this._cents - other._cents);
    }
  }
  format(locale = stryMutAct_9fa48("68") ? "" : (stryCov_9fa48("68"), 'pt-BR'), currency = stryMutAct_9fa48("69") ? "" : (stryCov_9fa48("69"), 'BRL')): string {
    if (stryMutAct_9fa48("70")) {
      {}
    } else {
      stryCov_9fa48("70");
      return new Intl.NumberFormat(locale, stryMutAct_9fa48("71") ? {} : (stryCov_9fa48("71"), {
        style: stryMutAct_9fa48("72") ? "" : (stryCov_9fa48("72"), 'currency'),
        currency
      })).format(this.toNumber());
    }
  }
}

// Pequenos helpers para semântica fluente nos testes
export const money = stryMutAct_9fa48("73") ? () => undefined : (stryCov_9fa48("73"), (() => {
  const money = (value: number) => Money.fromNumber(value);
  return money;
})());
export const cents = stryMutAct_9fa48("74") ? () => undefined : (stryCov_9fa48("74"), (() => {
  const cents = (value: number) => Money.fromCents(value);
  return cents;
})());