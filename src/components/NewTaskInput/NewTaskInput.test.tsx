import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import NewTaskInput from './NewTaskInput'


describe('Поле ввода нового дела', () => {
  test('есть поле ввода', () => {
    render(
      <NewTaskInput
        filter='all'
        createTask={() => { }}
        createManyTasks={() => { }}
        updateTaskFilter={() => { }}
      />
    )
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  test('есть кнопка', () => {
    render(
      <NewTaskInput
        filter='all'
        createTask={() => { }}
        createManyTasks={() => { }}
        updateTaskFilter={() => { }}
      />
    )
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  test('ввод в поле работает', () => {

    render(
      <NewTaskInput
        filter='all'
        createTask={() => { }}
        createManyTasks={() => { }}
        updateTaskFilter={() => { }}
      />
    )
    const input: HTMLInputElement = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'Текст' } })
    expect(input.value).toBe('Текст')
  })
})
