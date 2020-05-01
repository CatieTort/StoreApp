import React, { useState } from 'react';
import { validateInput } from './Utils/Validate';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Form(props) {
    const [input, setInput] = useState("")


    const handleClear = () => {
        console.log("clear")
        props.clearResults()
        setInput("")
        if(props.err == true) props.clearErrors()
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        let validName = validateInput(props, input, "Name")
        if (validName !== false) {
            props.handleGetMax(validName);
        }
    }


    const maxPriceForm = (<><div className="form__error-msg">{props.errMsg}</div>
        <div className="form__container">
            <label htmlFor="name">Item Name:</label>
            <input
                className={props.errType === "Name" || props.errType === "both"  ? `form__input hasError` : `form__input`}
                type="text" name="name"
                value={input}
                onClick={() => handleClear()}
                onChange={e => setInput(e.target.value)}
            />
            <button className="button form__btn" type="button" onClick={e => handleSubmit(e)}><FontAwesomeIcon icon={faSearch} /></button>
            </div></>)

    return (
        <>
        {maxPriceForm}
        </>
    )

}

export default Form