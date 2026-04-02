import { RequestForm } from "@/components/request-form"

export default function Page() {
  return (
    <main className="min-h-screen bg-muted/30">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-10">
        <header className="rounded-2xl border bg-background px-8 py-7 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">
            Secretaria Municipal de Urbanismo e Licenciamento
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Gestão de pedidos de alvará
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
            Painel interno para registro e acompanhamento de pequenos pedidos de
            reforma.
          </p>
        </header>

        <section className="mt-6 grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
          <div className="rounded-2xl border bg-background p-6 shadow-sm">
            <div className="border-b pb-4">
              <h2 className="text-lg font-semibold">Novo pedido</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Preencha os dados para registrar um novo pedido.
              </p>
            </div>

            <RequestForm />
          </div>

          <div className="rounded-2xl border bg-background p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4 border-b pb-4">
              <div>
                <h2 className="text-lg font-semibold">Pedidos cadastrados</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Área preparada para exibir a lista de pedidos.
                </p>
              </div>

              <div className="rounded-full border bg-muted px-3 py-1 text-xs text-muted-foreground">
                Sem dados por enquanto
              </div>
            </div>

            <div className="space-y-3 py-6">
              <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-3 rounded-lg border bg-muted/20 px-4 py-3 text-sm font-medium">
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
      </div>
    </main>
  )
}
