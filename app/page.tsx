import { RequestForm } from "@/components/request-form"
import { Building2, Info } from "lucide-react"

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-[#eef3f8]">
      <header className="border-b bg-background shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-5">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Building2 className="size-6" strokeWidth={2} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              Secretaria Municipal de Urbanismo e Licenciamento
            </p>
            <h1 className="text-2xl font-semibold tracking-tight">
              Gestão de pequenos alvarás
            </h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6 rounded-xl border border-[#bfdbfe] bg-[#eff6ff] p-4">
          <div className="flex gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Info className="size-4 text-primary" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[#1e3a8a]">
                Cadastro de pedidos
              </h2>
              <p className="mt-1 text-sm text-[#1d4ed8]">
                Use o formulário ao lado para registrar novos pedidos de alvará
                de reforma.
              </p>
            </div>
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-[420px_minmax(0,1fr)]">
          <div className="rounded-xl border bg-background p-6 shadow-sm">
            <div className="mb-6 border-b pb-4">
              <h2 className="text-xl font-semibold">Novo pedido</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Preencha os dados para registrar um novo pedido no sistema.
              </p>
            </div>

            <RequestForm />
          </div>

          <div className="rounded-xl border bg-background p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4 border-b pb-4">
              <div>
                <h2 className="text-xl font-semibold">Pedidos cadastrados</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Área preparada para exibir e gerenciar os pedidos registrados.
                </p>
              </div>

              <div className="rounded-full border bg-muted px-3 py-1 text-xs text-muted-foreground">
                Sem dados por enquanto
              </div>
            </div>

            <div className="space-y-3 py-6">
              <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-3 rounded-lg border bg-muted/40 px-4 py-3 text-sm font-medium">
                <span>Proprietário</span>
                <span>Tipo de obra</span>
                <span>Status</span>
              </div>

              <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-3 rounded-lg border px-4 py-4 text-sm text-muted-foreground">
                <span>Lista será exibida aqui</span>
                <span>-</span>
                <span>-</span>
              </div>

              <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-3 rounded-lg border px-4 py-4 text-sm text-muted-foreground">
                <span>Registros futuros</span>
                <span>-</span>
                <span>-</span>
              </div>

              <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-3 rounded-lg border px-4 py-4 text-sm text-muted-foreground">
                <span>Conteúdo do CRUD</span>
                <span>-</span>
                <span>-</span>
              </div>
            </div>

            <div className="rounded-lg border border-dashed bg-muted/30 px-4 py-3">
              <p className="text-sm text-muted-foreground">
                A listagem será conectada aos dados em uma etapa futura.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
