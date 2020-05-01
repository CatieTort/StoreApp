import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { validateInput } from './Utils/Validate';
import { createNewItem } from "./Utils/FetchData"


function CreateItem(props) {

    const [newItemName, setNewItemName] = useState("");
    const [newItemPrice, setNewItemPrice] = useState("");
    const [createSuccess, setCreateSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    let history = useHistory();

    useEffect(() => {
        if (createSuccess === true) {
            routeOnSuccess()
        }
    }, [createSuccess])

    const handleCreateItem = (e) => {
        e.preventDefault()
        let validName = validateInput(props, newItemName, "Name");
        let validPrice = validateInput(props, parseInt(newItemPrice), "Price");
        if (validName && validPrice) {
            let newItem = { name: validName, price: validPrice };
            let status = createNewItem(newItem);
            status.then(value => {
                if(value.status === 200)
                setNewItemName("");
                setNewItemPrice("");
                setSuccessMsg(`${validName} has been created`);
                setCreateSuccess(true);
            })
        }
    }

    const routeOnSuccess = () => {
        setTimeout(() => history.push("/"), 1000);
    }


    return (
        <>
            <h2>Create New Item</h2>
            <div className="form__success">{successMsg}</div>
            <div className="form__error-msg">{props.errMsg}</div>
            <div className="form__container">
                <label htmlFor="name">Item Name</label>
                <input className="form__input" type="text" name="name" onChange={e => setNewItemName(e.target.value)} />

                <label htmlFor="price">Price</label>
                <input className="form__input" type="text" name="price" onChange={e => setNewItemPrice(e.target.value)} />

                <button className="form__btn" type="button" onClick={e => handleCreateItem(e)}>Create Item</button>
            </div>
        </>
        )
}

export default CreateItem