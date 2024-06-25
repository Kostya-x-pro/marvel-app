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
  const [amount, setAmount] = useState(''); // колличество валлюты к обмену
  const [baseCofficient, setBaseCofficient] = useState(1) // базовы коэффицент
  const [currency, setCurrency] = useState(null); // код валюты в API
  const [result, setResult] = useState(0); // результат на выходе

  useEffect(() => {
    if (currency) {
      getCurrency(currency)
    }
  }, [currency])

  // функция по установке курса
  function getCurrency(currency) {
    getData(`https://api.nbrb.by/exrates/rates/${currency}`)
      .then(data => {
        setResult(+(amount * data.Cur_OfficialRate * baseCofficient).toFixed(2))
      })
      .catch(error => console.log('Error', error))
  }

  // функция по изменению типа валюты и базвого коээфицента 
  function getResult(currencyID, cofficent) {
    setBaseCofficient(cofficent);
    setCurrency(currencyID);
  }

    return (
      <div className="couter__wrapper">
         <input 
          type="number" 
          className="currency__Input"
          placeholder="Enter you BYN currency here"
          value={amount}
          onChange={(e) => setAmount(+e.target.value)} />
        <div className="counter">{result}</div>
        <div className="controls">
          <button onClick={() => getResult(431, 1)}>USD</button>
          <button onClick={() => getResult(451, 1)}>EUR</button>
          <button onClick={() => getResult(456, 0.01)}>RUB</button>
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

