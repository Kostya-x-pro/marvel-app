import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage } from "../pages";
// изменения в v.6 версии
// BrowserRouter - (Router) - главный компонент которы оборачивает все компоненты для работы маршрутизации
// Route - маршрут по которому мы направляем наши компоненты
// Switch (не нужен) - Заменен на Routes
// Добавлен компонент Outlet - который по сути является placeHolderom для рендера других компонентов (т.е о как бы резервирует для них место)

// Атрибуты:
// path - путь к нашей странице "принимает строку" ("/" - корень сайта)
// elemet - рендорит компонент

const App = () => {
    return (
        <Router>
            <div className="app">
            <AppHeader/>
            <main>
               <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/comics" element={<ComicsPage/>}/>
               </Routes>
            </main>
        </div>
        </Router>
    )
}

export default App;