import {useState, } from 'react';
import Form from './Context/Form'
import dataContext from './Context/context'

const {Provider} = dataContext;

function ReactContext() {
    const [data, setData] = useState({
        mail: "name@example.com",
        text: 'some text',
        forceChangeMail: forceChangeMail
    });

    // Модификация контекста (принудительная)
    function forceChangeMail() {
      setData({...data, mail: 'test@gmail.com'})
    }

    
    // Нельзя оставлять Provider без value т.к тогда value будте undefined (лучше удалить Provider тогда будет подставленно значение по умолчанию)
    // value - то что мы передаём как контекст
    return (
        <Provider value={data} >
            <Form text={data.text}/>
            <button 
                onClick={() => setData({
                     mail: "second@example.com",
                     text: 'another text',
                     forceChangeMail: forceChangeMail
                })}>
                Click me
            </button>
        </Provider>
    );
}

export default ReactContext;