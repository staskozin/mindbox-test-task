import React from 'react'

import { Task } from '../App'


export default function TaskElem(props: TaskElemProps) {
  return (
    <li>
      <input type="checkbox" checked={props.isDone} onChange={() => props.updateTaskDoneness(props.id, !props.isDone)} />
      <textarea spellCheck={false} value={props.text} onChange={(e) => props.updateTaskText(props.id, e.target.value)} />
      <button onClick={() => props.deleteTask(props.id)}>
        <img src="icon/trash.svg" alt="Удалить дело" />
      </button>
    </li>
  );
}

type TaskElemProps = Task & {
  deleteTask: (id: number) => void
  updateTaskDoneness: (id: number, isDone: boolean) => void
  updateTaskText: (id: number, text: string) => void
}
