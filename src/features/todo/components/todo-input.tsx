import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { createTodoFn } from '@/features/todo/server/fn'
import { TODOS_QUERY_KEYS } from '../constants'

export function TodoInput() {
  const queryClient = useQueryClient()
  const [input, setInput] = useState('')

  const createMutation = useMutation({
    mutationFn: (title: string) => createTodoFn({ data: { title } }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEYS.all }),
  })

  const addTodo = () => {
    if (!input.trim()) return
    createMutation.mutate(input.trim())
    setInput('')
  }

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    addTodo()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-5 flex gap-2 rounded-lg border border-white/10 bg-zinc-950/70 p-2 shadow-black/30 shadow-inner transition-colors focus-within:border-emerald-400/50"
    >
      <input
        aria-label="Todo title"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new todo..."
        className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-zinc-50 outline-none placeholder:text-zinc-500 focus-visible:ring-0"
      />
      <Button
        type="submit"
        disabled={createMutation.isPending}
        className="h-10 min-w-20 bg-emerald-400 px-4 text-zinc-950 hover:bg-emerald-300"
      >
        <Plus className="size-4" />
        {createMutation.isPending ? 'Adding' : 'Add'}
      </Button>
    </form>
  )
}
