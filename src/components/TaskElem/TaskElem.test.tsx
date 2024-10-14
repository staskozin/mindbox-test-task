import React from 'react'
import { render, screen } from '@testing-library/react'
import TaskElem from './TaskElem'


describe('Элемент списка дел', () => {
  test('рендер текста', () => {
    render(
      <TaskElem
        id={0}
        isDone={false}
        text='текст'
        deleteTask={() => { }} updateTaskDoneness={() => { }} updateTaskText={() => { }} // Функции тестируются в App
      />
    )
    const element = screen.getByText(/текст/i)
    expect(element).toBeInTheDocument()
  })

  test('наличие кнопки удаления', () => {
    render(
      <TaskElem
        id={0}
        isDone={true}
        text='текст'
        deleteTask={() => { }} updateTaskDoneness={() => { }} updateTaskText={() => { }} // Функции тестируются в App
      />
    )
    const element = screen.getByRole('button')
    expect(element).toBeInTheDocument()
  })

  test('наличие чекбокса', () => {
    render(
      <TaskElem
        id={0}
        isDone={true}
        text='текст'
        deleteTask={() => { }} updateTaskDoneness={() => { }} updateTaskText={() => { }} // Функции тестируются в App
      />
    )
    const element = screen.getByRole('checkbox')
    expect(element).toBeInTheDocument()
  })

  test('активное дело', () => {
    render(
      <TaskElem
        id={0}
        isDone={false}
        text='текст'
        deleteTask={() => { }} updateTaskDoneness={() => { }} updateTaskText={() => { }} // Функции тестируются в App
      />
    )
    const element = screen.getByRole('checkbox')
    expect(element).not.toBeChecked()
  })

  test('сделанное дело', () => {
    render(
      <TaskElem
        id={0}
        isDone={true}
        text='текст'
        deleteTask={() => { }} updateTaskDoneness={() => { }} updateTaskText={() => { }} // Функции тестируются в App
      />
    )
    const element = screen.getByRole('checkbox')
    expect(element).toBeChecked()
  })
})
