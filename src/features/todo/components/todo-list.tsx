import { useSuspenseQuery } from '@tanstack/react-query'

import { TodoItem } from './todo-item'
import { getTodosQueryOptions } from '../server/queries'

export function TodoList() {
  const { data: todos } = useSuspenseQuery(getTodosQueryOptions())
  const completedCount = todos.filter((todo) => todo.completed).length
  const completedPercent =
    todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0

  return (
    <>
      {todos.length === 0 && (
        <div className="rounded-lg border border-zinc-700 border-dashed bg-zinc-950/50 px-5 py-10 text-center">
          <p className="font-medium text-zinc-200">Nothing queued</p>
          <p className="mt-1 text-sm text-zinc-500">
            Add your first task above.
          </p>
        </div>
      )}

      {todos.length > 0 && (
        <>
          <ul className="space-y-2">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>

          <div className="mt-5 rounded-lg border border-white/10 bg-zinc-950/60 p-4">
            <div className="mb-3 flex items-center justify-between gap-4 text-sm">
              <span className="font-medium text-zinc-300">Progress</span>
              <span className="text-zinc-500">
                {completedCount} of {todos.length} completed
              </span>
            </div>
            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={todos.length}
              aria-valuenow={completedCount}
              className="h-2 overflow-hidden rounded-full bg-zinc-800"
            >
              <div
                className="h-full rounded-full bg-emerald-400 transition-all"
                style={{ width: `${completedPercent}%` }}
              />
            </div>
          </div>
        </>
      )}
    </>
  )
}
