import ReactDOM from 'react-dom';
import { Overlay } from './styles';
import PropTypes from 'prop-types'

export default function Loader({isloading}) {

  if(!isloading){
    return null;
  }

  return ReactDOM.createPortal(
    <Overlay>
      <div className="loader">

      </div>
    </Overlay>,
    document.getElementById('loader-root'),
  );
}
Loader.propTypes = {
  isloading: PropTypes.bool.isRequired
}
