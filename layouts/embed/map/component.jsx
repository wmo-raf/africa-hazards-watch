import MapPage from 'layouts/map';

import ahwLogo from 'assets/logos/ahw.png';

import './styles.scss';

const MapEmbedPage = () => (
  <div className="l-embed-map-page">
    <a className="embed-logo" href="/" target="_blank">
      <img src={ahwLogo} alt="Africa Hazards Watch" />
    </a>
    <MapPage embed />
  </div>
);

export default MapEmbedPage;
