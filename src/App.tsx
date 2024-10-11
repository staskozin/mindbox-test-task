import React from 'react'

import NewTaskInput from './components/NewTaskInput'
import TaskList from './components/TaskList'

import usePersistentState from './usePersistentState'


export default function App() {
  const [tasks, setTasks] = usePersistentState<Array<Task>>('tasks', [])

  function createTask(text: string): void {
    if (text === '') return
    const newId: number = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1
    setTasks([
      ...tasks,
      {
        id: newId,
        text: text,
        isDone: false
      }
    ])
  }

  function deleteTask(id: number): void {
    setTasks(tasks.filter(t => t.id !== id))
  }

  return (
    <>
      <main className="container">
        <h1>Список дел</h1>
        <div>
          <span>Показывать:</span>
          <label>
            <input type="radio" />
            <span>Все</span>
          </label>
          <label>
            <input type="radio" />
            <span>Активные</span>
          </label>
          <label>
            <input type="radio" />
            <span>Выполненные</span>
          </label>
        </div>
        <span>Выполнено 0 из 10 задач</span>
        <button>Удалить выполненные</button>
        <NewTaskInput createTask={createTask} />
        <TaskList tasks={tasks} deleteTask={deleteTask} />
      </main>

      <footer>Сделал <a href="https://staskozin.ru">Станислав Козин</a> в 2024 году</footer>
    </>
  );
}

export type Task = {
  id: number
  text: string
  isDone: boolean
}
