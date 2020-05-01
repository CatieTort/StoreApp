import React, { useState, useEffect } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Form(props) {
    const [input, setInput] = useState("")
    const [valid, validateDone] = useState(false);


    useEffect(() => {
        if(valid === true) {
            props.getMax(input)
            validateDone(false)
        }
    }, [valid])

    const clearErrors = () => {
         props.setError(false);
         props.setErrorMsg('')
    }

    const handleClear = () => {
        props.clearResults()
        setInput('')
        if(props.hasError == true) clearErrors()
    }

    const validateInput = () => {
    
        if (input === "") {
            props.setError(true);
            props.setErrorMsg("Please enter an Item name");
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