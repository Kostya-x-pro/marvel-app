import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';

const setContent = (process, Component, newItemLoading) => {
    switch(process) {
        case 'waiting':
            return <Spinner/>
            break
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>
            break
        case 'confirmed':
            return <Component/>;
            break
        case 'error':
            return <ErrorMessage/>
            break
        default: 
            throw new Error('Unexpected process state');
    }
}

const ComicsList = () => {
    const [comicList, setComicList] = useState([]);
    const [newComicLoading, setNewComicLodaing] = useState(false);
    const [offset, setOffset] = useState(100);
    const [comicEnded, setComicEnded] = useState(false);
    
    const {getAllComics, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewComicLodaing(false) : setNewComicLodaing(true);
        getAllComics(offset)
            .then(onComicLoaded)
            .then(() => setProcess('confirmed'))
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
                    <Link to={`/comics/${comic.id}`}>
                        <img 
                            src={comic.thumbnail} 
                            alt={comic.name} 
                            className="comics__item-img"
                            style={imgStyle}
                            />
                        <div className="comics__item-name">{comic.title}</div>
                        <div className="comics__item-price">{comic.price}</div>
                    </Link>
                </li>
            )
        })
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )    
    }

    return (
        <div className="comics__list">
            {setContent(process, () => renderItems(comicList), newComicLoading)}
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