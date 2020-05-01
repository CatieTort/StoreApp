import React, { useState, useEffect } from 'react';
import { validateInput } from './components/Utils/Validate';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Form(props) {
    const [input, setInput] = useState("")


    useEffect(() => {
        if(props.valid === true) {
            props.getMax(input)
            props.validateDone(false)
        }
    }, [props.valid])


    const handleClear = () => {
        props.clearResults()
        setInput('')
        if(props.hasError == true) props.clearErrors()
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        validateInput(props, input, "Name")
    }


    const maxPriceForm = (<><div className="form__error-msg">{props.errMsg}</div>
        <div className="form__container">
            <label htmlFor="name">Item Name:</label>
            <input
                className={props.hasError ? `form__input hasError` : `form__input`}
                type="text" name="name"
                onClick={handleClear}
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