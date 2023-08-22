import PropTypes from 'prop-types';
import { Overlay } from './styles';
import Spinner from '../Spinner';
import ReactPortal from '../ReactPortal';
import useAnimatedUnmount from '../../hooks/useAnimatedUnMount';

export default function Loader({ isloading }) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(isloading);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId="loader-root">
      <Overlay isLeaving={!isloading} ref={animatedElementRef}>
        <Spinner size={90} />
      </Overlay>
    </ReactPortal>

  );
}
Loader.propTypes = {
  isloading: PropTypes.bool.isRequired,
};
