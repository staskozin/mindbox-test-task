import React from 'react'

import { TaskFilterValue } from '../App/App'

import './TaskFilter.css'


export default function TaskFilter(props: TaskFilterProps) {
  const filters: Record<TaskFilterValue, string> = {
    'all': 'Все',
    'active': 'Активные',
    'done': 'Сделанные'
  }

  return (
    <form className='filter'>
      {
        Object.keys(filters).map(f => {
          return (
            <label key={f}>
              <input
                type="radio"
                name="task-filter"
                checked={props.filter === f}
                disabled={(() => {
                  if (f === 'active') {
                    return props.activeTasksNumber === 0
                  }
                  if (f === 'done') {
                    return (props.tasksNumber - props.activeTasksNumber) === 0
                  }
                  return false
                })()}
                onChange={() => props.updateTaskFilter(f as TaskFilterValue)}
              />
              <span>{filters[f as TaskFilterValue]}</span>
            </label>
          )
        })
      }
    </form>
  );
}

type TaskFilterProps = {
  filter: TaskFilterValue
  updateTaskFilter: (value: TaskFilterValue) => void
  tasksNumber: number
  activeTasksNumber: number
}
