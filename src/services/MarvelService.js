class MarvelService {
  // базовые строкчи для запроса в API
  _apiBase = "https://gateway.marvel.com:443/v1/public/characters"
  _apiKey = "apikey=8dc87586c41220020ff212b5e2226108"
  
  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(res.status);
    }

    return await res.json();
  };
  // Метод получения всех персонажей
  getAllCharacters = () => {
    return this.getResource(`${this._apiBase}?limit=9&offset=210&${this._apiKey}`);
  }
  
  // Метод получения одного персонажа
  getCharacter = async (id) => {
    const res = await this.getResource(`${this._apiBase}/${id}?${this._apiKey}`);
    return this._transformCharacter(res);
  }
  
  // Метод трансформации данных которые мы получаем в API
  _transformCharacter = (res) => {
    return {
      name: res.data.results[0].name,
      description: res.data.results[0].description,
      thumbnail: res.data.results[0].thumbnail.path + '.' + res.data.results[0].thumbnail.extension,
      homePage: res.data.results[0].urls[0].url,
      wiki: res.data.results[0].urls[1].url,
    }
  }
}

export default MarvelService;
