import {useState, memo, Component, createContext} from 'react';
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

class InputComponent extends Component{
  // 3 способ передачи контекста в классовых компонентах (вместо того что находится за компонентом)
  static contextType = dataContext;

  render() {
    // 1 способ передачи контекста в классовых компонентах
    return (
      // Consumer принемает рендер пропс в виде колбэка
      // <Consumer>
      //   {
      //     value => {
      //       return (
      //         <input 
      //           value={value.mail} 
      //           type="email" 
      //           className='form-control' 
      //           id="exampleFormControlInput1" 
      //           placeholder="name@example.com"/>
      //       )
      //     }
      //   }
      // </Consumer>

      // 2 способ передачи контекста в классовых компонентах
      <input 
        value={this.context.mail} 
        type="email" 
        className='form-control' 
        id="exampleFormControlInput1" 
        placeholder="name@example.com"/>

    )
  }
}

// к 2 способу
// InputComponent.contextType = dataContext;


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