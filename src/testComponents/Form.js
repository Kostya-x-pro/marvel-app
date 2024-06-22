import React, {Component} from 'react';
import {Container} from 'react-bootstrap';

class Form extends Component {
  // Создание рефов
    // 1. Рефы по сути это ссылки на реальный компонент в DOM дереве
    // myRef = React.createRef();
    // mySecondRef = React.createRef();

    // componentDidMount() {
    //   // this.myRef.current.focus();
    // }

    // 2. Метод callBackRef-ы
      setInputRef = elem => {
        this.myRef = elem;
      }


    // Метод установки фокуса на первое поле текстового инпута при клике на текстэрию
    focusFirstTI = () => {
      // this.myRef.current.focus();
      // метод назначения рефов при методе callBackRef
     if (this.myRef) {
      this.myRef.focus();
     }
    }

    render() {
        return (
            <Container>
                <form className="w-50 border mt-5 p-3 m-auto">
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                        <input 
                          // ref={this.myRef} 
                          ref={this.setInputRef} 
                          type="email" 
                          className="form-control" 
                          id="exampleFormControlInput1" 
                          placeholder="name@example.com"/>
                        {/* <TextInput ref={this.myRef}/> */}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                        <textarea
                          onClick={this.focusFirstTI} 
                          className="form-control" 
                          id="exampleFormControlTextarea1" 
                          rows="3"></textarea>
                    </div>
                </form>
            </Container>
        )
    }
}

// реф нельзя поставить на функциональный компонент
const TextInput = () => {
  return (
    <input 
      type="email" 
      className="form-control" 
      id="exampleFormControlInput1" 
      placeholder="name@example.com"/>
  )
}

function MyTestForm() {
    return (
        <Form/>
    );
}

export default MyTestForm;