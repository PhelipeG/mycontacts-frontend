import PropTypes from 'prop-types';
import { Container, Overlay, Footer } from './styles';
// eslint-disable-next-line import/no-unresolved
import Button from '../Button';
import ReactPortal from '../ReactPortal';
import useAnimatedUnMount from '../../hooks/useAnimatedUnMount';

export default function Modal({
  cancelLabel,
  confirmLabel,
  danger,
  title,
  children,
  onCancel,
  onConfirm,
  visible,
  isLoading,
}) {
  const { shouldRender, animatedElementRef } = useAnimatedUnMount(visible);

  if (!shouldRender) {
    return null;
  }
  return (
    <ReactPortal containerId="modal-root">
      <Overlay isLeaving={!visible} ref={animatedElementRef}>
        <Container danger={danger} isLeaving={!visible}>
          <h1>{title}</h1>
          <div className="modal-body">{children}</div>
          <Footer>
            <button
              type="button"
              className="cancel-button"
              onClick={onCancel}
              disabled={isLoading}
            >
              {cancelLabel}
            </button>
            <Button
              type="button"
              danger={danger}
              onClick={onConfirm}
              isLoading={isLoading}
            >
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}
Modal.propTypes = {
  title: PropTypes.string.isRequired,
  danger: PropTypes.bool,
  visible: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};
Modal.defaultProps = {
  danger: false,
  cancelLabel: 'Cancelar',
  confirmLabel: 'Confirmar',
  isLoading: false,
};
