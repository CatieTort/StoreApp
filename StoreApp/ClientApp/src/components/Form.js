import React, {useState, useEffect} from 'react'
import { createNewItem, getMax } from './FetchData';

function Form(props) {
    const [input, setInput] = useState("");
    const [newItemName, setNewItemName] = useState('');
    const [newItemPrice, setNewItemPrice] = useState('');
    const [valid, validateDone] = useState(false);
    const [hasError, setError] = useState(false);
    const [errMsg, setErrorMsg] = useState("");

    useEffect(() => {

    })


    const clearErrors = () => {
            setError(false);
            setErrorMsg("")
    }

    const validateInput = () => {
    
        if (input === "") {
            setError(true);
            setErrorMsg("Please enter an Item name");
        } else {
            let inputString = input.split("");
            inputString.splice(0, 1, inputString[0].toUpperCase());

            if (inputString[4] !== " ") {
                inputString.splice(4, 0, " ");
            }
            
            if (typeof parseInt(inputString[inputString.length - 1]) == "number") {
                setInput(inputString.join(""))
            } 
            validateDone(true);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        validateInput()
    }

    const handleCreateItem = (e) => {
        e.preventDefault()
        let newItem = { name: newItemName, price: parseInt(newItemPrice) }
        createNewItem(newItem)
    }

    const createForm = (<div className="form__container">
                <label htmlFor="name">Item Name</label>
                <input className="form__input" type="text" name="name" onChange={e => setNewItemName(e.target.value)} />

                <label htmlFor="price">Price</label>
                <input className="form__input" type="text" name="price" onChange={e => setNewItemPrice(e.target.value)} />

                <button className="form__btn" type="button" onClick={e => handleCreateItem(e)}>Create Item</button>
            </div>)

    const maxPriceForm = (<><div className="form__error-msg">{errMsg}</div>
        <div className="form__container">
            <label htmlFor="name">Item Name:</label>
            <input className="form__input" type="text" name="name" onClick={clearErrors} onChange={e => setInput(e.target.value)} />
            <button className="form__btn" type="button" onClick={e => handleSubmit(e)}>Submit</button>
            </div></>)

    return (
        <>
        {props.create ? createForm : maxPriceForm}
        </>
    )

}

export default Form