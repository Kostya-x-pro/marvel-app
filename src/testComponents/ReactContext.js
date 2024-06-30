import {useState, memo, Component, createContext, useContext} from 'react';
import { Container } from 'react-bootstrap';

// createContext - принимает 1 аргумент (значение по умолчанию)
const dataContext = createContext({
  mail: "name@example.com",
  text: 'some text'
})
// console.dir(dataContext);
// Provider - Компонент который предоставляет значение по умолчанию компонентам которые находятся ниже по иерархии
// Consumer - компонент который позволяет получить эти данные (он же и подписывается на изменнения в контексте)

const {Provider, Consumer} = dataContext;

const Form = memo((props) => {
  console.log('render');

    return (
        <Container>
            <form className="w-50 border mt-5 p-3 m-auto">
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label mt-3">Email address</label>
                      <InputComponent/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                    <textarea value={props.text} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
            </form>
        </Container>
    )
}) 

const InputComponent = () => {
  // Передача контекста в функциональных компоненатх
  const context = useContext(dataContext);

  return (
    <input 
      value={context.mail} 
      type="email" 
      className='form-control' 
      id="exampleFormControlInput1" 
      placeholder="name@example.com"/>
  )
}

function ReactContext() {
    const [data, setData] = useState({
        mail: "name@example.com",
        text: 'some text'
    });

    // value - то что мы передаём как контекст
    return (
        <Provider value={data} >
            <Form text={data.text}/>
            <button 
                onClick={() => setData({
                     mail: "second@example.com",
                     text: 'another text'
                })}>
                Click me
            </button>
        </Provider>
    );
}

export default ReactContext;