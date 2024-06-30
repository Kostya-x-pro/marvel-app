import {useState, memo, PureComponent} from 'react';
import { Container } from 'react-bootstrap';
// Функция memo это HOC. Сравнение пропсов идёт только поверхностное.
// Если мы хотим сравнивать глубоко то нужно написать свою функцию сравнения

// function propsCompare(prevProps, nextProps) {
//   return prevProps.mail.name === nextProps.mail.name && prevProps.text === nextProps.text;
// }

// const Form = memo((props) => {
//   console.log('render');

//     return (
//         <Container>
//             <form className="w-50 border mt-5 p-3 m-auto">
//                 <div className="mb-3">
//                     <label htmlFor="exampleFormControlInput1" className="form-label mt-3">Email address</label>
//                     <input value={props.mail.name} type="email" className='form-control' id="exampleFormControlInput1" placeholder="name@example.com"/>
//                     </div>
//                     <div className="mb-3">
//                     <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
//                     <textarea value={props.text} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
//                 </div>
//             </form>
//         </Container>
//     )
// }, propsCompare) // 2 аргумент мемо (Функция сравнения)

class Form extends PureComponent {
  
  // этот метод жизненного цикла занимается тем что сравнивает приходящие пропсы и если они одинаковые то не вызывает дополнительных рендеров
  // shouldComponentUpdate(nextProps, nextState){} 

  render() {
    console.log('render');

      return (
        <Container>
            <form className="w-50 border mt-5 p-3 m-auto">
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label mt-3">Email address</label>
                    <input value={this.props.mail} type="email" className='form-control' id="exampleFormControlInput1" placeholder="name@example.com"/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                    <textarea value={this.props.text} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
            </form>
        </Container>
    )
    }
} 

function ReactMemoForm() {
    const [data, setData] = useState({
        mail: "name@example.com",
        text: 'some text'
    });

    return (
        <>
            <Form mail={data.mail} text={data.text}/>
            <button 
                onClick={() => setData({
                     mail: "second@example.com",
                     text: 'another text'
                })}>
                Click me
            </button>
        </>
    );
}

export default ReactMemoForm;