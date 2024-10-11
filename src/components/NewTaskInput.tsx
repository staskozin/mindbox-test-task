import React, { useRef, useState } from 'react'

import './NewTaskInput.css'


export default function NewTaskInput(props: NewTaskInputProps) {
  const [value, setValue] = useState<string>('')
  const input = useRef<HTMLInputElement>(null)

  function handler() {
    props.createTask(value)
    setValue('')
    input.current?.focus()
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
}
