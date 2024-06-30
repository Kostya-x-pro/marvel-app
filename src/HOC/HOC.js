import {useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';

// HOC - компонент высшего порядка (имя начинается с приставки with)
const withSlider = (BaseComponent, getData) => {

  // фозвращает функцию (которая делает какие то базовые вещи для компонента)
  return (props) => {
    const [slide, setSlide] = useState(0);
    const [autoplay, setAutoplay] = useState(false)

    useEffect(() => {
        // функция которую мы будем передавать как аргумент
        setSlide(getData());
    }, [])

    function changeSlide(i) {
        setSlide(slide => slide + i);
    }
      // возращает базовый компонент
    return <BaseComponent 
              {...props}
              slide={slide} 
              autoplay={autoplay} 
              changeSlide={changeSlide} 
              setAutoplay={setAutoplay} />
  }
}

const getDataFromFirstFetch = () => {return 10};
const getDataFromSecondFetch = () => {return 20};

const SliderFirst = (props) => {
  // console.log(props.name);  - пропсы которые можно передать напрямую
    return (
        <Container>
            <div className="slider w-50 m-auto">
                <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
                <div className="text-center mt-5">Active slide {props.slide}</div>
                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => props.changeSlide(-1)}>-1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => props.changeSlide(1)}>+1</button>
                </div>
            </div>
        </Container>
    )
}

const SliderSecond = (props) => {
    return (
        <Container>
            <div className="slider w-50 m-auto">
                <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
                <div className="text-center mt-5">Active slide {props.slide} <br/>{props.autoplay ? 'auto' : null} </div>
                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => props.changeSlide(-1)}>-1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => props.changeSlide(1)}>+1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => props.setAutoplay(autoplay => !props.autoplay)}>toggle autoplay</button>
                </div>
            </div>
        </Container>
    )
}

// Использование HOC
const SliderWithFirstFetch = withSlider(SliderFirst, getDataFromFirstFetch)
const SliderWithSecondFetch = withSlider(SliderSecond, getDataFromSecondFetch)

const withLogger = WrappedComponent => props => {
  useEffect(() => {
    console.log('first render!');
  }, [])

  return <WrappedComponent {...props}/>
}

// Тестовый компонент который можно подстроить под HOC
const Hello = () => {
  return (
    <h1>Hello</h1>
  )
}

const HelloWithLogger = withLogger(Hello);

function HOC() {
    return (
      // name пропсы которые можно передать напрямую
        <>
          <HelloWithLogger/>
          <SliderWithFirstFetch name="Kostya"/> 
          <SliderWithSecondFetch/>
        </>
    );
}

export default HOC;

// Композиция компонентов (функция возвращает др. функцию)
// const f = a => b => c => console.log(a + b + c);
// f(2)(3)(5)