import React, { useEffect, useRef, useState } from 'react'

import { TaskFilterValue } from '../App'

import './NewTaskInput.css'


export default function NewTaskInput(props: NewTaskInputProps) {
  const [value, setValue] = useState<string>('')
  const input = useRef<HTMLInputElement>(null)

  function handler() {
    props.createTask(value)
    setValue('')
    input.current?.focus()
    if (props.filter === 'done') {
      props.updateTaskFilter('active')
    }
  }

  const createManyTasks = props.createManyTasks

  useEffect(() => {
    const focusWhenKeyPressed = (e: KeyboardEvent) => {
      if (document.activeElement === input.current) return
      if (document.activeElement?.tagName.toLowerCase() === 'textarea') return
      if (!e.key.match(/^.$/)) return
      // if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v') return
      // if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') return
      if (e.ctrlKey || e.metaKey || e.altKey) return
      e.preventDefault()
      const newValue = input.current?.value + e.key
      setValue(newValue)
      input.current?.focus()
    }

    document.addEventListener('keydown', focusWhenKeyPressed)
    return () => {
      document.removeEventListener('keydown', focusWhenKeyPressed)
    }
  }, [createManyTasks])

  return (
    <div className="new-task-input">
      <input
        ref={input}
        autoFocus
        className="new-task-input__input"
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyUp={e => {
          if (e.key === 'Enter') {
            handler()
          }
        }}
      />
      <button onClick={handler}>
        <img src="icon/plus.svg" alt="" />
      </button>
    </div>
  );
}

type NewTaskInputProps = {
  createTask: (text: string) => void
  createManyTasks: (rows: Array<string>) => void
  filter: TaskFilterValue
  updateTaskFilter: (value: TaskFilterValue) => void
}
