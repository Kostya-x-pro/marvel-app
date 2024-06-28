import data from './data';
import {useState, useMemo, useDeferredValue} from 'react';

function MyTestTransition() {
    const [text, setText] = useState('');
    const [posts, setPosts] = useState(data);
    // useDefferedValue - позволяет выполнить сначала все срочные render-ы а затем отложенные.
    const defferedValue = useDeferredValue(text);

    const filteredPosts = useMemo(() => {
        return posts.filter(item => item.name.toLowerCase().includes(text));
    }, [defferedValue]);

    const onValueChange = (e) => {
        setText(e.target.value);
    }

    return (
        <div style={{background: 'white', textAlign: 'center'}}>
            <input value={text} type='text' onChange={onValueChange}/>

            <hr/>

            <div>
                {filteredPosts.map(post => (
                    <div key={post._id}>
                        <h4>{post.name}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyTestTransition;