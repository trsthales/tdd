/**
 * Value Object Money — centraliza regras de arredondamento e operações em centavos.
 *
 * Motivação didática:
 * - Evita espalhar lógica de (value * 100) + EPSILON por várias classes.
 * - Torna testes mais simples: comparar instâncias ou usar helpers em vez de repetir cálculos.
 * - Reforça conceito de Value Object imutável (TDD + DDD).
 */

const EPSILON = 1e-9; // ajuda a estabilizar casos 1.005 * 100 => 100.5

export class Money {
  private readonly _cents: number; // inteiro não-negativo (para este domínio)

  private constructor(cents: number) {
    if (!Number.isInteger(cents)) {
      throw new Error("cents deve ser inteiro");
    }
    if (cents < 0) {
      throw new Error("valor monetário negativo inválido");
    }
    this._cents = cents;
  }

  static fromNumber(amount: number): Money {
    if (amount < 0 || !isFinite(amount)) {
      throw new Error("valor inválido");
    }
    const cents = Math.round((amount + EPSILON) * 100);
    return new Money(cents);
  }

  static fromCents(cents: number): Money {
    return new Money(cents);
  }

  static zero(): Money {
    return new Money(0);
  }

  get cents(): number {
    return this._cents;
  }

  toNumber(): number {
    return this._cents / 100;
  }

  add(other: Money): Money {
    return new Money(this._cents + other._cents);
  }

  multiply(quantity: number): Money {
    if (!Number.isInteger(quantity) || quantity < 0) {
      throw new Error("quantidade inválida");
    }
    return new Money(this._cents * quantity);
  }

  equals(other: Money): boolean {
    return this._cents === other._cents;
  }

  compare(other: Money): number {
    return this._cents - other._cents;
  }

  format(locale = 'pt-BR', currency = 'BRL'): string {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(this.toNumber());
  }
}

// Pequenos helpers para semântica fluente nos testes
export const money = (value: number) => Money.fromNumber(value);
export const cents = (value: number) => Money.fromCents(value);
