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
const EMAIL_RE = stryMutAct_9fa48("233") ? /^[^@\s]+@[^@\s]+\.[^@\S]+$/ : stryMutAct_9fa48("232") ? /^[^@\s]+@[^@\s]+\.[@\s]+$/ : stryMutAct_9fa48("231") ? /^[^@\s]+@[^@\s]+\.[^@\s]$/ : stryMutAct_9fa48("230") ? /^[^@\s]+@[^@\S]+\.[^@\s]+$/ : stryMutAct_9fa48("229") ? /^[^@\s]+@[@\s]+\.[^@\s]+$/ : stryMutAct_9fa48("228") ? /^[^@\s]+@[^@\s]\.[^@\s]+$/ : stryMutAct_9fa48("227") ? /^[^@\S]+@[^@\s]+\.[^@\s]+$/ : stryMutAct_9fa48("226") ? /^[@\s]+@[^@\s]+\.[^@\s]+$/ : stryMutAct_9fa48("225") ? /^[^@\s]@[^@\s]+\.[^@\s]+$/ : stryMutAct_9fa48("224") ? /^[^@\s]+@[^@\s]+\.[^@\s]+/ : stryMutAct_9fa48("223") ? /[^@\s]+@[^@\s]+\.[^@\s]+$/ : (stryCov_9fa48("223", "224", "225", "226", "227", "228", "229", "230", "231", "232", "233"), /^[^@\s]+@[^@\s]+\.[^@\s]+$/);
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
    if (stryMutAct_9fa48("234")) {
      {}
    } else {
      stryCov_9fa48("234");
      const {
        id,
        email,
        passwordHash
      } = params;
      if (stryMutAct_9fa48("237") ? false : stryMutAct_9fa48("236") ? true : stryMutAct_9fa48("235") ? EMAIL_RE.test(email) : (stryCov_9fa48("235", "236", "237"), !EMAIL_RE.test(email))) {
        if (stryMutAct_9fa48("238")) {
          {}
        } else {
          stryCov_9fa48("238");
          throw new Error(stryMutAct_9fa48("239") ? "" : (stryCov_9fa48("239"), "email inválido"));
        }
      }
      if (stryMutAct_9fa48("242") ? false : stryMutAct_9fa48("241") ? true : stryMutAct_9fa48("240") ? passwordHash : (stryCov_9fa48("240", "241", "242"), !passwordHash)) {
        if (stryMutAct_9fa48("243")) {
          {}
        } else {
          stryCov_9fa48("243");
          throw new Error(stryMutAct_9fa48("244") ? "" : (stryCov_9fa48("244"), "passwordHash não pode ser vazio"));
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
    if (stryMutAct_9fa48("245")) {
      {}
    } else {
      stryCov_9fa48("245");
      return this.byEmail.get(email);
    }
  }
  getById(id: string): User | undefined {
    if (stryMutAct_9fa48("246")) {
      {}
    } else {
      stryCov_9fa48("246");
      return this.byId.get(id);
    }
  }
  save(user: User): User {
    if (stryMutAct_9fa48("247")) {
      {}
    } else {
      stryCov_9fa48("247");
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
  constructor(repo: UserRepository, idGen: () => string = stryMutAct_9fa48("248") ? () => undefined : (stryCov_9fa48("248"), () => stryMutAct_9fa48("249") ? "" : (stryCov_9fa48("249"), "user-1"))) {
    if (stryMutAct_9fa48("250")) {
      {}
    } else {
      stryCov_9fa48("250");
      this.repo = repo;
      this.idGen = idGen;
    }
  }
  private static hashPassword(raw: string): string {
    if (stryMutAct_9fa48("251")) {
      {}
    } else {
      stryCov_9fa48("251");
      // NUNCA use isso em produção — é apenas para fins de TDD didático.
      return stryMutAct_9fa48("252") ? `` : (stryCov_9fa48("252"), `hash::${raw}`);
    }
  }
  register(email: string, password: string, userId?: string): User {
    if (stryMutAct_9fa48("253")) {
      {}
    } else {
      stryCov_9fa48("253");
      if (stryMutAct_9fa48("256") ? false : stryMutAct_9fa48("255") ? true : stryMutAct_9fa48("254") ? EMAIL_RE.test(email) : (stryCov_9fa48("254", "255", "256"), !EMAIL_RE.test(email))) {
        if (stryMutAct_9fa48("257")) {
          {}
        } else {
          stryCov_9fa48("257");
          throw new Error(stryMutAct_9fa48("258") ? "" : (stryCov_9fa48("258"), "email inválido"));
        }
      }
      if (stryMutAct_9fa48("261") ? !password && password.length < 6 : stryMutAct_9fa48("260") ? false : stryMutAct_9fa48("259") ? true : (stryCov_9fa48("259", "260", "261"), (stryMutAct_9fa48("262") ? password : (stryCov_9fa48("262"), !password)) || (stryMutAct_9fa48("265") ? password.length >= 6 : stryMutAct_9fa48("264") ? password.length <= 6 : stryMutAct_9fa48("263") ? false : (stryCov_9fa48("263", "264", "265"), password.length < 6)))) {
        if (stryMutAct_9fa48("266")) {
          {}
        } else {
          stryCov_9fa48("266");
          throw new Error(stryMutAct_9fa48("267") ? "" : (stryCov_9fa48("267"), "senha muito curta"));
        }
      }
      if (stryMutAct_9fa48("269") ? false : stryMutAct_9fa48("268") ? true : (stryCov_9fa48("268", "269"), this.repo.getByEmail(email))) {
        if (stryMutAct_9fa48("270")) {
          {}
        } else {
          stryCov_9fa48("270");
          throw new Error(stryMutAct_9fa48("271") ? "" : (stryCov_9fa48("271"), "email já cadastrado"));
        }
      }
      const id = stryMutAct_9fa48("272") ? userId && this.idGen() : (stryCov_9fa48("272"), userId ?? this.idGen());
      const user = new User(stryMutAct_9fa48("273") ? {} : (stryCov_9fa48("273"), {
        id,
        email,
        passwordHash: UserService.hashPassword(password)
      }));
      return this.repo.save(user);
    }
  }
}