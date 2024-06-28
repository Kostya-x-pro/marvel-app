import { BrowserRouter as Router, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage } from "../pages";
// BrowserRouter - (Router) - главный компонент которы оборачивает все компоненты для работы маршрутизации
// Route - маршрут по которому мы направляем наши компоненты
// Switch - оборачивает все "Route" для настройки путей (что бы указывать конретные совпадения)

// Атрибуты:
// path - путь к нашей странице "принимает строку" ("/" - корень сайта)
// exact - говорит атрибуту "path" что только полное совпадение необходимо рендарить
const App = () => {
    return (
        <Router>
            <div className="app">
            <AppHeader/>
            <main>
               <Switch>

                    <Route exact path="/">
                       <MainPage/>
                    </Route>
                    
                    <Route exact path="/comics">
                        <ComicsPage/>
                    </Route>
                    
               </Switch>
            </main>
        </div>
        </Router>
    )
}

export default App;