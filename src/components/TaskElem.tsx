import React from 'react'

import { Task } from '../App'


export default function TaskElem(props: TaskElemProps) {
  return (
    <li>
      <input type="checkbox" checked={props.isDone} />
      <textarea spellCheck={false} value={props.text} />
      <button><img src="icon/trash.svg" alt="Удалить дело" /></button>
    </li>
  );
}

type TaskElemProps = Task
