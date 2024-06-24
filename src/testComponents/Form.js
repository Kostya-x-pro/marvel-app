import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import {Container} from 'react-bootstrap';

class Form extends Component {
  state = {
    advOpen: false
  }

  // Событие которое будет срабатывать как на портале так и на форме
  handleClick = () => {
    this.setState(({advOpen}) => ({
      advOpen: !advOpen
    }))
    console.log(this.state.advOpen);
  }

  componentDidMount() {
    setTimeout(this.handleClick, 3000)
  }

    render() {
        return (
            <Container>
                <form className="w-50 border mt-5 p-3 m-auto"
                  onClick={this.handleClick}>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                        <input 
                          type="email" 
                          className="form-control" 
                          id="exampleFormControlInput1" 
                          placeholder="name@example.com"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                        <textarea
                          className="form-control" 
                          id="exampleFormControlTextarea1" 
                          rows="3"></textarea>
                    </div>

                  {/* портал который рендорит компоненент вне формы просто в body */}
                    {
                      this.state.advOpen ? 
                              <Portal>
                                <Msg/>
                              </Portal> :
                              null
                    }

            
                </form>
            </Container>
        )
    }
}

// Создание портала
const Portal = (props) => {
  const node = document.createElement('div');
  document.body.append(node);

  return ReactDOM.createPortal(props.children, node)
}

const Msg = () => {
  return (
    <div 
      style={{width: '500px',
              height: '150px',
              backgroundColor: 'red',
              position: 'absolute',
              right: '0',
              bottom: '0'}}>
        Hello
    </div>
  )
}

function MyTestForm() {
    return (
        <Form/>
    );
}

export default MyTestForm;