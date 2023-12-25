import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../App/Store.ts';
import axiosApi from '../axiosApi';
import { addContact, deleteContact } from './ContactSlice.tsx';
import ContactModal from './ContactModal.tsx';
import { Contact } from './ContactSlice.tsx';

export const ContactList = () => {
    const dispatch = useDispatch();
    const contacts = useSelector((state: RootState) => state.contacts.contacts);

    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (contact: Contact) => {
        setSelectedContact(contact);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedContact(null);
        setIsModalOpen(false);
    };

    const handleDelete = async (contactId: string) => {
        try {
            await axiosApi.delete(`/contacts/${contactId}.json`);
            dispatch(deleteContact(contactId));
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axiosApi.get('/contacts.json');

                for (const key in response.data) {
                    const contact = { id: key, ...response.data[key] };
                    const existingContact = contacts.find((c) => c.id === contact.id);

                    if (!existingContact) {
                        dispatch(addContact(contact));
                    }
                }
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        };

        fetchContacts();
    }, [contacts, dispatch]);

    return (
        <div>
            {contacts.map((contact) => (
                <div key={contact.id} onClick={() => openModal(contact)}>
                    <img src={contact.photo} alt={contact.name} />
                    <h2>{contact.name}</h2>
                </div>
            ))}

            {selectedContact && (
                <ContactModal
                    isOpen={isModalOpen}
                    closeModal={closeModal}
                    contact={selectedContact}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
};
