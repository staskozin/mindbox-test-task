import React from 'react'

import TaskFilter from './components/TaskFilter'
import ActiveTasksCounter from './components/ActiveTasksCounter'
import NewTaskInput from './components/NewTaskInput'
import TaskList from './components/TaskList'

import usePersistentState from './usePersistentState'


export default function App() {
  const [tasks, setTasks] = usePersistentState<Array<Task>>('tasks', [])
  const [filter, setFilter] = usePersistentState<TaskFilterValue>('filter', 'all')

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

  function updateTaskDoneness(id: number, isDone: boolean): void {
    const updatedTaskIndex = tasks.findIndex(t => t.id === id)
    if (updatedTaskIndex < 0) return
    setTasks(tasks.map(t => {
      if (t.id === id) {
        t.isDone = isDone
      }
      return t
    }))
  }

  function filterTasks(filterValue: TaskFilterValue): Array<Task> {
    if (filterValue === 'all') return tasks
    return tasks.filter(t => t.isDone === (filterValue === 'done'))
  }

  const activeTasksNumber: number = tasks.filter(t => !t.isDone).length

  return (
    <>
      <main className="container">
        <h1>Список дел</h1>
        <TaskFilter filter={filter} updateTaskFilter={setFilter} />
        <ActiveTasksCounter tasksNumber={tasks.length} activeTasksNumber={activeTasksNumber} />
        <button>Удалить выполненные</button>
        <NewTaskInput createTask={createTask} />
        <TaskList tasks={filterTasks(filter)} deleteTask={deleteTask} updateTaskDoneness={updateTaskDoneness} />
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

export type TaskFilterValue = 'all' | 'active' | 'done'
