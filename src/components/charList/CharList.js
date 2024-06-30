import {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './charList.scss';

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters} = useMarvelService();
    
    useEffect(() => {
        onRequest(offset, true);
    }, [])
    
    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
    }
    // newCharList это массив с новыми 9 персонажами
    const onCharListLoaded = (newCharList) => {
        // переменная ended будет проверять данные которые приходят от API и если там меньше 9 пользователей то меняет своё состояние
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList ]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }

    // Массив рефов на каждый элемент который мы заполним ниже при использовании map
    const itemRefs = useRef([]);

    // Удаление класса фокуса если есть и добовление одной карточке класс и фокус
    const focusOnitem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    // Методо для оптимизации что бы не перегружать большими конструкциями рендер
    function renderItems(arr) {
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    tabIndex={0}
                    // Складваем каждый элемент в массив рефов
                    ref={(el => itemRefs.current[i] = el)}
                    key={i} // временно поставлен индекс т.к лезут ошибки с item.id
                    onClick={() => {
                        props.onCharselected(item.id)
                        // Вызов метода по установке фокуса и класса активности
                        focusOnitem(i)
                    }}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }
    
    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    // Динамический импорт всегда возвращает Promise
    // Динамический импорт (вариант 1) "React lazy ленивая загрузка"
    // if (loading) {
    //     import('./someFunc')
    //         .then(obj => {
    //             console.log(obj);
    //             obj.logger()
    //         })
    //         .catch()
    // }
    // Динамический импорт (вариант 2) "React lazy ленивая загрузка"
        // if (loading) {
        //     async () => {
        //         const {logger, seccondLogger} = await import('./someFunc');
        //         logger();
        //     }
        // }
    // Динамический импорт (вариант 3) "React lazy ленивая загрузка" (если export default)
    // if (loading) {
    //     import('./someFunc')
    //         .then(obj => obj.default())
    //         .catch()
    // }
        
    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{display: charEnded ? 'none' : 'block'}}  // стили что бы спрятать кнопку когда загружены последние персонажи
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

// Валидация пропсов с помощью компонента propTypes (устанавливается как зависимость)
CharList.propTypes = {
    onCharselected: PropTypes.func
}

export default CharList;