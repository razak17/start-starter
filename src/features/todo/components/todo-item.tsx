import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'

import type { Todo } from '@/lib/db/schema/todos'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { deleteTodoFn, toggleTodoFn } from '@/features/todo/server/fn'
import { TODOS_QUERY_KEYS } from '../constants'

interface TodoItemProps {
  todo: Todo
}

export function TodoItem({ todo }: TodoItemProps) {
  const queryClient = useQueryClient()

  const toggleMutation = useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      toggleTodoFn({ data: { id, completed } }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEYS.all }),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteTodoFn({ data: { id } }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEYS.all }),
  })

  return (
    <li className="group flex items-center gap-3 rounded-md border border-white/10 bg-zinc-950/50 p-3 shadow-black/20 shadow-sm transition-colors hover:border-emerald-400/30 hover:bg-zinc-900">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() =>
          toggleMutation.mutate({
            id: todo.id,
            completed: !todo.completed,
          })
        }
        disabled={toggleMutation.isPending}
        className="size-5 cursor-pointer accent-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
      />
      <span
        className={cn(
          'min-w-0 flex-1 break-words text-sm',
          todo.completed ? 'text-zinc-500 line-through' : 'text-zinc-100',
        )}
      >
        {todo.title}
      </span>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => deleteMutation.mutate(todo.id)}
        disabled={deleteMutation.isPending}
        aria-label={`Delete ${todo.title}`}
        className="text-zinc-500 hover:bg-red-500/10 hover:text-red-300"
      >
        <Trash2 className="size-4" />
      </Button>
    </li>
  )
}
