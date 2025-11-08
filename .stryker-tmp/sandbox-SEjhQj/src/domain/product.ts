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
export class Product {
  /** Entidade imutável de produto. */
  public readonly id: string;
  public readonly name: string;
  public readonly price: number; // em unidade monetária (ex.: cents) ou decimal simplificado

  constructor(params: {
    id: string;
    name: string;
    price: number;
  }) {
    if (stryMutAct_9fa48("149")) {
      {}
    } else {
      stryCov_9fa48("149");
      const {
        id,
        name,
        price
      } = params;
      if (stryMutAct_9fa48("152") ? !name && name.trim().length === 0 : stryMutAct_9fa48("151") ? false : stryMutAct_9fa48("150") ? true : (stryCov_9fa48("150", "151", "152"), (stryMutAct_9fa48("153") ? name : (stryCov_9fa48("153"), !name)) || (stryMutAct_9fa48("155") ? name.trim().length !== 0 : stryMutAct_9fa48("154") ? false : (stryCov_9fa48("154", "155"), (stryMutAct_9fa48("156") ? name.length : (stryCov_9fa48("156"), name.trim().length)) === 0)))) {
        if (stryMutAct_9fa48("157")) {
          {}
        } else {
          stryCov_9fa48("157");
          throw new Error(stryMutAct_9fa48("158") ? "" : (stryCov_9fa48("158"), "nome de produto inválido"));
        }
      }
      if (stryMutAct_9fa48("161") ? (price == null || isNaN(price)) && price < 0 : stryMutAct_9fa48("160") ? false : stryMutAct_9fa48("159") ? true : (stryCov_9fa48("159", "160", "161"), (stryMutAct_9fa48("163") ? price == null && isNaN(price) : stryMutAct_9fa48("162") ? false : (stryCov_9fa48("162", "163"), (stryMutAct_9fa48("165") ? price != null : stryMutAct_9fa48("164") ? false : (stryCov_9fa48("164", "165"), price == null)) || isNaN(price))) || (stryMutAct_9fa48("168") ? price >= 0 : stryMutAct_9fa48("167") ? price <= 0 : stryMutAct_9fa48("166") ? false : (stryCov_9fa48("166", "167", "168"), price < 0)))) {
        if (stryMutAct_9fa48("169")) {
          {}
        } else {
          stryCov_9fa48("169");
          throw new Error(stryMutAct_9fa48("170") ? "" : (stryCov_9fa48("170"), "preço inválido"));
        }
      }
      this.id = id;
      this.name = stryMutAct_9fa48("171") ? name : (stryCov_9fa48("171"), name.trim());
      this.price = price;
    }
  }
}
export interface CatalogRepository {
  add(product: Product): Product;
  getById(id: string): Product | undefined;
  listAll(): Product[];
}
export class InMemoryCatalogRepository implements CatalogRepository {
  private byId = new Map<string, Product>();
  private order: string[] = stryMutAct_9fa48("172") ? ["Stryker was here"] : (stryCov_9fa48("172"), []); // preserva ordem de inserção (para testes específicos)

