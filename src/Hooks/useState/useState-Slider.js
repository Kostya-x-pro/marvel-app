import {Component, useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import './useState-Slider.css'

// Слайдер на хуках 
const Slider = (props) => {
  // в начальное состояние можно передать функцию или колбэк но не вызов функции, это приведёт к ненужным перерендерам
  const [slide, setSlide] = useState(0); 
  const [autoplay, setAutoplay] = useState(false);

  function logging() {
    console.log('Log!');
  }

  useEffect(() => {
    console.log('effect');
    document.title = `Slide: ${slide}`
    // Обработчики нужно удалять при удалении компонента!
    // window.addEventListener('click', logging);

    // // Если вовзвращаем CallBack то мы отписываемся от действий вызывающих побочные эффекты (например как здесь работа с DOM API)
    // return () => {
    //   window.removeEventListener('click', logging);
    // }
  }, [slide]);

  useEffect(() => {
    console.log('autoplay');
  }, [autoplay]);

  const changeSlide = (i) => {
    setSlide(slide => slide + i)
  }

  const toggleAutoplay = () => {
    setAutoplay(autoplay => !autoplay)
  }
    return (
        <Container>
            <div className="slider w-50 m-auto">
                <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
                <div className="text-center mt-5">Active slide {slide} <br/> 
                {autoplay ? 'auto' : null}
                </div>
                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}>-1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(1)}>+1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={toggleAutoplay}>toggle autoplay</button>
                </div>
            </div>
        </Container>
    )
}


function UseStateSlider() {
  const [slide, setSlider] = useState(true);

  return (
    <>
      <button onClick={() => setSlider(false)}>Click</button>
      {slide ? <Slider/> : null}
    </>
  );
}

export default UseStateSlider;

// // Слайдер на классах 
// class Slider extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             autoplay: false,
//             slide: 0
//         }
//     }

//     componentDidMount() {
//       document.title = `Slide: ${this.state.slide}`
//     }

//     componentDidUpdate() {
//       document.title = `Slide: ${this.state.slide}`
//     }

//     changeSlide = (i) => {
//         this.setState(({slide}) => ({
//             slide: slide + i
//         }))
//     }

//     toggleAutoplay = () => {
//         this.setState(({autoplay}) => ({
//             autoplay: !autoplay
//         }))
//     }

//     render() {
//         return (
//             <Container>
//                 <div className="slider w-50 m-auto">
//                     <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
//                     <div className="text-center mt-5">Active slide {this.state.slide} <br/> {this.state.autoplay ? 'auto' : null}</div>
//                     <div className="buttons mt-3">
//                         <button 
//                             className="btn btn-primary me-2"
//                             onClick={() => this.changeSlide(-1)}>-1</button>
//                         <button 
//                             className="btn btn-primary me-2"
//                             onClick={() => this.changeSlide(1)}>+1</button>
//                         <button 
//                             className="btn btn-primary me-2"
//                             onClick={this.toggleAutoplay}>toggle autoplay</button>
//                     </div>
//                 </div>
//             </Container>
//         )
//     }
// }