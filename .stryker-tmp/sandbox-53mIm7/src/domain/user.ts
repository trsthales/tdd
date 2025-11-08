/**
 * Domínio de Usuário: registro e validações básicas.
 *
 * Objetivo didático: mostrar um serviço com regras simples e um repositório
 * in-memory, para permitir testes rápidos e isolados.
 *
 * Contratos principais:
 * - User: entidade imutável com id e email válidos; senha é armazenada de forma
 *   simplificada para o laboratório (NÃO use em produção!).
 * - UserRepository: salva e busca por email/id; fake in-memory incluído.
 * - UserService: orquestra cadastro garantindo unicidade de email e validações.
 *
 * Erros lançados:
 * - Error: validação de email/senha inválidos.
 * - Error: quando usuário já existe por email.
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
const EMAIL_RE = stryMutAct_9fa48("189") ? /^[^@\s]+@[^@\s]+\.[^@\S]+$/ : stryMutAct_9fa48("188") ? /^[^@\s]+@[^@\s]+\.[@\s]+$/ : stryMutAct_9fa48("187") ? /^[^@\s]+@[^@\s]+\.[^@\s]$/ : stryMutAct_9fa48("186") ? /^[^@\s]+@[^@\S]+\.[^@\s]+$/ : stryMutAct_9fa48("185") ? /^[^@\s]+@[@\s]+\.[^@\s]+$/ : stryMutAct_9fa48("184") ? /^[^@\s]+@[^@\s]\.[^@\s]+$/ : stryMutAct_9fa48("183") ? /^[^@\S]+@[^@\s]+\.[^@\s]+$/ : stryMutAct_9fa48("182") ? /^[@\s]+@[^@\s]+\.[^@\s]+$/ : stryMutAct_9fa48("181") ? /^[^@\s]@[^@\s]+\.[^@\s]+$/ : stryMutAct_9fa48("180") ? /^[^@\s]+@[^@\s]+\.[^@\s]+/ : stryMutAct_9fa48("179") ? /[^@\s]+@[^@\s]+\.[^@\s]+$/ : (stryCov_9fa48("179", "180", "181", "182", "183", "184", "185", "186", "187", "188", "189"), /^[^@\s]+@[^@\s]+\.[^@\s]+$/);
export class User {
  /**
   * Entidade de usuário.
   * - id é string para facilitar fakes; em sistemas reais, pode ser UUID.
   * - passwordHash é simplificado; em produção use bcrypt/scrypt/argon2.
   */
  public readonly id: string;
  public readonly email: string;
  public readonly passwordHash: string;
  constructor(params: {
    id: string;
    email: string;
    passwordHash: string;
  }) {
    if (stryMutAct_9fa48("190")) {
      {}
    } else {
      stryCov_9fa48("190");
      const {
        id,
        email,
        passwordHash
      } = params;
      if (stryMutAct_9fa48("193") ? false : stryMutAct_9fa48("192") ? true : stryMutAct_9fa48("191") ? EMAIL_RE.test(email) : (stryCov_9fa48("191", "192", "193"), !EMAIL_RE.test(email))) {
        if (stryMutAct_9fa48("194")) {
          {}
        } else {
          stryCov_9fa48("194");
          throw new Error(stryMutAct_9fa48("195") ? "" : (stryCov_9fa48("195"), "email inválido"));
        }
      }
      if (stryMutAct_9fa48("198") ? false : stryMutAct_9fa48("197") ? true : stryMutAct_9fa48("196") ? passwordHash : (stryCov_9fa48("196", "197", "198"), !passwordHash)) {
        if (stryMutAct_9fa48("199")) {
          {}
        } else {
          stryCov_9fa48("199");
          throw new Error(stryMutAct_9fa48("200") ? "" : (stryCov_9fa48("200"), "passwordHash não pode ser vazio"));
        }
      }
      this.id = id;
      this.email = email;
      this.passwordHash = passwordHash;
    }
  }
}
export interface UserRepository {
  getByEmail(email: string): User | undefined;
  getById(id: string): User | undefined;
  save(user: User): User;
}
export class InMemoryUserRepository implements UserRepository {
  private byId = new Map<string, User>();
  private byEmail = new Map<string, User>();
  getByEmail(email: string): User | undefined {
    if (stryMutAct_9fa48("201")) {
      {}
    } else {
      stryCov_9fa48("201");
      return this.byEmail.get(email);
    }
  }
  getById(id: string): User | undefined {
    if (stryMutAct_9fa48("202")) {
      {}
    } else {
      stryCov_9fa48("202");
      return this.byId.get(id);
    }
  }
  save(user: User): User {
    if (stryMutAct_9fa48("203")) {
      {}
    } else {
      stryCov_9fa48("203");
      this.byId.set(user.id, user);
      this.byEmail.set(user.email, user);
      return user;
    }
  }
}
export class UserService {
  /**
   * Orquestra regras de cadastro.
   * Regras:
   * - Email deve ser válido (validação básica via regex);
   * - Senha deve ter ao menos 6 caracteres (didático) antes de "hash";
   * - Email deve ser único;
   * - Gera id simples se não for informado (injetar gerador permite testabilidade).
   */
  private readonly repo: UserRepository;
  private readonly idGen: () => string;
  constructor(repo: UserRepository, idGen: () => string = stryMutAct_9fa48("204") ? () => undefined : (stryCov_9fa48("204"), () => stryMutAct_9fa48("205") ? "" : (stryCov_9fa48("205"), "user-1"))) {
    if (stryMutAct_9fa48("206")) {
      {}
    } else {
      stryCov_9fa48("206");
      this.repo = repo;
      this.idGen = idGen;
    }
  }
  private static hashPassword(raw: string): string {
    if (stryMutAct_9fa48("207")) {
      {}
    } else {
      stryCov_9fa48("207");
      // NUNCA use isso em produção — é apenas para fins de TDD didático.
      return stryMutAct_9fa48("208") ? `` : (stryCov_9fa48("208"), `hash::${raw}`);
    }
  }
  register(email: string, password: string, userId?: string): User {
    if (stryMutAct_9fa48("209")) {
      {}
    } else {
      stryCov_9fa48("209");
      if (stryMutAct_9fa48("212") ? false : stryMutAct_9fa48("211") ? true : stryMutAct_9fa48("210") ? EMAIL_RE.test(email) : (stryCov_9fa48("210", "211", "212"), !EMAIL_RE.test(email))) {
        if (stryMutAct_9fa48("213")) {
          {}
        } else {
          stryCov_9fa48("213");
          throw new Error(stryMutAct_9fa48("214") ? "" : (stryCov_9fa48("214"), "email inválido"));
        }
      }
      if (stryMutAct_9fa48("217") ? !password && password.length < 6 : stryMutAct_9fa48("216") ? false : stryMutAct_9fa48("215") ? true : (stryCov_9fa48("215", "216", "217"), (stryMutAct_9fa48("218") ? password : (stryCov_9fa48("218"), !password)) || (stryMutAct_9fa48("221") ? password.length >= 6 : stryMutAct_9fa48("220") ? password.length <= 6 : stryMutAct_9fa48("219") ? false : (stryCov_9fa48("219", "220", "221"), password.length < 6)))) {
        if (stryMutAct_9fa48("222")) {
          {}
        } else {
          stryCov_9fa48("222");
          throw new Error(stryMutAct_9fa48("223") ? "" : (stryCov_9fa48("223"), "senha muito curta"));
        }
      }
      if (stryMutAct_9fa48("225") ? false : stryMutAct_9fa48("224") ? true : (stryCov_9fa48("224", "225"), this.repo.getByEmail(email))) {
        if (stryMutAct_9fa48("226")) {
          {}
        } else {
          stryCov_9fa48("226");
          throw new Error(stryMutAct_9fa48("227") ? "" : (stryCov_9fa48("227"), "email já cadastrado"));
        }
      }
      const id = stryMutAct_9fa48("228") ? userId && this.idGen() : (stryCov_9fa48("228"), userId ?? this.idGen());
      const user = new User(stryMutAct_9fa48("229") ? {} : (stryCov_9fa48("229"), {
        id,
        email,
        passwordHash: UserService.hashPassword(password)
      }));
      return this.repo.save(user);
    }
  }
}