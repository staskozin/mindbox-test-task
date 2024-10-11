import React from 'react'

import TaskElem from './TaskElem'

import { Task } from '../App'


export default function TaskList(props: TaskListProps) {
  return (
    <ul>
      {props.tasks.map(t => {
        return <TaskElem key={t.id} id={t.id} isDone={t.isDone} text={t.text} />
      })}
    </ul>
  );
}

type TaskListProps = {
  tasks: Array<Task>
}
