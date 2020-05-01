import React, { useState } from 'react';
import { validateInput } from './Utils/Validate';
import { createNewItem } from "./Utils/FetchData"

function CreateItem(props) {

    const [newItemName, setNewItemName] = useState("");
    const [newItemPrice, setNewItemPrice] = useState("");

    const handleCreateItem = (e) => {
        e.preventDefault()
        let validName = validateInput(props, newItemName, "Name")
        let validPrice = validateInput(props, parseInt(newItemPrice), "Price")
        if (validName && validPrice) {
            let newItem = { name: validName, price: validPrice }
            createNewItem(newItem)
        }
    }


    return (
        <>
            <h2>Create New Item</h2>
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