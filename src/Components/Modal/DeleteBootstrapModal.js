import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { app } from '../../firebase';
import { getDatabase,remove,ref } from 'firebase/database';

function DeleteBootstrapModal(props) {
  
    const deleteFromDatabase = ()=>{
      const db = getDatabase(app);
      const dbNoteRef = ref(db, "Notes/" + props.id);
      remove(dbNoteRef);
    }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className='text-danger'>
          Delete Note
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Are you sure ?</h4>
        <p>
          This note will be deleted permanently and no longer available for anyone......
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} className="bg-success">Close</Button>
        <Button className="bg-danger" onClick={deleteFromDatabase}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteBootstrapModal;