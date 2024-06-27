import {useEffect, useState} from "react";

import './CounterWithCustomHook.css'

function useCounter() {
  const [counter, setCounter] = useState(0);
  
  useEffect(() => {
    getNumber("https://www.random.org/integers/?num=1&min=-50&max=50&col=1&base=10&format=plain&rnd=new")
    .then(data => setCounter(data))
  }, [])
  
  const getNumber = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`could not fetch status: ${response.status}`)
    } 
    return await response.json();
  }

  const handleChangeCounter = (i) => setCounter(counter => counter + i);
  const rndChangeCounter = () => setCounter(Math.floor(Math.random() * (50 - -50) + -50));
  const resetCounter = () => setCounter(0); 

  return {
    counter, 
    handleChangeCounter, 
    rndChangeCounter, 
    resetCounter
  }
}

const Counter = () => {
  const {counter, handleChangeCounter, rndChangeCounter, resetCounter} = useCounter()

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

const RndCounter = () => {
  const {counter, rndChangeCounter, resetCounter} = useCounter()

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
          <Counter/>
          <RndCounter/>
        </>
    )
}

export default CounterWithCustomHook;
