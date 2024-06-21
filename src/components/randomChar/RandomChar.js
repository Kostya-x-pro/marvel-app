import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
    state = {
        char: {},
        loading: true,
        error: false,
    }
   
    marvelService = new MarvelService();

    // хук где мы вызаем все свои подписки и сайд эффекты
    componentDidMount() {
        this.updateChar();
        // this.timerId = setInterval(this.updateChar, 50000)
    }

    // Хук который мы используем при отписке 
    componentWillUnmount() {
        clearInterval(this.timerId)
    }

    // Метод который устанавливает загрузку персонажей
    onCharLoaded = (char) => {
        this.setState({
            char, 
            loading: false
        })
    }
    
    // Метод который устанавливает ошибку
    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    // Метод получения случайного персонажа по id из API
    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000) // генерация случайного id в диапазоне апишки
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    render() {
        // Способ условного рендаринга компонента Ошибки или Загрузки или Контента в зависимости от условия
        const {char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(errorMessage || spinner) ? <View char={char} /> : null;
        return (
            <div className="randomchar">
               {errorMessage}
               {spinner}
               {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div 
                        className="inner"
                        onClick={this.updateChar}
                        >try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, homePage, wiki} = char;
    const styles = {
        'objectFit': (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') ? 'contain' : 'cover'
    }

    return (
        <div className="randomchar__block">
            <img 
                src={thumbnail} 
                alt={name}
                style={styles} 
                className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homePage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;