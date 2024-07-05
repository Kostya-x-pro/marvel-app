import {useState, useEffect, useRef, useMemo} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import PropTypes from 'prop-types';

import { setContentWithNewLoadingData } from '../../utils/setContent';
import useMarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const {getAllCharacters, process, setProcess} = useMarvelService();
    
    useEffect(() => {
        onRequest(offset, true);
    }, [])
    
    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'))
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
                <CSSTransition
                    key={i} // временно поставлен индекс т.к лезут ошибки с item.id
                    timeout={500}
                    classNames={"char__item"}>
                    <li 
                        className="char__item"
                        tabIndex={0}
                        // Складваем каждый элемент в массив рефов
                        ref={(el => itemRefs.current[i] = el)}
                        onClick={() => {
                            props.onCharselected(item.id)
                            // Вызов метода по установке фокуса и класса активности
                            focusOnitem(i)
                        }}>
                            <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                            <div className="char__name">{item.name}</div>
                    </li>
                </CSSTransition>
            )
        });

        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }

    const elements = useMemo(() => {
        return setContentWithNewLoadingData(process, () => renderItems(charList), newItemLoading)
    }, [process]);
        
    return (
        <div className="char__list">
        {elements}
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