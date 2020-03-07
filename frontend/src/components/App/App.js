import React from 'react';
import MyForm from '../../tests/form';
import SignIn from '../../tests/SignIn';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import  '../../styles/all.css'

function App() {
    return (
        <div className={"br-all"}>
            {/*<SignIn/>*/}
            <MyForm />
        </div>
    );
}

export default App;
