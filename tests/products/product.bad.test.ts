/** Testes ruins — anti-padrões de catálogo/produto. */
import { describe, expect, it } from "vitest";
import { CatalogService, InMemoryCatalogRepository, Product } from "../../src/domain/product";

// Estado global compartilhado indevidamente
const REPO = new InMemoryCatalogRepository();
const SVC = new CatalogService(REPO);

describe("CatalogService - ruins", () => {
  it("faz tudo junto e confunde", () => {
    const p1 = SVC.addProduct(new Product({ id: "p1", name: "X", price: 10 }));
    expect(p1.id).toBe("p1");
    const p2 = SVC.addProduct(new Product({ id: "p2", name: "Y", price: 5 }));
    expect(REPO.getById("p2")!.name).toBe("Y");
    const found = SVC.search("X");
    expect(found.length).toBeGreaterThanOrEqual(1);
    const list = SVC.listProducts({ by: "price" });
    expect(list[0].price).toBeLessThanOrEqual(list[list.length - 1].price);
  });

  it("nomes ruins e valores mágicos", () => {
    const a = SVC.addProduct(new Product({ id: "p3", name: "a", price: 3 }));
    expect(a.name).toBe("a");
  });
});
