import React from 'react'


function declOfNum(n: number, titles: Array<string>): string {
  return titles[n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
}

function createMessage(tasksNumber: number, activeTasksNumber: number) {
  if (tasksNumber === 0) {
    return 'Нет дел'
  }
  if (activeTasksNumber === 0) {
    return 'Все дела сделаны'
  }
  return `Осталось ${activeTasksNumber} ${declOfNum(activeTasksNumber, ['дело', 'дела', 'дел'])}`
}

export default function ActiveTasksCounter(props: ActiveTasksCounterProps) {
  return (
    <span>
      {createMessage(props.tasksNumber, props.activeTasksNumber)}
    </span>
  );
}

type ActiveTasksCounterProps = {
  tasksNumber: number
  activeTasksNumber: number
}
