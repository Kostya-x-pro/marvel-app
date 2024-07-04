import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import ('../pages/404')); 
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicLayout = lazy(() => import('../pages/SingleComicLayout/SingleComicLayout'));
const SingleCharacterLayout = lazy(() => import('../pages/SingleCharacterLayout/SingleCharacterLayout'));
const SinglePage = lazy(() => import('../pages/SinglePage'));
// для ленивой загруки компонент дожен экспортироваться только по умолчанию export default а так же он должен быть в самом низу после всех статических импортов
// Компоненет Suspense - отвечает за ошибки в импотртах и отображения запасного содержимого
// fallback - атрибут который будет показывать запасной компонент пока грузится динамический импорт


// ----------------------------------------
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
               <Suspense fallback={<Spinner/>}>
                <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/comics" element={<ComicsPage/>}/>
                        {/* название :comicId мы придумываем сами */}
                        <Route 
                            path="/comics/:id" 
                            element={<SinglePage 
                                        Component={SingleComicLayout}
                                        dataType='comic'  
                                    />} />
                        <Route 
                            path="/characters/:id" 
                            element={<SinglePage 
                                        Component={SingleCharacterLayout}
                                        dataType='character' 
                                    />} />
                        <Route path="*" element={<Page404/>}/>
                </Routes>
               </Suspense>
            </main>
        </div>
        </Router>
    )
}

export default App;