import React, { useState, useEffect } from 'react';
import { validateName } from './Utils/Validate';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Form(props) {
    const [input, setInput] = useState("")

    useEffect(() => {
        if (props.err && input === "") {
            props.clearErrors()
        }
    }, [input])
    

    const handleClear = () => {
        props.clearResults()
        setInput("")
        if(props.err == true) props.clearErrors()
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        let validName = validateName(props, input)
        if (validName !== false) {
            props.handleGetMax(validName);
        }
    }


    const maxPriceForm = (<><div className="form__error-msg">{props.errMsg}</div>
        <form onSubmit={e => handleSubmit(e)} className="form__container">
            <label htmlFor="name">Item Name:</label>
            <input
                className={props.errType === "Name" || props.errType === "both"  ? `form__input hasError` : `form__input`}
                type="text" name="name"
                value={input}
                onClick={() => handleClear()}
                onChange={e => setInput(e.target.value)}
            />
            <button className={props.err ? "form__btn search hasError" : "form__btn search"} type="submit"><FontAwesomeIcon icon={faSearch} /></button>
            </form></>)

    return (
        <>
        {maxPriceForm}
        </>
    )

}

export default Form