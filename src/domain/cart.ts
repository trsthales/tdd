/**
 * Domínio de Carrinho de Compras.
 *
 * Regras principais:
 * - add(product, qty): qty deve ser > 0; itens do mesmo produto são mesclados.
 * - remove(productId): remove item, se presente.
 * - total(): soma (preço * quantidade) com arredondamento para 2 casas.
 *
 * Notas de implementação:
 * - Para evitar erros de ponto flutuante, total é calculado em centavos.
 */

import type { Product } from "./product";
import { Money } from "./money";

export type CartItem = {
  productId: string;
  name: string;
  price: number; // preço unitário na mesma unidade de Product (ex.: decimal)
  qty: number;
};

export class Cart {
  private readonly items = new Map<string, CartItem>();

  add(product: Product, qty: number): CartItem {
    if (!Number.isFinite(qty) || qty <= 0) {throw new Error("qty inválida");}
    const existing = this.items.get(product.id);
    if (existing) {
      const updated: CartItem = { ...existing, qty: existing.qty + qty };
      this.items.set(product.id, updated);
      return updated;
    }
    const item: CartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      qty,
    };
    this.items.set(product.id, item);
    return item;
  }

  remove(productId: string): void {
    this.items.delete(productId);
  }

  list(): CartItem[] {
    return Array.from(this.items.values());
  }

  total(): number {
    // Usa Value Object Money para centralizar regra de arredondamento.
    const totalMoney = Array.from(this.items.values()).reduce(
      (acc: Money, it: CartItem) => acc.add(Money.fromNumber(it.price).multiply(it.qty)),
      Money.zero()
    );
    return totalMoney.toNumber();
  }
}
