class MarvelService {
  _baseId = 1016823;
  getResources = async (url) => {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(response.status)
    }
    return await response.json();
  }

  getAllCharacters = async () => {
     return await this.getResources("https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=210&apikey=8dc87586c41220020ff212b5e2226108")
  }

  getCharacter = async (id) => {
    return await this.getResources("")
  }
}

export default MarvelService;



