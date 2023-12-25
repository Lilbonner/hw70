import React from 'react';
import Modal from 'react-modal';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

interface ContactModalProps {
    isOpen: boolean;
    closeModal: () => void;
    contact: Contact;
    onDelete: (contactId: string) => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, closeModal, contact, onDelete }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/edit/${contact.id}`);
        closeModal();
    };

    const handleDelete = () => {
        onDelete(contact.id);
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal}>
            <div>
                <img src={contact.photo} alt={contact.name} />
                <h2>{contact.name}</h2>
                <p>Phone: {contact.phone}</p>
                <p>Email: {contact.email}</p>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </Modal>
    );
};

export default ContactModal;
