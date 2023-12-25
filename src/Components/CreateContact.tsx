import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from './ContactSlice.tsx';
import axiosApi from '../axiosApi.ts';
import { useNavigate } from 'react-router-dom';

export const AddContact = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [photo, setPhoto] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axiosApi.post('/contacts.json', {
                name,
                phone,
                email,
                photo,
            });
            const id = response.data.name;
            dispatch(addContact({ id, name, phone, email, photo }));

            setName('');
            setPhone('');
            setEmail('');
            setPhoto('');

            navigate('/');
        } catch (error) {
            console.error('Error adding contact:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                Phone:
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </label>
            <label>
                Email:
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                Photo:
                <input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} />
            </label>
            <button type="submit">Add Contact</button>
        </form>
    );
};
