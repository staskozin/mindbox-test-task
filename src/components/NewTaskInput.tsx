import React, { useRef, useState } from 'react'

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
  filter: TaskFilterValue
  updateTaskFilter: (value: TaskFilterValue) => void
}
