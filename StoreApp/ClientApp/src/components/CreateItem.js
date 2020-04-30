import React, { useState } from 'react';
import { createNewItem } from "./FetchData"

function CreateItem() {

    const [newItemName, setNewItemName] = useState("");
    const [newItemPrice, setNewItemPrice] = useState("");

    const handleCreateItem = (e) => {
        e.preventDefault()
        let newItem = { name: newItemName, price: parseInt(newItemPrice) }
        createNewItem(newItem)
    }

    return (
        <>
            <h2>Create New Item</h2>
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