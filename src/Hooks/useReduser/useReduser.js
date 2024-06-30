import {useState, useReducer} from 'react';
import {Container} from 'react-bootstrap';
import './useReduser.css';

// state - текущее состояние
// action - название того действия которое мы хотим совершить
const reducer = (state, action) => {
  switch (action.type) {
    case 'toggle': 
      return {autoplay: !state.autoplay}
    case 'slow': 
      return {autoplay: 300}
    case 'fast':
      return {autoplay: 700}
    case 'custom':
      return {autoplay: action.payload}
    default: 
      throw new Error();
  }
}

// Функция для ленивой загрузки
function init(initial) {
  return {autoplay: initial}
}

// useReducer - аналог useState только более продвинутый
const Slider = ({initial}) => {
    const [slide, setSlide] = useState(0);
    // const [autoplay, setAutoplay] = useState(false);

    // useReducer принимает 3 аргумента:
    // 1. функция reducer которая отвечает за модификацию состояния
    // 2. начальное состояние
    // 3. Функция для ленивой загрузки компонента

    // dispatch - функция которая устанавливает начальное состояние как и в useState
    // const [autoplay, dispatch] = useReducer(reducer, {autoplay: false}); // без 3 аргумента (ленивой загрузки)
    const [autoplay, dispatch] = useReducer(reducer, initial, init); // с 3 аргумента (ленивой загрузки)

    function changeSlide(i) {
        setSlide(slide => slide + i);
    }

    return (
        <Container>
            <div className="slider w-50 m-auto">
                <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
                <div className="text-center mt-5">Active slide {slide} <br/>{autoplay.autoplay ? 'auto' : null} </div>
                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}>-1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(1)}>+1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => dispatch({type: 'toggle'})}>toggle autoplay</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => dispatch({type: 'slow'})}>slow</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => dispatch({type: 'fast'})}>fast</button>
                        {/* Изменение значения на этапе диспэтча (payload - будет передан в reduser) */}
                    <button 
                        className="btn btn-primary me-2"
                        onClick={(e) => dispatch({type: 'custom', payload: +e.target.textContent})}>1000</button>
                </div>
            </div>
        </Container>
    )
}

function UseReduser() {
    return (
        <Slider initial={false}/>
    );
}

export default UseReduser;