/** Testes bons de catálogo/produto: foco único e clareza. */
import { describe, expect, it } from "vitest";
import { CatalogService, InMemoryCatalogRepository, Product } from "../../src/domain/product";

function criarCatalogo() {
  const repo = new InMemoryCatalogRepository();
  const svc = new CatalogService(repo);
  return { repo, svc };
}

describe("CatalogService - bons", () => {
  it("deve adicionar produto válido", () => {
    const { svc, repo } = criarCatalogo();
    const p = svc.addProduct(new Product({ id: "p1", name: "Livro", price: 50 }));
    expect(repo.getById("p1")).toBe(p);
  });

  it("deve listar produtos sem ordenação (inserção)", () => {
    const { svc } = criarCatalogo();
    svc.addProduct(new Product({ id: "p1", name: "B", price: 10 }));
    svc.addProduct(new Product({ id: "p2", name: "A", price: 5 }));
    const list = svc.listProducts();
    expect(list.map((p) => p.id)).toEqual(["p1", "p2"]);
  });

  it("deve ordenar por nome asc", () => {
    const { svc } = criarCatalogo();
    svc.addProduct(new Product({ id: "p1", name: "Café", price: 30 }));
    svc.addProduct(new Product({ id: "p2", name: "Árvore", price: 20 }));
    svc.addProduct(new Product({ id: "p3", name: "banana", price: 40 }));
    const list = svc.listProducts({ by: "name" });
    expect(list.map((p) => p.name)).toEqual(["Árvore", "banana", "Café"]);
  });

  it("deve ordenar por preço desc com estabilidade de nome secundária", () => {
    const { svc } = criarCatalogo();
    svc.addProduct(new Product({ id: "p1", name: "C", price: 10 }));
    svc.addProduct(new Product({ id: "p2", name: "A", price: 10 }));
    svc.addProduct(new Product({ id: "p3", name: "B", price: 20 }));
    const list = svc.listProducts({ by: "price", direction: "desc" });
    expect(list.map((p) => p.id)).toEqual(["p3", "p2", "p1"]); // preço 20 primeiro; 10 ordenados por nome
  });

  it("deve buscar por termo case-insensitive", () => {
    const { svc } = criarCatalogo();
    svc.addProduct(new Product({ id: "p1", name: "Camiseta Azul", price: 30 }));
    svc.addProduct(new Product({ id: "p2", name: "Camiseta Vermelha", price: 35 }));
    const result = svc.search("azul");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("p1");
  });
});
