/** Testes ótimos — parametrização e property-based. */
import { describe, expect, it } from "vitest";
import fc from "fast-check";
import { CatalogService, InMemoryCatalogRepository, Product } from "../../src/domain/product";

function builder() {
  const repo = new InMemoryCatalogRepository();
  const svc = new CatalogService(repo);
  return { repo, svc };
}

describe("CatalogService - ótimos", () => {
  it.each([
    [
      [
        new Product({ id: "p1", name: "banana", price: 2 }),
        new Product({ id: "p2", name: "abacate", price: 3 }),
        new Product({ id: "p3", name: "caju", price: 1 }),
      ],
      ["p3", "p1", "p2"], // ordenação por preço asc
    ],
  ])("ordenação por preço asc parametrizada", (prods: Product[], expected: string[]) => {
    const { svc } = builder();
    prods.forEach((p) => svc.addProduct(p));
    const list = svc.listProducts({ by: "price" });
    expect(list.map((p) => p.id)).toEqual(expected);
  });

  it("property-based: search deve ser case-insensitive e conter termo", () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            id: fc.uuid(),
            name: fc
              .string({ minLength: 1, maxLength: 12 })
              .filter((s: string) => s.trim().length > 0),
            price: fc.float({ min: 0, noNaN: true }),
          }),
          { minLength: 1, maxLength: 20 }
        )
          .map((arr) => arr.map((r) => new Product(r)))
          .filter((arr) => arr.length > 0),
        fc.string({ minLength: 1, maxLength: 4 }).filter((s) => s.trim().length > 0),
        (products, term) => {
          const { svc } = builder();
          products.forEach((p) => svc.addProduct(p));
          const res = svc.search(term);
          // A busca no serviço faz trim do termo, então nossa propriedade
          // precisa refletir essa regra de normalização para evitar falsos negativos.
          const lc = term.trim().toLowerCase();
          // cada item retornado deve conter o termo normalizado (case-insensitive)
          return res.every((p) => p.name.toLowerCase().includes(lc));
        }
      ),
      { numRuns: 50 }
    );
  });

  it("property-based: ordenação por preço não decrescente", () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            id: fc.uuid(),
            name: fc
              .string({ minLength: 1, maxLength: 12 })
              .filter((s: string) => s.trim().length > 0),
            price: fc.float({ min: 0, noNaN: true }),
          }),
          { minLength: 1, maxLength: 25 }
        ).map((arr) => arr.map((r) => new Product(r))),
        (products) => {
          const { svc } = builder();
          products.forEach((p) => svc.addProduct(p));
          const list = svc.listProducts({ by: "price" });
          for (let i = 1; i < list.length; i++) {
            if (list[i].price < list[i - 1].price) {return false;}
          }
          return true;
        }
      ),
      { numRuns: 50 }
    );
  });

  it("entidade Product validações", () => {
    expect(() => new Product({ id: "x", name: "", price: 1 })).toThrow();
    expect(() => new Product({ id: "x", name: "ok", price: -1 })).toThrow();
  });
});
