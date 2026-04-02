import { Input } from "@/components/ui/input"
import { RequestList } from "@/components/request-list"
import { RequestForm } from "@/components/request-form"
import {
  Building2,
  FileCheck,
  FileClock,
  FileX,
  FolderOpen,
  Search,
} from "lucide-react"

const stats = [
  {
    title: "Total de Pedidos",
    value: 0,
    icon: FolderOpen,
    className: "border-[#dbe6f3]",
  },
  {
    title: "Em Análise",
    value: 0,
    icon: FileClock,
    className: "border-[#f3e6bf] bg-[#fffaf0]",
  },
  {
    title: "Aprovados",
    value: 0,
    icon: FileCheck,
    className: "border-[#c8f0db] bg-[#f5fdf8]",
  },
  {
    title: "Negados",
    value: 0,
    icon: FileX,
    className: "border-[#f7d4d4] bg-[#fff8f8]",
  },
]

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-[#eef3f8]">
      <header className="border-b bg-background shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-5 sm:px-6">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Building2 className="size-6" strokeWidth={2} />
          </div>
          <div>
            <p className="text-sm leading-5 text-muted-foreground">
              Secretaria Municipal de Urbanismo e Licenciamento
            </p>
            <h1 className="text-[1.75rem] font-semibold tracking-tight">
              Gestão de pequenos alvarás
            </h1>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-8 sm:px-6 lg:py-10">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon

            return (
              <div
                key={stat.title}
                className={`rounded-xl border bg-background p-5 shadow-sm ${stat.className}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                      {stat.value}
                    </p>
                  </div>
                  <div className="flex size-11 items-center justify-center rounded-xl bg-muted/60 text-primary">
                    <Icon className="size-5" />
                  </div>
                </div>
              </div>
            )
          })}
        </section>

        <section className="rounded-xl border bg-background p-5 shadow-sm sm:p-6">
          <div className="mb-6 border-b pb-4">
            <p className="text-xs font-semibold tracking-[0.12em] text-primary uppercase">
              Cadastro
            </p>
            <h2 className="mt-2">Novo Pedido de Alvará</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Preencha os dados do pedido de alvará de reforma
            </p>
          </div>

          <RequestForm />
        </section>

        <section>
          <div className="mb-4">
            <p className="text-xs font-semibold tracking-[0.12em] text-primary uppercase">
              Acompanhamento
            </p>
            <h2 className="mt-2">Pedidos Cadastrados</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Visualize, gerencie e acompanhe todos os pedidos de alvará de
              reforma cadastrados no sistema
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
            <div className="border-b bg-muted/10 p-4">
              <div className="relative">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  readOnly
                  className="pl-9 text-muted-foreground"
                  placeholder="Buscar por nome, CPF, endereço, SQL ou tipo de obra..."
                />
              </div>
            </div>

            <RequestList />
          </div>
        </section>
      </main>

      <footer className="mt-12 border-t bg-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© 2026 Prefeitura Municipal de São Paulo - SMUL</p>
          <p>Sistema de Gestão de Alvarás v1.0.0</p>
        </div>
      </footer>
    </div>
  )
}
