import {useState, useCallback, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import './useCallBack-Slider.css'

const Slider = (props) => {
  const [slide, setSlide] = useState(0); 
  const [autoplay, setAutoplay] = useState(false);

  // 1. Мемоизированная функция которая передаётся в пункт 2
  const getSomeImages = useCallback(() => {
    console.log('fetching');
    return [
      "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
      "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
      
    ]
  }, [slide])

  const changeSlide = (i) => {
    setSlide(slide => slide + i)
  }

  const toggleAutoplay = () => {
    setAutoplay(autoplay => !autoplay)
  }
    return (
        <Container>
            <div className="slider w-50 m-auto">

                {/* {
                  getSomeImages().map((url, i) => {
                    return (
                      <img className="d-block w-100" key={i} src={url} alt="slide" /> 
                    )
                  })
                } */}

                  {/* 3. Здесь используем компонент с мемоизированной функцией */}
                <Slide getSomeImages={getSomeImages}/>

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

// 2. Здесь функция приходит как пропс и передаём в пункт 3
const Slide = ({getSomeImages}) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(getSomeImages())
  }, [getSomeImages])

  return (
    <>
      {images.map((url, i) => <img className="d-block w-100" key={i} src={url} alt="slide" /> )}
    </>
  )
}


function UseCallBackSlider() {
  return (
    <>
      <Slider/>
    </>
  );
}

export default UseCallBackSlider;
