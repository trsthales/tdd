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

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export class User {
  /**
   * Entidade de usuário.
   * - id é string para facilitar fakes; em sistemas reais, pode ser UUID.
   * - passwordHash é simplificado; em produção use bcrypt/scrypt/argon2.
   */
  public readonly id: string;
  public readonly email: string;
  public readonly passwordHash: string;

  constructor(params: { id: string; email: string; passwordHash: string }) {
    const { id, email, passwordHash } = params;
    if (!EMAIL_RE.test(email)) {throw new Error("email inválido");}
    if (!passwordHash) {throw new Error("passwordHash não pode ser vazio");}
    this.id = id;
    this.email = email;
    this.passwordHash = passwordHash;
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
    return this.byEmail.get(email);
  }

  getById(id: string): User | undefined {
    return this.byId.get(id);
  }

  save(user: User): User {
    this.byId.set(user.id, user);
    this.byEmail.set(user.email, user);
    return user;
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

  constructor(repo: UserRepository, idGen: () => string = () => "user-1") {
    this.repo = repo;
    this.idGen = idGen;
  }

  private static hashPassword(raw: string): string {
    // NUNCA use isso em produção — é apenas para fins de TDD didático.
    return `hash::${raw}`;
  }

  register(email: string, password: string, userId?: string): User {
    if (!EMAIL_RE.test(email)) {throw new Error("email inválido");}
    if (!password || password.length < 6) {throw new Error("senha muito curta");}

    if (this.repo.getByEmail(email)) {throw new Error("email já cadastrado");}

    const id = userId ?? this.idGen();
    const user = new User({ id, email, passwordHash: UserService.hashPassword(password) });
    return this.repo.save(user);
  }
}
