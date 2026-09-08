// @vitest-environment jsdom

import '@testing-library/jest-dom/vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import Todo from './Todo'

describe('Todo', () => {
  test('renders an unfinished todo and calls completeTodo', () => {
    const todo = {
      _id: '123',
      text: 'Learn to test containerized applications',
      done: false
    }

    const deleteTodo = vi.fn()
    const completeTodo = vi.fn()

    render(
      <Todo
        todo={todo}
        deleteTodo={deleteTodo}
        completeTodo={completeTodo}
      />
    )

    expect(screen.getByText(todo.text)).toBeInTheDocument()
    expect(screen.getByText('This todo is not done')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /set as done/i }))

    expect(completeTodo).toHaveBeenCalledTimes(1)
    expect(completeTodo).toHaveBeenCalledWith(todo)
  })
})
