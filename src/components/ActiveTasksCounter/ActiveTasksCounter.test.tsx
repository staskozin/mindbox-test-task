import React from 'react'
import { render, screen } from '@testing-library/react'
import ActiveTasksCounter from './ActiveTasksCounter'


describe('Счетчик выполенных дел', () => {
  test('невозможная ситуация, когда активных дел больше чем их всего', () => {
    render(<ActiveTasksCounter tasksNumber={0} activeTasksNumber={1} />)
    const element = screen.getByText(/Делать нечего/i)
    expect(element).toBeInTheDocument()
  })

  test('никаких дел нет', () => {
    render(<ActiveTasksCounter tasksNumber={0} activeTasksNumber={0} />)
    const element = screen.getByText(/Делать нечего/i)
    expect(element).toBeInTheDocument()
  })

  test('активных дел нет, но сделанные есть', () => {
    render(<ActiveTasksCounter tasksNumber={1} activeTasksNumber={0} />)
    const element = screen.getByText(/Все дела сделаны/i)
    expect(element).toBeInTheDocument()
  })

  test('одно активное дело + склонение', () => {
    render(<ActiveTasksCounter tasksNumber={1} activeTasksNumber={1} />)
    const element = screen.getByText(/1 дело/i)
    expect(element).toBeInTheDocument()
  })

  test('два активных дела + склонение', () => {
    render(<ActiveTasksCounter tasksNumber={2} activeTasksNumber={2} />)
    const element = screen.getByText(/2 дела/i)
    expect(element).toBeInTheDocument()
  })

  test('пять активных дел + склонение', () => {
    render(<ActiveTasksCounter tasksNumber={5} activeTasksNumber={5} />)
    const element = screen.getByText(/5 дел/i)
    expect(element).toBeInTheDocument()
  })
})
