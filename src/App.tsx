import React from 'react';
import './App.css';

function App() {
  return (
    <>
      <div className="container">
        <h1>Список дел</h1>

        <div>
          <span>Показывать:</span>
          <label>
            <input type="radio" />
            <span>Все</span>
          </label>
          <label>
            <input type="radio" />
            <span>Активные</span>
          </label>
          <label>
            <input type="radio" />
            <span>Выполненные</span>
          </label>
        </div>

        <span>Выполнено 0 из 10 задач</span>

        <button>Удалить выполненные</button>

        <div className="add">
          <input className="add__input" type="text" />
          <button className="add__button"><img src="icon/plus.svg" alt="" /></button>
        </div>

        <ul>
          <li>
            <input type="checkbox" />
            <textarea spellCheck="true"></textarea>
            <button><img src="icon/trash.svg" alt="" /></button>
          </li>
          <li>
            <input type="checkbox" />
            <textarea spellCheck="false"></textarea>
            <button><img src="icon/trash.svg" alt="" /></button>
          </li>
          <li>
            <input type="checkbox" />
            <textarea spellCheck="false"></textarea>
            <button><img src="icon/trash.svg" alt="" /></button>
          </li>
        </ul>
      </div>

      <footer>Сделал <a href="https://staskozin.ru">Станислав Козин</a> в 2024 году</footer>
    </>
  );
}

export default App;
