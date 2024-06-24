import {Component} from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,    // главное состояние загрузки
        error: false,
        newItemLoading: false,  // состояние загрузки новых элементоа
        offset: 210,      // базовый отступ персонажей 
        charEnded: false   // свойство которое будет опредилять что мы дошли до конца персонажей API
    }
    
    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }
    // метод для дозагрузки персонажей по аргументу "offset" 
    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
        .then(this.onCharListLoaded)
        .catch(this.onError)
    }
    // метод для установки состояния загрузки новых пользователей
    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }
    // newCharList это массив с новыми 9 персонажами
    onCharListLoaded = (newCharList) => {
        // переменная ended будет проверять данные которые приходят от API и если там меньше 9 пользователей то меняет своё состояние
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        this.setState(({charList, offset}) => ({
            charList: [...charList, ...newCharList ],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended,
        }))
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    // Массив рефов на каждый элемент который мы заполним ниже при использовании map
    itemRefs = [];

    // Метод для записи рефов в массив.
    setRef = ref => {
        this.itemRefs.push(ref)
    }

    // Удаление класса фокуса если есть и добовление одной карточке класс и фокус
    focusOnitem = (id) => {
        this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemRefs[id].classList.add('char__item_selected');
        this.itemRefs[id].focus();
    }

    // Методо для оптимизации что бы не перегружать большими конструкциями рендер
    renderItems(arr) {
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    tabIndex={0}
                    ref={this.setRef}
                    key={i} // временно поставлен индекс т.к лезут ошибки с item.id
                    onClick={() => {
                        this.props.onCharselected(item.id)
                        // Вызов метода по установке фокуса и класса активности
                        this.focusOnitem(i)
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

    render() {

        const {charList, loading, error, offset, newItemLoading, charEnded} = this.state;
        
        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{display: charEnded ? 'none' : 'block'}}  // стили что бы спрятать кнопку когда загружены последние персонажи
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

// Валидация пропсов с помощью компонента propTypes (устанавливается как зависимость)
CharList.propTypes = {
    onCharselected: PropTypes.func
}

export default CharList;