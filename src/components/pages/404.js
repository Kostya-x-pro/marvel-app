import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div>
      <ErrorMessage/>
      <p style={{
        textAlign: 'center', 
        fontSize: '24px', 
        fontWeight: 'bold'}}>Ошибка 404... Вы попали на несуществующую страницу</p>
      <Link 
      style={{
        display: 'block', 
        fontSize: '24px', 
        fontWeight: 'bold', 
        textAlign: 'center', 
        marginTop: '30px',
        color: '#9f0013'}} 
        to="/">Вернуться на главную</Link>
    </div>
  )
}

export default Page404;