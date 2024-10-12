import React from 'react'

import TaskElem from './TaskElem'

import { Task } from '../App'

import './TaskList.css'


export default function TaskList(props: TaskListProps) {
  return (
    <ul className='task-list'>
      {props.tasks.map(t => {
        return <TaskElem key={t.id} id={t.id} isDone={t.isDone} text={t.text} deleteTask={props.deleteTask} updateTaskDoneness={props.updateTaskDoneness} updateTaskText={props.updateTaskText} />
      })}
      {
        props.tasks.length === 0 ?
          <li style={{ textAlign: 'center', fontSize: '0.9em' }}>Пусто</li>
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
