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
      if (e.ctrlKey || e.metaKey || e.altKey) return
      e.preventDefault()
      const newValue = input.current?.value + e.key
      setValue(newValue)
      input.current?.focus()
    }

    const paste = (e: ClipboardEvent) => {
      if (document.activeElement?.tagName.toLowerCase() === 'textarea') return
      const text = e.clipboardData?.getData('text/plain')
      if (text?.includes('\n')) {
        e.preventDefault()
        const rows = (input.current?.value + text).split('\n')
        createManyTasks(rows)
        setValue('')
        input.current?.focus()
        return
      }
      if (text && input.current?.value === '') {
        setValue(text)
        input.current?.focus()
      }
    }

    document.addEventListener('keydown', focusWhenKeyPressed)
    document.addEventListener('paste', paste)
    return () => {
      document.removeEventListener('keydown', focusWhenKeyPressed)
      document.removeEventListener('paste', paste)
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
