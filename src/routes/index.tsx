import { createFileRoute } from '@tanstack/react-router'

import { TodoInput } from '@/features/todo/components/todo-input'
import { TodoList } from '@/features/todo/components/todo-list'
import { getTodosQueryOptions } from '@/features/todo/server/queries'

export const Route = createFileRoute('/')({
  component: App,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(getTodosQueryOptions()),
})

function App() {
  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-8 text-zinc-100 sm:px-6">
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-xl items-center">
        <section className="w-full rounded-lg border border-white/10 bg-zinc-900/90 p-5 shadow-2xl shadow-black/40 sm:p-6">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="font-medium text-emerald-300 text-sm">
                Today&apos;s focus
              </p>
              <h1 className="mt-1 font-semibold text-3xl text-zinc-50">
                Todo App
              </h1>
            </div>
            <div className="rounded-md border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-emerald-200 text-sm">
              Live list
            </div>
          </div>
          <TodoInput />
          <TodoList />
        </section>
      </main>
    </div>
  )
}
