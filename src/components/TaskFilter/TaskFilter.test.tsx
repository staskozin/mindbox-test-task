import React from 'react'
import { render, screen } from '@testing-library/react'
import TaskFilter from './TaskFilter'


describe('Кнопки фильтра дел', () => {
  test('отключение фильтра активных дел', () => {
    render(
      <TaskFilter
        filter={'all'}
        tasksNumber={1}
        activeTasksNumber={1}
        updateTaskFilter={() => { }} // Функции тестируются в App
      />
    )
    expect(screen.getByLabelText(/Активные/i)).not.toBeDisabled()
    expect(screen.getByLabelText(/Сделанные/i)).toBeDisabled()
  })

  test('отключение фильтра сделанных дел', () => {
    render(
      <TaskFilter
        filter={'all'}
        tasksNumber={1}
        activeTasksNumber={0}
        updateTaskFilter={() => { }} // Функции тестируются в App
      />
    )
    expect(screen.getByLabelText(/Активные/i)).toBeDisabled()
    expect(screen.getByLabelText(/Сделанные/i)).not.toBeDisabled()
  })

  test('отключение фильтра, когда нет дел', () => {
    render(
      <TaskFilter
        filter={'all'}
        tasksNumber={0}
        activeTasksNumber={0}
        updateTaskFilter={() => { }} // Функции тестируются в App
      />
    )
    expect(screen.getByLabelText(/Активные/i)).toBeDisabled()
    expect(screen.getByLabelText(/Сделанные/i)).toBeDisabled()
  })
})
