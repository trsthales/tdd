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
    if (stryMutAct_9fa48("105")) {
      {}
    } else {
      stryCov_9fa48("105");
      const {
        id,
        name,
        price
      } = params;
      if (stryMutAct_9fa48("108") ? !name && name.trim().length === 0 : stryMutAct_9fa48("107") ? false : stryMutAct_9fa48("106") ? true : (stryCov_9fa48("106", "107", "108"), (stryMutAct_9fa48("109") ? name : (stryCov_9fa48("109"), !name)) || (stryMutAct_9fa48("111") ? name.trim().length !== 0 : stryMutAct_9fa48("110") ? false : (stryCov_9fa48("110", "111"), (stryMutAct_9fa48("112") ? name.length : (stryCov_9fa48("112"), name.trim().length)) === 0)))) {
        if (stryMutAct_9fa48("113")) {
          {}
        } else {
          stryCov_9fa48("113");
          throw new Error(stryMutAct_9fa48("114") ? "" : (stryCov_9fa48("114"), "nome de produto inválido"));
        }
      }
      if (stryMutAct_9fa48("117") ? (price == null || isNaN(price)) && price < 0 : stryMutAct_9fa48("116") ? false : stryMutAct_9fa48("115") ? true : (stryCov_9fa48("115", "116", "117"), (stryMutAct_9fa48("119") ? price == null && isNaN(price) : stryMutAct_9fa48("118") ? false : (stryCov_9fa48("118", "119"), (stryMutAct_9fa48("121") ? price != null : stryMutAct_9fa48("120") ? false : (stryCov_9fa48("120", "121"), price == null)) || isNaN(price))) || (stryMutAct_9fa48("124") ? price >= 0 : stryMutAct_9fa48("123") ? price <= 0 : stryMutAct_9fa48("122") ? false : (stryCov_9fa48("122", "123", "124"), price < 0)))) {
        if (stryMutAct_9fa48("125")) {
          {}
        } else {
          stryCov_9fa48("125");
          throw new Error(stryMutAct_9fa48("126") ? "" : (stryCov_9fa48("126"), "preço inválido"));
        }
      }
      this.id = id;
      this.name = stryMutAct_9fa48("127") ? name : (stryCov_9fa48("127"), name.trim());
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
  private order: string[] = stryMutAct_9fa48("128") ? ["Stryker was here"] : (stryCov_9fa48("128"), []); // preserva ordem de inserção (para testes específicos)

  add(product: Product): Product {
    if (stryMutAct_9fa48("129")) {
      {}
    } else {
      stryCov_9fa48("129");
      this.byId.set(product.id, product);
      this.order.push(product.id);
      return product;
    }
  }
  getById(id: string): Product | undefined {
    if (stryMutAct_9fa48("130")) {
      {}
    } else {
      stryCov_9fa48("130");
      return this.byId.get(id);
    }
  }
  listAll(): Product[] {
    if (stryMutAct_9fa48("131")) {
      {}
    } else {
      stryCov_9fa48("131");
      return stryMutAct_9fa48("132") ? this.order.map(id => this.byId.get(id)!) : (stryCov_9fa48("132"), this.order.map(stryMutAct_9fa48("133") ? () => undefined : (stryCov_9fa48("133"), id => this.byId.get(id)!)).filter(Boolean));
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
    if (stryMutAct_9fa48("134")) {
      {}
    } else {
      stryCov_9fa48("134");
      return this.repo.add(product);
    }
  }
  listProducts(sort?: SortSpec): Product[] {
    if (stryMutAct_9fa48("135")) {
      {}
    } else {
      stryCov_9fa48("135");
      const items = stryMutAct_9fa48("136") ? this.repo.listAll() : (stryCov_9fa48("136"), this.repo.listAll().slice());
      if (stryMutAct_9fa48("139") ? false : stryMutAct_9fa48("138") ? true : stryMutAct_9fa48("137") ? sort : (stryCov_9fa48("137", "138", "139"), !sort)) {
        if (stryMutAct_9fa48("140")) {
          {}
        } else {
          stryCov_9fa48("140");
          return items;
        }
      }
      const dir = (stryMutAct_9fa48("143") ? sort.direction !== "desc" : stryMutAct_9fa48("142") ? false : stryMutAct_9fa48("141") ? true : (stryCov_9fa48("141", "142", "143"), sort.direction === (stryMutAct_9fa48("144") ? "" : (stryCov_9fa48("144"), "desc")))) ? stryMutAct_9fa48("145") ? +1 : (stryCov_9fa48("145"), -1) : 1;
      if (stryMutAct_9fa48("148") ? sort.by !== "name" : stryMutAct_9fa48("147") ? false : stryMutAct_9fa48("146") ? true : (stryCov_9fa48("146", "147", "148"), sort.by === (stryMutAct_9fa48("149") ? "" : (stryCov_9fa48("149"), "name")))) {
        if (stryMutAct_9fa48("150")) {
          {}
        } else {
          stryCov_9fa48("150");
          return stryMutAct_9fa48("151") ? items : (stryCov_9fa48("151"), items.sort(stryMutAct_9fa48("152") ? () => undefined : (stryCov_9fa48("152"), (a, b) => stryMutAct_9fa48("153") ? a.name.localeCompare(b.name) / dir : (stryCov_9fa48("153"), a.name.localeCompare(b.name) * dir))));
        }
      }
      if (stryMutAct_9fa48("156") ? sort.by !== "price" : stryMutAct_9fa48("155") ? false : stryMutAct_9fa48("154") ? true : (stryCov_9fa48("154", "155", "156"), sort.by === (stryMutAct_9fa48("157") ? "" : (stryCov_9fa48("157"), "price")))) {
        if (stryMutAct_9fa48("158")) {
          {}
        } else {
          stryCov_9fa48("158");
          return stryMutAct_9fa48("160") ? items
          // estabilidade por nome
          .sort((a, b) => (a.price - b.price) * dir) : stryMutAct_9fa48("159") ? items.sort((a, b) => a.name.localeCompare(b.name)) // estabilidade por nome
          : (stryCov_9fa48("159", "160"), items.sort(stryMutAct_9fa48("161") ? () => undefined : (stryCov_9fa48("161"), (a, b) => a.name.localeCompare(b.name))) // estabilidade por nome
          .sort(stryMutAct_9fa48("162") ? () => undefined : (stryCov_9fa48("162"), (a, b) => stryMutAct_9fa48("163") ? (a.price - b.price) / dir : (stryCov_9fa48("163"), (stryMutAct_9fa48("164") ? a.price + b.price : (stryCov_9fa48("164"), a.price - b.price)) * dir))));
        }
      }
      return items;
    }
  }
  search(term: string, sort?: SortSpec): Product[] {
    if (stryMutAct_9fa48("165")) {
      {}
    } else {
      stryCov_9fa48("165");
      const lc = stryMutAct_9fa48("167") ? term.toLowerCase() : stryMutAct_9fa48("166") ? term.trim().toUpperCase() : (stryCov_9fa48("166", "167"), term.trim().toLowerCase());
      const filtered = stryMutAct_9fa48("168") ? this.repo.listAll() : (stryCov_9fa48("168"), this.repo.listAll().filter(stryMutAct_9fa48("169") ? () => undefined : (stryCov_9fa48("169"), p => stryMutAct_9fa48("170") ? p.name.toUpperCase().includes(lc) : (stryCov_9fa48("170"), p.name.toLowerCase().includes(lc)))));
      if (stryMutAct_9fa48("173") ? false : stryMutAct_9fa48("172") ? true : stryMutAct_9fa48("171") ? sort : (stryCov_9fa48("171", "172", "173"), !sort)) {
        if (stryMutAct_9fa48("174")) {
          {}
        } else {
          stryCov_9fa48("174");
          return filtered;
        }
      }
      // Reutiliza a lógica de ordenação
      const tempService = new CatalogService(stryMutAct_9fa48("175") ? {} : (stryCov_9fa48("175"), {
        add: () => {
          if (stryMutAct_9fa48("176")) {
            {}
          } else {
            stryCov_9fa48("176");
            throw new Error(stryMutAct_9fa48("177") ? "" : (stryCov_9fa48("177"), "not implemented"));
          }
        },
        getById: () => undefined,
        listAll: stryMutAct_9fa48("178") ? () => undefined : (stryCov_9fa48("178"), () => filtered)
      }));
      return tempService.listProducts(sort);
    }
  }
}