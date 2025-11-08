/**
 * Domínio de Produto e Catálogo.
 *
 * Objetivo didático: demonstrar operações de criação, listagem, ordenação
 * e busca, com repositório in-memory.
 *
 * Regras principais:
 * - Product: name não pode ser vazio; price >= 0; id string (ex.: UUID).
 * - CatalogRepository: armazena e recupera produtos; implementação in-memory.
 * - CatalogService: fornece listagem ordenada e busca por termo (case-insensitive).
 */

export class Product {
  /** Entidade imutável de produto. */
  public readonly id: string;
  public readonly name: string;
  public readonly price: number; // em unidade monetária (ex.: cents) ou decimal simplificado

  constructor(params: { id: string; name: string; price: number }) {
    const { id, name, price } = params;
    if (!name || name.trim().length === 0) {throw new Error("nome de produto inválido");}
    if (price == null || isNaN(price) || price < 0) {throw new Error("preço inválido");}
    this.id = id;
    this.name = name.trim();
    this.price = price;
  }
}

export interface CatalogRepository {
  add(product: Product): Product;
  getById(id: string): Product | undefined;
  listAll(): Product[];
}

export class InMemoryCatalogRepository implements CatalogRepository {
  private byId = new Map<string, Product>();
  private order: string[] = []; // preserva ordem de inserção (para testes específicos)

  add(product: Product): Product {
    this.byId.set(product.id, product);
    this.order.push(product.id);
    return product;
  }

  getById(id: string): Product | undefined {
    return this.byId.get(id);
  }

  listAll(): Product[] {
    return this.order.map((id) => this.byId.get(id)!).filter(Boolean);
  }
}

export type SortSpec =
  | { by: "name"; direction?: "asc" | "desc" }
  | { by: "price"; direction?: "asc" | "desc" };

export class CatalogService {
  /**
   * Serviços de alto nível sobre o catálogo: listagem ordenada e busca.
   *
   * Observação: ao ordenar por preço, mantemos estabilidade por nome como
   * critério secundário para testes determinísticos.
   */
  constructor(private readonly repo: CatalogRepository) {}

  addProduct(product: Product): Product {
    return this.repo.add(product);
  }

  listProducts(sort?: SortSpec): Product[] {
    const items = this.repo.listAll().slice();
    if (!sort) {return items;}
    const dir = sort.direction === "desc" ? -1 : 1;
    if (sort.by === "name") {
      return items.sort((a, b) => a.name.localeCompare(b.name) * dir);
    }
    if (sort.by === "price") {
      return items
        .sort((a, b) => a.name.localeCompare(b.name)) // estabilidade por nome
        .sort((a, b) => (a.price - b.price) * dir);
    }
    return items;
  }

  search(term: string, sort?: SortSpec): Product[] {
    const lc = term.trim().toLowerCase();
    const filtered = this.repo
      .listAll()
      .filter((p) => p.name.toLowerCase().includes(lc));
    if (!sort) {return filtered;}
    // Reutiliza a lógica de ordenação
    const tempService = new CatalogService({
      add: () => {
        throw new Error("not implemented");
      },
      getById: () => undefined,
      listAll: () => filtered,
    });
    return tempService.listProducts(sort);
  }
}
