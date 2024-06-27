import {useState} from "react";

import './CounterWithCustomHook.css'

function useCounter(initialValue) {
  const [counter, setCounter] = useState(initialValue);

  const handleChangeCounter = (i) => setCounter(counter => counter + i);
  const rndChangeCounter = () => setCounter(Math.floor(Math.random() * (50 - -50) + -50));
  const resetCounter = () => setCounter(initialValue); 

  return {
    counter, 
    handleChangeCounter, 
    rndChangeCounter, 
    resetCounter
  }
}

const Counter = (props) => {
  const {counter, handleChangeCounter, rndChangeCounter, resetCounter} = useCounter(props.counter)

    return (
      <div className="component">
        <div className="counter">{counter}</div>
        <div className="controls">
          <button onClick={() => counter < 50 ? handleChangeCounter(1) : null}>INC</button>
          <button onClick={() => counter > -50 ? handleChangeCounter(-1): null}>DEC</button>
          <button onClick={rndChangeCounter}>RND</button>
          <button onClick={resetCounter}>RESET</button>
        </div>
      </div>
    )
}

const RndCounter = (props) => {
  const {counter, rndChangeCounter, resetCounter} = useCounter(props.counter)

    return (
      <div className="component">
        <div className="counter">{counter}</div>
        <div className="controls">
        <button onClick={rndChangeCounter}>RND</button>
        <button onClick={resetCounter}>RESET</button>
        </div>
      </div>
    )
}

const CounterWithCustomHook = () => {
    return (
        <>
            <Counter counter={0}/>
            <RndCounter counter={5}/>
        </>
    )
}

export default CounterWithCustomHook;
