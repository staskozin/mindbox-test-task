import React from 'react'

import TaskElem from './TaskElem'

import { Task } from '../App'


export default function TaskList(props: TaskListProps) {
  return (
    <ul>
      {props.tasks.map(t => {
        return <TaskElem key={t.id} id={t.id} isDone={t.isDone} text={t.text} deleteTask={props.deleteTask} updateTaskDoneness={props.updateTaskDoneness} updateTaskText={props.updateTaskText} />
      })}
      {
        props.tasks.length === 0 ?
          <li>Список пуст</li>
          : null
      }
    </ul>
  );
}

type TaskListProps = {
  tasks: Array<Task>
  deleteTask: (id: number) => void
  updateTaskDoneness: (id: number, isDone: boolean) => void
  updateTaskText: (id: number, text: string) => void
}
