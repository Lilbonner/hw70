import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Contact {
    id: string;
    name: string;
    phone: string;
    email: string;
    photo: string;
}

interface ContactsState {
    contacts: Contact[];
}

const initialState: ContactsState = {
    contacts: [],
};

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        addContact: (state, action: PayloadAction<Contact | Contact[]>) => {
            if (Array.isArray(action.payload)) {
                state.contacts.push(...action.payload);
            } else {
                state.contacts.push(action.payload);
            }
        },
    },
});

export const { addContact } = contactsSlice.actions;

export default contactsSlice.reducer;
