import { Helmet } from "react-helmet";
//Библеотека Helmet помогает настроить метат теги тайтлы и прочее на разных страницах приложения 

import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";

const ComicsPage = () => {
  return (
    <>
      <Helmet>
        <meta
            name="description"
            content="Page with list of our comics"
          />
          <title>Comix page</title>
      </Helmet>
      <AppBanner/>
      <ComicsList/>
    </>
  )
}

export default ComicsPage;