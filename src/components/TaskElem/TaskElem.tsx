import React, { useEffect, useRef } from 'react'

import { Task } from '../App/App'

import './TaskElem.css'
import trash from './trash.svg'


/**
 * Динамически меняет высоту поля
 */
function resizeTextarea(textarea: HTMLTextAreaElement) {
  textarea.style.height = "1.6em";
  textarea.style.height = (textarea.scrollHeight) + "px";
}

export default function TaskElem(props: TaskElemProps) {
  const textarea = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const resize = () => resizeTextarea(textarea.current!)
    resize()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <li className='task'>
      <input type="checkbox" checked={props.isDone} onChange={() => props.updateTaskDoneness(props.id, !props.isDone)} />
      <textarea
        ref={textarea}
        spellCheck={false}
        value={props.text}
        onChange={(e) => {
          props.updateTaskText(props.id, e.target.value)
          resizeTextarea(textarea.current!)
        }}
        onKeyDown={(e) => {
          if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            props.updateTaskDoneness(props.id, !props.isDone)
          }
        }}
      />
      <button onClick={() => props.deleteTask(props.id)}>
        <img src={trash} alt="Удалить дело" />
      </button>
    </li>
  );
}

type TaskElemProps = Task & {
  deleteTask: (id: number) => void
  updateTaskDoneness: (id: number, isDone: boolean) => void
  updateTaskText: (id: number, text: string) => void
}
