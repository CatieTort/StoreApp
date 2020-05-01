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
        if (newItemName === "" && newItemPrice === "" && props.err) {
            props.clearErrors()
        }
    }, [createSuccess])

    const handleClear = (type) => {
        if (props.err == true) {
            if (type === "Price" && props.errType === type) {
                setNewItemPrice('')
            } else if (type === "Name" && props.errType === type) {
                setNewItemName('')
            } else {
                setNewItemName('')
                setNewItemPrice('')
            }
            props.clearErrors()
        }
            
    }

    const handleCreateItem = (e) => {
        e.preventDefault()

        let validData = validateInput(props, newItemName, newItemPrice);

        if (validData.name && validData.price) {
            let status = createNewItem(validData);
            status.then(value => {
                if(value === 200)
                setNewItemName("");
                setNewItemPrice("");
                setSuccessMsg(`${validData.name} has been created`);
                setCreateSuccess(true);
            })
        }
    }

    const routeOnSuccess = () => {
        setTimeout(() => history.push("/"), 1500);
    }

    return (
        <div className="create-item__container">
            <h2>Create New Item</h2>
            <div className="create-item__message-container">
                {successMsg !== "" ? <div className="create-item__success">{successMsg}</div> : null}
                {props.errMsg !== ""  ? <div className="create-item__error-msg">{props.errMsg}</div> : null}
            </div>
            <form onSubmit={e => handleCreateItem(e)} className="form__container">
                <label htmlFor="name">Item Name</label>
                <input className={props.errType === "Name" || props.errType === "both" ? `form__input hasError` : `form__input`}
                    type="text" name="name"
                    value={newItemName}
                    onClick={() => handleClear("Name")}
                    onChange={e => setNewItemName(e.target.value)}
                />

                <label htmlFor="price">Price</label>
                <input className={props.errType === "Price" || props.errType === "both" ? `form__input hasError` : `form__input`}
                    type="text" name="price"
                    value={newItemPrice}
                    onClick={() => handleClear("Price")}
                    onChange={e => setNewItemPrice(e.target.value)} />

                <button type="submit" className="button form__btn">Create Item</button>
            </form>
        </div>
        )
}

export default CreateItem