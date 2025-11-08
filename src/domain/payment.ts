/**
 * Domínio de Pagamento.
 *
 * Objetivo: abstrair um gateway de pagamento para que testes de Order possam
 * simular sucesso/falha/timeout sem dependências externas reais.
 *
 * Regras esperadas por OrderService:
 * - charge retorna PaymentResult com status SUCCESS ou FAILED.
 * - Em caso de timeout (simulado), pode lançar Error específica.
 */

export type CardInfo = { number: string; holder: string; exp: string; cvv: string };

export type PaymentResult = {
  status: "SUCCESS" | "FAILED";
  transactionId?: string;
  errorMessage?: string;
};

export interface PaymentGateway {
  charge(amount: number, card: CardInfo): Promise<PaymentResult>;
}

/** Fake configurável para testes. */
export class FakePaymentGateway implements PaymentGateway {
  private behavior:
    | { kind: "success"; txGenerator?: () => string }
    | { kind: "failure"; message?: string }
    | { kind: "timeout" } = { kind: "success" };

  setSuccess(txGenerator: () => string = () => "tx-1"): void {
    this.behavior = { kind: "success", txGenerator };
  }
  setFailure(message = "falha no gateway"): void {
    this.behavior = { kind: "failure", message };
  }
  setTimeout(): void {
    this.behavior = { kind: "timeout" };
  }

  async charge(amount: number, _card: CardInfo): Promise<PaymentResult> {
    if (amount <= 0) {return { status: "FAILED", errorMessage: "valor inválido" };}
    switch (this.behavior.kind) {
      case "success":
        return {
          status: "SUCCESS",
          transactionId: this.behavior.txGenerator?.() ?? "tx-default",
        };
      case "failure":
        return { status: "FAILED", errorMessage: this.behavior.message };
      case "timeout":
        throw new Error("timeout pagamento");
    }
  }
}