  add(product: Product): Product {
    if (stryMutAct_9fa48("173")) {
      {}
    } else {
      stryCov_9fa48("173");
      this.byId.set(product.id, product);
      this.order.push(product.id);
      return product;
    }
  }
  getById(id: string): Product | undefined {
    if (stryMutAct_9fa48("174")) {
      {}
    } else {
      stryCov_9fa48("174");
      return this.byId.get(id);
    }
  }
  listAll(): Product[] {
    if (stryMutAct_9fa48("175")) {
      {}
    } else {
      stryCov_9fa48("175");
      return stryMutAct_9fa48("176") ? this.order.map(id => this.byId.get(id)!) : (stryCov_9fa48("176"), this.order.map(stryMutAct_9fa48("177") ? () => undefined : (stryCov_9fa48("177"), id => this.byId.get(id)!)).filter(Boolean));
    }
  }
}
export type SortSpec = {
  by: "name";
  direction?: "asc" | "desc";
} | {
  by: "price";
  direction?: "asc" | "desc";
};
export class CatalogService {
  /**
   * Serviços de alto nível sobre o catálogo: listagem ordenada e busca.
   *
   * Observação: ao ordenar por preço, mantemos estabilidade por nome como
   * critério secundário para testes determinísticos.
   */
  constructor(private readonly repo: CatalogRepository) {}
  addProduct(product: Product): Product {
    if (stryMutAct_9fa48("178")) {
      {}
    } else {
      stryCov_9fa48("178");
      return this.repo.add(product);
    }
  }
  listProducts(sort?: SortSpec): Product[] {
    if (stryMutAct_9fa48("179")) {
      {}
    } else {
      stryCov_9fa48("179");
      const items = stryMutAct_9fa48("180") ? this.repo.listAll() : (stryCov_9fa48("180"), this.repo.listAll().slice());
      if (stryMutAct_9fa48("183") ? false : stryMutAct_9fa48("182") ? true : stryMutAct_9fa48("181") ? sort : (stryCov_9fa48("181", "182", "183"), !sort)) {
        if (stryMutAct_9fa48("184")) {
          {}
        } else {
          stryCov_9fa48("184");
          return items;
        }
      }
      const dir = (stryMutAct_9fa48("187") ? sort.direction !== "desc" : stryMutAct_9fa48("186") ? false : stryMutAct_9fa48("185") ? true : (stryCov_9fa48("185", "186", "187"), sort.direction === (stryMutAct_9fa48("188") ? "" : (stryCov_9fa48("188"), "desc")))) ? stryMutAct_9fa48("189") ? +1 : (stryCov_9fa48("189"), -1) : 1;
      if (stryMutAct_9fa48("192") ? sort.by !== "name" : stryMutAct_9fa48("191") ? false : stryMutAct_9fa48("190") ? true : (stryCov_9fa48("190", "191", "192"), sort.by === (stryMutAct_9fa48("193") ? "" : (stryCov_9fa48("193"), "name")))) {
        if (stryMutAct_9fa48("194")) {
          {}
        } else {
          stryCov_9fa48("194");
          return stryMutAct_9fa48("195") ? items : (stryCov_9fa48("195"), items.sort(stryMutAct_9fa48("196") ? () => undefined : (stryCov_9fa48("196"), (a, b) => stryMutAct_9fa48("197") ? a.name.localeCompare(b.name) / dir : (stryCov_9fa48("197"), a.name.localeCompare(b.name) * dir))));
        }
      }
      if (stryMutAct_9fa48("200") ? sort.by !== "price" : stryMutAct_9fa48("199") ? false : stryMutAct_9fa48("198") ? true : (stryCov_9fa48("198", "199", "200"), sort.by === (stryMutAct_9fa48("201") ? "" : (stryCov_9fa48("201"), "price")))) {
        if (stryMutAct_9fa48("202")) {
          {}
        } else {
          stryCov_9fa48("202");
          return stryMutAct_9fa48("204") ? items
          // estabilidade por nome
          .sort((a, b) => (a.price - b.price) * dir) : stryMutAct_9fa48("203") ? items.sort((a, b) => a.name.localeCompare(b.name)) // estabilidade por nome
          : (stryCov_9fa48("203", "204"), items.sort(stryMutAct_9fa48("205") ? () => undefined : (stryCov_9fa48("205"), (a, b) => a.name.localeCompare(b.name))) // estabilidade por nome
          .sort(stryMutAct_9fa48("206") ? () => undefined : (stryCov_9fa48("206"), (a, b) => stryMutAct_9fa48("207") ? (a.price - b.price) / dir : (stryCov_9fa48("207"), (stryMutAct_9fa48("208") ? a.price + b.price : (stryCov_9fa48("208"), a.price - b.price)) * dir))));
        }
      }
      return items;
    }
  }
  search(term: string, sort?: SortSpec): Product[] {
    if (stryMutAct_9fa48("209")) {
      {}
    } else {
      stryCov_9fa48("209");
      const lc = stryMutAct_9fa48("211") ? term.toLowerCase() : stryMutAct_9fa48("210") ? term.trim().toUpperCase() : (stryCov_9fa48("210", "211"), term.trim().toLowerCase());
      const filtered = stryMutAct_9fa48("212") ? this.repo.listAll() : (stryCov_9fa48("212"), this.repo.listAll().filter(stryMutAct_9fa48("213") ? () => undefined : (stryCov_9fa48("213"), p => stryMutAct_9fa48("214") ? p.name.toUpperCase().includes(lc) : (stryCov_9fa48("214"), p.name.toLowerCase().includes(lc)))));
      if (stryMutAct_9fa48("217") ? false : stryMutAct_9fa48("216") ? true : stryMutAct_9fa48("215") ? sort : (stryCov_9fa48("215", "216", "217"), !sort)) {
        if (stryMutAct_9fa48("218")) {
          {}
        } else {
          stryCov_9fa48("218");
          return filtered;
        }
      }
      // Reutiliza a lógica de ordenação
      const tempService = new CatalogService(stryMutAct_9fa48("219") ? {} : (stryCov_9fa48("219"), {
        add: () => {
          if (stryMutAct_9fa48("220")) {
            {}
          } else {
            stryCov_9fa48("220");
            throw new Error(stryMutAct_9fa48("221") ? "" : (stryCov_9fa48("221"), "not implemented"));
          }
        },
        getById: () => undefined,
        listAll: stryMutAct_9fa48("222") ? () => undefined : (stryCov_9fa48("222"), () => filtered)
      }));
      return tempService.listProducts(sort);
    }
  }
}