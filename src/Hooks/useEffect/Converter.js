import {useEffect, useState} from "react";
import './Converter.css';

// Функция для запроса на сервер
const getData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`could not fetch status: ${response.status}`)
  } 
  return await response.json();
}

const Converter = () => {
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(0);
  const [currency, setCurrency] = useState(null);

  useEffect(() => {
    if (currency) {
      getCurrency(currency)
    }
  }, [currency])

  function getCurrency(currency) {
    getData(`https://api.nbrb.by/exrates/rates/${currency}`)
      .then(data => {
        setResult(+(amount * data.Cur_OfficialRate).toFixed(2))
      })
      .catch(error => console.log('Error', error))
  }

    return (
      <div className="couter__wrapper">
         <input 
          type="number" 
          className="currency__Input"
          placeholder="Enter you currency here"
          value={amount}
          onChange={(e) => setAmount(+e.target.value)} />
        <div className="counter">{result}</div>
        <div className="controls">
          <button onClick={() => setCurrency(431)}>USD</button>
          <button onClick={() => setCurrency(451)}>EUR</button>
          {/* <button onClick={() => {
            setCofficient(0.01)
            setCurrency(456)
          }}>RUB</button> */}
          <button onClick={() => {
            setAmount('');
            setResult(0);
          }}>RESET</button>
        </div>
      </div>
    )
}

// usd - 431
// eur - 451
// rub - 456

export default Converter;

