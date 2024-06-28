import data from './data';
import {useState, useMemo, useTransition} from 'react';

function MyTestTransition() {
    const [text, setText] = useState('');
    const [posts, setPosts] = useState(data);
    // useTransition - позволяет выполнить сначала все срочные render-ы а затем отложенные но котролируемо.
    // isPending - позволяет отслеживать состояние перехода  (true или false)
    // startTransition - запуск перехода
    const [isPending, startTransition] = useTransition()

    const filteredPosts = useMemo(() => {
        return posts.filter(item => item.name.toLowerCase().includes(text));
    }, [text]);

    const onValueChange = (e) => {
        startTransition(() => {
          setText(e.target.value);
        })
    }

    return (
        <div style={{background: 'white', textAlign: 'center'}}>
            <input value={text} type='text' onChange={onValueChange}/>

            <hr/>

            <div>
              {
                isPending ? <h4>Loading...</h4> : 
                filteredPosts.map(post => (
                    <div key={post._id}>
                        <h4>{post.name}</h4>
                    </div>
                ))
              } 
            </div>
        </div>
    );
}


export default MyTestTransition;