import { Form } from "react-router-dom";
import './CharSearchForm.scss'

const CharSearchForm = () => {
  return (
    <div className="char__search-form">
      <form>
        <label className="char__search-label" htmlFor="charName">Or find a charactter by name:</label>
        <div className="char__search-wrapper">
          <input type="text" name="charName" placeholder="Enter name" />
          <button type="submit" className="button button__main">
            <div className="inner">find</div>
          </button>
        </div>
      </form>
    </div>
   
  )
}

export default CharSearchForm;