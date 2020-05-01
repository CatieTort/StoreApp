import React, { useState } from 'react';
import { createNewItem } from "./FetchData"

function CreateItem(props) {

    const [newItemName, setNewItemName] = useState("");
    const [newItemPrice, setNewItemPrice] = useState("");

    const handleCreateItem = (e) => {
        e.preventDefault()
        let newItem = { name: newItemName, price: parseInt(newItemPrice) }
        createNewItem(newItem)
    }

     //if (status == 200) {
    //    setNewItemName('')
    //    setNewItemPrice('')
    //    getItemData()
    //} else {
    //    setError(true)
    //    setErrorMsg("Error creating Item")
    //}


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