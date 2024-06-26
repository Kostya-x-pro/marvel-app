import {useState, useCallback, useEffect, useMemo} from 'react';
import {Container} from 'react-bootstrap';
import './useMemo-Slider.css'

// use

const countTotal = (num) => {
  console.log('counting...');
  return num + 10;
}

const Slider = (props) => {
  const [slide, setSlide] = useState(0); 
  const [autoplay, setAutoplay] = useState(false);

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

  // Мемоизация значения 
  // В useMemo нельзя помещать побочные эффеекты т.к он запускается после рендера
  const total = useMemo(() => {
    return countTotal(slide);
  }, [slide]);

  const style = useMemo(() => {
    return {
        color: slide > 4 ? 'blue' : 'black'
      }
  }, [slide]) 

  useEffect(() => {
    console.log('styles...');
  }, [style])

    return (
        <Container>
            <div className="slider w-50 m-auto">

                <Slide getSomeImages={getSomeImages}/>

                <div className="text-center mt-5">Active slide {slide} <br/> {autoplay ? 'auto' : null}</div>
                <div 
                  style={style}
                  className="text-center mt-5">total slides {total} </div>
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


function UseMemoSlider() {
  return (
    <>
      <Slider/>
    </>
  );
}

export default UseMemoSlider;
