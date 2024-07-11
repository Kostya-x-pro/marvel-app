import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const {request, clearError, process, setProcess} = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=8dc87586c41220020ff212b5e2226108";
  const _baseOffset = 210;
  
  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  }
  
  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  }

  const getCharacterByName = async (name) => {
		const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
		return res.data.results.map(_transformCharacter);
	};
    
  const _transformCharacter = (char) => {
    return {
      name: char.name,
      description: char.description ? `${char.description.slice(0, 200)}...` : 'Нет описания для этого персонажа...',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homePage: char.urls[0].url,
      wiki: char.urls[1].url,
      id: char.id,
      comics: char.comics.items
    }
  }

  const getAllComics = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformComic);
  }

  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComic(res.data.results[0]);
  }

  const _transformComic = (comic) => {
    return {
      title: comic.title,
      id: comic.id,
      description: comic.description || "Описание отсутствует",
      thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
      language: comic.textObjects[0]?.language || "en-us",
      pageCount: comic.pageCount ? 
                `${comic.pageCount} pages` : 
                'Колличество страниц не известно',
      price: comic.prices[0].price ? 
                `${comic.prices[0].price} $` :
                 'Неизвестно',
    }
  }

  return {
          process,
          setProcess, 
          getAllCharacters, 
          getCharacter, 
          clearError, 
          getAllComics, 
          getComic, 
          getCharacterByName
        }
}

export default useMarvelService;