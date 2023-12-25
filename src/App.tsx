import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './App/Store.ts';
import {AddContact} from "./Components/CreateContact.tsx";
import './App.css'

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <header>
                    <div className='header'>
                        <h1 className='title'>Contacts</h1>
                        <button className='button'>
                            <Link to="/add">Add new contact</Link>
                        </button>
                    </div>
                </header>
                <Routes>
                    <Route path="/add" element={<AddContact />} />
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;
