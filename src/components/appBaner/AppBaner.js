import './appBanner.scss';
import avengers from '../../resources/img/Avengers.png'
import avengerLogo from '../../resources/img/Avengers_logo.png';

const AppBanner = () => {
  return (
      <div className="app__banner">
        <img src={avenger} alt="Avengers" />
        <div className="app__banner-text">
          New comics every week!
          <br/>
          Stay tuned!
        </div>
        <img src={avengerLogo} alt="Avengers" />
      </div>
    )
}

export default AppBanner;