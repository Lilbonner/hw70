import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../App/Store.ts';
import axiosApi from '../axiosApi';
import { addContact } from './ContactSlice.tsx';

export const ContactList = () => {
    const dispatch = useDispatch();
    const contacts = useSelector((state: RootState) => state.contacts.contacts);

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
                <div key={contact.id}>
                    <img src={contact.photo} alt={contact.name} />
                    <h2>{contact.name}</h2>
                </div>
            ))}
        </div>
    );
};
