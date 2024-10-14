import React from 'react'
import { render, screen } from '@testing-library/react'
import TaskList from './TaskList'
import { Task } from '../App/App'


describe('Список дел', () => {
  const oneTask: Array<Task> = [
    {
      id: 0,
      text: 'текст',
      isDone: false
    }
  ]
  const manyTasks: Array<Task> = [
    {
      id: 0,
      text: 'текст',
      isDone: false
    },
    {
      id: 1,
      text: 'текст',
      isDone: false
    },
    {
      id: 2,
      text: 'текст',
      isDone: false
    },
  ]
  test('одно дело', () => {
    render(
      <TaskList
        tasks={oneTask}
        deleteTask={() => { }} updateTaskDoneness={() => { }} updateTaskText={() => { }} // Функции тестируются в App
      />
    )
    const element = screen.getByText(/текст/i)
    expect(element).toBeInTheDocument()
  })

  test('много дел', () => {
    render(
      <TaskList
        tasks={manyTasks}
        deleteTask={() => { }} updateTaskDoneness={() => { }} updateTaskText={() => { }} // Функции тестируются в App
      />
    )
    const elements = screen.getAllByText(/текст/i)
    expect(elements.length).toBe(3)
  })
})
