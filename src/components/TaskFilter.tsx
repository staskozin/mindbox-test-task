import React from 'react'

import { TaskFilterValue } from '../App'


export default function TaskFilter(props: TaskFilterProps) {
  const filters: Record<TaskFilterValue, string> = {
    'all': 'Все',
    'active': 'Активные',
    'done': 'Выполненные'
  }

  return (
    <form>
      <span>Показывать:</span>
      {
        Object.keys(filters).map(f => {
          return (
            <label key={f}>
              <input type="radio" name="task-filter" checked={props.filter === f} onChange={e => props.updateTaskFilter(f as TaskFilterValue)} />
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
}
