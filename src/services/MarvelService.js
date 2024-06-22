class MarvelService {
  // базовые строкчи для запроса в API
  _apiBase = "https://gateway.marvel.com:443/v1/public/characters";
  _apiKey = "apikey=8dc87586c41220020ff212b5e2226108";
  _baseOffset = 210;
  
  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(res.status);
    }

    return await res.json();
  };
  // Метод получения всех персонажей
  getAllCharacters = async (offset = this._baseOffset) => {
    // res - объект который приходит от API
    const res = await this.getResource(`${this._apiBase}?limit=9&offset=${offset}&${this._apiKey}`);
    // в методе map мы запускаем callBack и в this._transformCharacter в аргументы поподает char
    return res.data.results.map(this._transformCharacter)
  }
  
  // Метод получения одного персонажа
  getCharacter = async (id) => {
    // res - объект который приходит от API
    const res = await this.getResource(`${this._apiBase}/${id}?${this._apiKey}`);
    return this._transformCharacter(res.data.results[0]);
  }
  
  // Метод трансформации данных которые мы получаем в API
  _transformCharacter = (char) => {
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
}

export default MarvelService;