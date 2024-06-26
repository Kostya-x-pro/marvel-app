import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import MarvelService from '../../services/MarvelService';

import './charInfo.scss';

const CharInfo = (props) => {
    const [char, setChar] = useState(null); // потому что {} в логич контексте true
    const [loading, setloading] = useState(false); // потому что компонент начинает грузиться только по клику на пользователя
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId])

    const updateChar = () => {
        const {charId} = props;
        // если нет id то прекратить обновление
        if (!charId) {
            return
        }

        onCharLoading();

        marvelService.getCharacter(charId)
            .then(onCharLoaded)
            .catch(onError)
    }

    const onCharLoaded = (char) => {
        setChar(char);
        setloading(false);
    }

    const onCharLoading = () => setloading(true);

    const onError = () => {
        setloading(false);
        setError(true);
    }

        const skeleton = char || loading || error ? null : <Skeleton/>
        const errorMesage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char} /> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMesage}
                {spinner}
                {content}
            </div>
        )
}

const View = ({char}) => {
    const {name, description, thumbnail, homePage, wiki, comics} = char
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle.objectFit = 'contain';
    }

    return (
        <>
            <div className="char__basics">
                <img 
                    src={thumbnail} 
                    alt={name}
                    style={imgStyle}
                    />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homePage} className="button button__main">
                            <div className="inner">HOMEPAGE</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
             {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length === 0 ? 'Комиксы отсутствуют...' : null}
                {
                    comics.map((item, i) => {
                            if (i > 9) return
                        return (
                            <li key={i} className="char__comics-item">
                            {item.name}
                            </li>
                        )
                    })
                }         
            </ul>
        </>
    )
}

// Валидация пропсов с помощью компонента propTypes (устанавливается как зависимость)
CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;