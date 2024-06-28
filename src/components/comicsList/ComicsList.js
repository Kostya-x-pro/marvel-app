import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';

const ComicsList = () => {
    const [comicList, setComicList] = useState([]);
    const [newComicLoading, setNewComicLodaing] = useState(false);
    const [offset, setOffset] = useState(100);
    const [comicEnded, setComicEnded] = useState(false);
    
    const {error, loading, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewComicLodaing(false) : setNewComicLodaing(true);
        getAllComics(offset)
            .then(onComicLoaded)
    }

    const onComicLoaded = (newComicList) => {
        let ended = false;
        if (newComicList < 8) {
            ended = true;
        }

        setComicList([...comicList, ...newComicList]);
        setOffset(offset => offset + 8);
        setNewComicLodaing(newComicLoading => false);
        setComicEnded(comicEnded => ended);
    } 

    function renderItems(arr) {
        const items = arr.map((comic, i) => {
            const imgStyle = {objectFit: 'cover'}
            if (comic.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                imgStyle.objectFit = 'contain'
            }

            return (
                <li className="comics__item" key={i}>
                    <a href="#">
                        <img 
                            src={comic.thumbnail} 
                            alt={comic.name} 
                            className="comics__item-img"
                            style={imgStyle}
                            />
                        <div className="comics__item-name">{comic.title}</div>
                        <div className="comics__item-price">{comic.price}</div>
                    </a>
                </li>
            )
        })
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
        
    }

    const items = renderItems(comicList);
    
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newComicLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button 
            className="button button__main button__long"
            onClick={() => onRequest(offset)}
            disabled={newComicLoading}
            style={{display: comicEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;