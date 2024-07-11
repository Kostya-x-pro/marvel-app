import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import { setContentWithNewLoadingData } from '../../utils/setContent';

import './comicsList.scss';

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
            {setContentWithNewLoadingData(process, () => renderItems(comicList), newComicLoading)}
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