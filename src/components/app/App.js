import { Component } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

// переписали на класс что бы поднять состояние из CharList в CharInfo
class App extends Component {
    state = {
        selectedChar: null
    }

    onCharselected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

   render() {
    return (
        <div className="app">
            <AppHeader/>
            <main>
                <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>  
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharselected={this.onCharselected} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={this.state.selectedChar}/>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
   }
}

export default App;