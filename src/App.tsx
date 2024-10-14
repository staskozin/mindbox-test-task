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
      {
        id: newId,
        text: text,
        isDone: false
      },
      ...tasks
    ])
  }

  function createManyTasks(rows: Array<string>): void {
    let newId: number = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1
    setTasks([
      ...rows.filter(r => r.trim() !== '').map(r => {
        return {
          id: newId++,
          text: r,
          isDone: false
        }
      }),
      ...tasks
    ])
  }

  function deleteTask(id: number): void {
    const newTasks = tasks.filter(t => t.id !== id)
    if (filter === 'active' && !newTasks.find(t => !t.isDone)) {
      setFilter('all')
    } else if (filter === 'done' && !newTasks.find(t => t.isDone)) {
      setFilter('all')
    }
    setTasks(newTasks)
  }

  function deleteDoneTasks(): void {
    if (filter === 'done') {
      setFilter('all')
    }
    setTasks(tasks.filter(t => !t.isDone))
  }

  function updateTaskDoneness(id: number, isDone: boolean): void {
    const updatedTaskIndex: number = tasks.findIndex(t => t.id === id)
    if (updatedTaskIndex < 0) return
    setTasks(tasks.map(t => {
      if (t.id === id) {
        t.isDone = isDone
      }
      return t
    }))
  }

  function updateTaskText(id: number, text: string): void {
    const updatedTaskIndex: number = tasks.findIndex(t => t.id === id)
    if (updatedTaskIndex < 0) return
    setTasks(tasks.map(t => {
      if (t.id === id) {
        t.text = text
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
        <div className="menu">
          <TaskFilter filter={filter} updateTaskFilter={setFilter} tasksNumber={tasks.length} activeTasksNumber={activeTasksNumber} />
          <div className="menu-right-col">
            {
              tasks.filter(t => t.isDone).length > 0 ?
                <button className='delete-done-button' onClick={() => deleteDoneTasks()}>Удалить сделанные</button>
                : null
            }
            <ActiveTasksCounter tasksNumber={tasks.length} activeTasksNumber={activeTasksNumber} />
          </div>
        </div>

        <NewTaskInput createTask={createTask} createManyTasks={createManyTasks} filter={filter} updateTaskFilter={setFilter} />
        <TaskList tasks={filterTasks(filter)} deleteTask={deleteTask} updateTaskDoneness={updateTaskDoneness} updateTaskText={updateTaskText} />
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
