import { Component } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import MarvelService from "../../services/MarvelService";

import "./charList.scss";

class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateCharList();
  }

  onCharListLoaded = (res) => {
    this.setState({
      charList: res.map((item) => {
        return {
          name: item.name,
          thumbnail: item.thumbnail,
          id: item.id,
        };
      }),
      loading: false,
    });
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  updateCharList = () => {
    this.marvelService
      .getAllCharacters()
      .then(this.onCharListLoaded)
      .catch(this.onError);
  };

  render() {
    const { charList, loading, error } = this.state;
    const spinner = loading ? <Spinner /> : null;
    const errorMesage = error ? <ErrorMessage /> : null;
    const content = !(loading || error) ? <View charList={charList} /> : null;

    return (
      <div className="char__list">
        {errorMesage}
        {spinner}
        {content}
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

const View = ({ charList }) => {
  return (
    <ul className="char__grid">
      {charList.map((item) => {
        const { name, thumbnail, id } = item;
        const styles = {
          objectFit:
            thumbnail ===
            "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
              ? "contain"
              : "cover",
        };

        return (
          <li key={id} className="char__item char__item_selected">
            <img src={thumbnail} alt={name} style={styles} />
            <div className="char__name">{name}</div>
          </li>
        );
      })}
    </ul>
  );
};

export default CharList;
