export default function Page() {
  return (
    <main className="min-h-screen bg-muted/30">
      <section className="mx-auto flex min-h-screen w-full max-w-4xl items-center px-6 py-16">
        <div className="w-full rounded-2xl border bg-background p-8 shadow-sm">
          <span className="text-sm font-medium text-muted-foreground">
            Teste técnico
          </span>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Sistema de pedidos de alvará
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
            Base inicial do projeto em Next.js com Tailwind CSS e shadcn/ui,
            pronta para evoluir em etapas pequenas.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border bg-muted/40 p-4">
              <p className="text-sm font-medium">Next.js</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Estrutura inicial com App Router.
              </p>
            </div>

            <div className="rounded-xl border bg-muted/40 p-4">
              <p className="text-sm font-medium">Tailwind CSS</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Classes utilitárias prontas para uso.
              </p>
            </div>

            <div className="rounded-xl border bg-muted/40 p-4">
              <p className="text-sm font-medium">shadcn/ui</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Componentes base disponíveis no projeto.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
