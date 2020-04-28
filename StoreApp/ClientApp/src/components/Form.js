import React, {useState, useEffect} from 'react';

function Form(props) {
    const [input, setInput] = useState("");
    const [valid, validateDone] = useState(false);
    const [hasError, setError] = useState(false);
    const [errMsg, setErrorMsg] = useState("");


    useEffect(() => {
        if(valid === true) {
            props.getMax(input)
            validateDone(false)
        }
    }, [valid])

    const clearErrors = () => {
            setError(false);
            setErrorMsg("")
    }

    const handleClear = () => {
        props.clearResults()
        setInput('')
        if(hasError == true) {
            clearErrors()
        }
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


    const maxPriceForm = (<><div className="form__error-msg">{errMsg}</div>
        <div className="form__container">
            <label htmlFor="name">Item Name:</label>
            <input
                className={hasError ? `form__input hasError` : `form__input`}
                type="text" name="name"
                onClick={handleClear}
                onChange={e => setInput(e.target.value)}
            />
            <button className="button form__btn" type="button" onClick={e => handleSubmit(e)}>Submit</button>
            </div></>)

    return (
        <>
        {maxPriceForm}
        </>
    )

}

export default Form