import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";

import decoration from '../../resources/img/vision.png';

// переписываем проект на функциональные компоненты и хуки
const App = () => {
    const [selectedChar, setChar] = useState(null)

    const onCharselected = (id) => setChar(id);
    
    // BrowserRouter - (Router) - главный компонент которы оборачивает все компоненты для работы маршрутизации
    // Route - маршрут по которому мы направляем наши компоненты
    // Switch - оборачивает все "Route" для настройки путей (что бы указывать конретные совпадения)

    // Атрибуты:
    // path - путь к нашей странице "принимает строку" ("/" - корень сайта)
    // exact - говорит атрибуту "path" что только полное совпадение необходимо рендарить

    return (
        <Router>
            <div className="app">
            <AppHeader/>
            <main>
               <Switch>

                    <Route exact path="/">
                        <ErrorBoundary>
                            <RandomChar/>
                        </ErrorBoundary>  
                        <div className="char__content">
                            <ErrorBoundary>
                                <CharList onCharselected={onCharselected} />
                            </ErrorBoundary>
                            <ErrorBoundary>
                                <CharInfo charId={selectedChar}/>
                            </ErrorBoundary>
                        </div>
                        <img className="bg-decoration" src={decoration} alt="vision"/>
                    </Route>
                    
                    <Route exact path="/comics">
                        <AppBanner/>
                        <ErrorBoundary>
                            <ComicsList/>
                        </ErrorBoundary>
                    </Route>
               </Switch>
            </main>
        </div>
        </Router>
    )
}

export default App;