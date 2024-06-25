import {useState} from "react";
import './Converter.css';

// Функция для запроса на сервер
const getCurrensy = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`could not fetch status: ${response.status}`)
  } 
  return await response.json();
}

const Converter = (props) => {
  const initialCurs = props.currency;
  const [currency, setCurrency] = useState(initialCurs)

  // Вызов функции по установке курса 
  function changeCurrency(curId, rate) {
    getCurrensy(`https://api.nbrb.by/exrates/rates/${curId}`)
    .then(data => {
      setCurrency((initialCurs * (rate ? 
        data.Cur_OfficialRate * rate : 
        data.Cur_OfficialRate)).toFixed(2))
    })
    .catch(erorr => console.log('Error', erorr))
  }

    return (
      <div className="couter__wrapper">
         {/* <input 
        type="number" 
        className="currency__Input"
        placeholder="Enter you currency here"
        onChange={test} /> */}
        <div className="counter">{currency}</div>
        <div className="controls">
          <button onClick={() => changeCurrency(431)}>USD</button>
          <button onClick={() => changeCurrency(451)}>EUR</button>
          <button onClick={() => changeCurrency(456, 0.01)}>RUB</button>
          <button onClick={() => setCurrency(initialCurs)}>RESET</button>
        </div>
      </div>
    )
}

export default Converter;

