import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Container, Overlay, Footer } from './styles';
// eslint-disable-next-line import/no-unresolved
import Button from '../Button';

export default function Modal({
  cancelLabel,
  confirmLabel,
  danger,
  title,
  children,
  onCancel,
  onConfirm,
}) {
  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>{title}</h1>
        <div className="modal-body">{children}</div>
        <Footer>
          <button type="button" className="cancel-button" onClick={onCancel}>
            {cancelLabel}
          </button>
          <Button type="button" danger={danger} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById('modal-root'),
  );
}
Modal.propTypes = {
  title: PropTypes.string.isRequired,
  danger: PropTypes.bool,
  children: PropTypes.node.isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
Modal.defaultProps = {
  danger: false,
  cancelLabel: 'Cancelar',
  confirmLabel: 'Confirmar',
};
