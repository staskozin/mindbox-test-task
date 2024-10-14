import React from 'react'
import { render, screen, fireEvent, createEvent } from '@testing-library/react'
import App from './App'

// Из-за того, что я храню задачи в localStorage, cleanup не спасает, поэтому тут этот код
const setItemMock = jest.fn();
const getItemMock = jest.fn();
beforeEach(() => {
  Storage.prototype.setItem = setItemMock;
  Storage.prototype.getItem = getItemMock;
});
afterEach(() => {
  setItemMock.mockRestore();
  getItemMock.mockRestore();
});

test('создание задачи', () => {
  render(<App />)
  const input: HTMLInputElement = screen.getByRole('textbox')
  const button: HTMLButtonElement = screen.getByRole('button')
  fireEvent.change(input, { target: { value: 'Текст' } })
  fireEvent.click(button)
  expect(screen.getByText(/Текст/i)).toBeInTheDocument()
})

test('редактирование задачи', () => {
  render(<App />)
  const input: HTMLInputElement = screen.getByRole('textbox')
  const button: HTMLButtonElement = screen.getByRole('button')
  fireEvent.change(input, { target: { value: 'Текст' } })
  fireEvent.click(button)
  const textarea: HTMLTextAreaElement = screen.getByDisplayValue('Текст')
  fireEvent.change(textarea, { target: { value: 'Новый текст' } })
  expect(screen.getByText(/Новый текст/i)).toBeInTheDocument()
})

test('удаление задачи', () => {
  render(<App />)
  const input: HTMLInputElement = screen.getByRole('textbox')
  const button: HTMLButtonElement = screen.getByRole('button')
  fireEvent.change(input, { target: { value: 'Текст' } })
  fireEvent.click(button)
  fireEvent.click(screen.getAllByRole('button')[1])
  expect(screen.getByText(/Пусто/i)).toBeInTheDocument()
})

test('смена состояния задачи на выполенное', () => {
  render(<App />)
  const input: HTMLInputElement = screen.getByRole('textbox')
  const button: HTMLButtonElement = screen.getByRole('button')
  fireEvent.change(input, { target: { value: 'Текст' } })
  fireEvent.click(button)
  const checkbox: HTMLInputElement = screen.getByRole('checkbox')
  fireEvent.click(checkbox)
  expect(checkbox).toBeChecked()
})

test('многострочный paste создает несколько задач', () => {
  render(<App />)
  const input: HTMLInputElement = screen.getByRole('textbox')
  const paste = createEvent.paste(input, {
    clipboardData: {
      getData: () => '1\n2\n3',
    },
  })
  fireEvent(input, paste)
  expect(screen.getAllByText(/^[0-9]$/i).length).toBe(3)
})

const createFiveTasks = () => {
  render(<App />)
  const input: HTMLInputElement = screen.getByRole('textbox')
  const button: HTMLButtonElement = screen.getByRole('button')
  const tasks: Array<string> = ['Задача 1', 'Задача 2', 'Задача 3', 'Задача 4', 'Задача 5']
  for (let t of tasks) {
    fireEvent.change(input, { target: { value: t } })
    fireEvent.click(button)
  }
}

test('элементы правильно сортируются при изменении состояния задачи', () => {
  createFiveTasks()
  const checkboxes = screen.getAllByRole('checkbox')
  fireEvent.click(checkboxes[0])
  fireEvent.click(checkboxes[2])
  fireEvent.click(checkboxes[0])
  const tasks: Array<HTMLTextAreaElement> = screen.getAllByText(/задача/i)
  expect(tasks[0].value).toBe('Задача 4')
  expect(tasks[1].value).toBe('Задача 2')
  expect(tasks[2].value).toBe('Задача 1')
  expect(tasks[3].value).toBe('Задача 5')
  expect(tasks[4].value).toBe('Задача 3')
})

test('кнопка «удалить сделанные»', () => {
  createFiveTasks()
  const checkboxes = screen.getAllByRole('checkbox')
  fireEvent.click(checkboxes[0])
  fireEvent.click(checkboxes[1])
  fireEvent.click(screen.getByText(/Удалить сделанные/i))
  const tasks = screen.getAllByText(/задача/i)
  expect(tasks.length).toBe(3)
})

test('удаление всех сделанных задач при фильтрации по сделанным переключает фильтр на «все» и отключает «сделанные»', () => {
  createFiveTasks()
  const checkboxes = screen.getAllByRole('checkbox')
  fireEvent.click(checkboxes[0])
  fireEvent.click(checkboxes[1])
  const done: HTMLInputElement = screen.getByLabelText('Сделанные')
  fireEvent.click(done)
  fireEvent.click(screen.getByText(/Удалить сделанные/i))
  expect(screen.getByLabelText('Все')).toBeChecked()
  expect(done).toBeDisabled()
})

test('удаление всех активных задач при фильтрации по активным переключает фильтр на «все» и отключает «активные»', () => {
  createFiveTasks()
  const checkboxes = screen.getAllByRole('checkbox')
  const buttons: Array<HTMLInputElement> = screen.getAllByRole('button').slice(-5) as Array<HTMLInputElement>
  fireEvent.click(checkboxes[0])
  fireEvent.click(checkboxes[1])
  const active: HTMLInputElement = screen.getByLabelText('Активные')
  fireEvent.click(active)
  fireEvent.click(buttons[2])
  fireEvent.click(buttons[3])
  fireEvent.click(buttons[4])
  expect(screen.getByLabelText('Все')).toBeChecked()
  expect(active).toBeDisabled()
})
