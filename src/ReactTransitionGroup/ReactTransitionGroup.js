import { Transition } from 'react-transition-group';
import {useState} from 'react';
import { Container } from 'react-bootstrap';
import './ReactTransitionGroup.css';

const Modal = (props) => {

  const duration = 300;
  // Объект со стилями =>
  const defaultStyle = {
    transition: `all ${duration}ms ease-in-out`,
    opacity: 0,
    visibility: 'hidden'
  }
  // Объект который будет говорить о стилях на переходных этапах =>
  const transitionStyles = {
    entering: { opacity: 1, visibility: 'visible' },
    entered:  { opacity: 1, visibility: 'visible' },
    exiting:  { opacity: 0, visibility: 'hidden' },
    exited:  { opacity: 0, visibility: 'hidden' },
  };

    return (
      // Главный компонент для выполнения перехода (проп in дожен менять своё состояние поэтому его получаем из стейта)
      // unmountOnExit - этот пропс отвечает за то что элемент элемент не будет находиться в DOM дереве до тех пор пока мы его не вызовем с помощью клика на кнопку
      // onEnter - скрывает кнопку если окно открыто
      // onExited - показывает кнопку если окно открыто
        <Transition 
          timeout={duration} 
          in={props.show} 
          unmountOnExit
          onEnter={() => props.setShowTrigger(false)}
          onExited={() => props.setShowTrigger(true)} >
        {/* state - это встроенный функционал который контролируется библеотекой это:
        (entering, entered, exiting,exited) */}
         {state => (
            <div className="modal mt-5 d-block" style={{
          ...defaultStyle,
          ...transitionStyles[state]
        }}>
              <div className="modal-dialog">
                  <div className="modal-content">
                  <div className="modal-header">
                      <h5 className="modal-title">Typical modal window</h5>
                      <button onClick={() => props.onClose(false)} type="button" className="btn-close" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                      <p>Modal body content</p>
                  </div>
                  <div className="modal-footer">
                      <button onClick={() => props.onClose(false)} type="button" className="btn btn-secondary">Close</button>
                      <button onClick={() => props.onClose(false)} type="button" className="btn btn-primary">Save changes</button>
                  </div>
                  </div>
              </div>
            </div>
         )}
        </Transition>
    )
}

function ReactTransitionGroup() {
    const [showModal, setShowModal] = useState(false);
    const [showTrigger, setShowTrigger] = useState(true)

    return (
        <Container>
            <Modal show={showModal} onClose={setShowModal} setShowTrigger={setShowTrigger}/>
            {showTrigger ? 
              <button 
                type="button" 
                className="btn btn-warning mt-5"
                onClick={() => setShowModal(true)}>Open Modal</button> :
                null}
        </Container>
    );
}

export default ReactTransitionGroup;
