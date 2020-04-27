import React, { useState, useEffect } from 'react';
import { faSync } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function FetchData() {

    const [items, setItems] = useState([]);
    const [maxPrice, setMaxItem] = useState([]);
    const [valid, validateDone] = useState(false);
    const [loading, setLoading] = useState(true);
    const [input, setInput] = useState("");
    const [hasError, setError] = useState(false);
    const [errMsg, setErrorMsg] = useState("");
   
  

    useEffect(() => {
      
       if (items.length === 0) {
           getItemData();
       }
       if (valid == true) {
           console.log(input)
           getMax()
       }
       
   }, [items, valid])

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

    const getItemData = async () => {
        const response = await fetch('api/store');
        const data = await response.json();
        setItems(data);
        setTimeout(() => setLoading(false), 1000)
    }

    const getMax = async () => {
        const response = await fetch(`api/store/${input}`, { method: "post" })
        const data = await response.json();
        if (data.length > 0) {
            setItems(data);
        } else {
            setError(true)
            setErrorMsg("Item not found")
        }
        
        setTimeout(() => setLoading(false), 1000)
    }


       return (
            <div>
                <ul>
                   {items && items.length > 0 && loading === false ? items.map(item => {
                       return <li key={item.id}>{item.name}  {item.price}</li>
                   }) : <FontAwesomeIcon className="rotate" icon={faSync} />}
                </ul>
             
                   <div>{maxPrice && maxPrice.length > 0 && loading === false ? maxPrice.map(item => {
                           return (<p>{item.name}<span>{item.price}</span></p>) }) : null}</div>
                   <div className="form__error-msg">{errMsg}</div>
                    <div className="form__container">
                       <label htmlFor="name">Item Name:</label>
                       <input className="form__input" type="text" name="name" onClick={clearErrors} onChange={e => setInput(e.target.value)} />
                        <button className="form__btn" type="button" onClick={e => handleSubmit(e)}>Submit</button>
                    </div>
                
            </div>
        );
}

export default FetchData