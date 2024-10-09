import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import './ModalProps.css'

function ModalProps({ children, state, setState }) {
    return (
        <Modal open={state.modalState} onClose={() => setState({ modalState: false, movieKeysUpdate: null, deleteMovieTitle: null })}
            center
            classNames={{
                modal: 'customModal',
                closeButton: 'customClose'
            }}>
            {children}
        </Modal>
    )
}
export default ModalProps