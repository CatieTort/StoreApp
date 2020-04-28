import React, {useState} from 'react'
import NavBar from './NavBar';
import Form from './Form';


const CreateItem  = (props) => {

    return (
        <>
            <NavBar />
            <h2>Create New Item</h2>
            <Form create={true} />
        </>
    )
}

export default CreateItem