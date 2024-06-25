import {useState} from "react";
import './Counter.css';

const Counter = (props) => {
  const [counter, setCounter] = useState(props.counter)

  const changeCounter = (i) => {
    setCounter(counter => counter + i)
  }

  const randomCounter = () => {
    const randomNum = Math.floor(Math.random() * (50 - -50) + -50);
    setCounter(randomNum);
  }

  const resetCounter = () => {
    setCounter(props.counter);
  }

    return (
      <div className="couter__wrapper">
        <div className="counter">{counter}</div>
        <div className="controls">
          <button onClick={() => (counter < 50) ? changeCounter(1) : null} >INC</button>
          <button onClick={() => (counter > -50) ? changeCounter(-1) : null} >DEC</button>
          <button onClick={randomCounter}>RND</button>
          <button onClick={resetCounter}>RESET</button>
        </div>
      </div>
    )
}

export default Counter;

// 1) Начальное значение счетчика должно передаваться через props
// 2) INC и DEC увеличивают и уменьшают счетчик соответственно на 1. Без ограничений, но можете добавить границу в -50/50. По достижению границы ничего не происходит
// 3) RND изменяет счетчик в случайное значение от -50 до 50. Конструкцию можете прогуглить за 20 секунд :) Не зависит от предыдущего состояния
// 4) RESET сбрасывает счетчик в 0 или в начальное значение из пропсов. Выберите один из вариантов