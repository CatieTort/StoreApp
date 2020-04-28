import React, { useState, useEffect } from 'react';
import { faSync } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function FetchData() {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const [input, setInput] = useState("");
    const [maxPrice, setMaxItem] = useState([]);

    const [valid, validateDone] = useState(false);
    const [hasError, setError] = useState(false);
    const [errMsg, setErrorMsg] = useState("");

    const [newItemName, setNewItemName] = useState('');
    const [newItemPrice, setNewItemPrice] = useState('');
   
  
    //TODO: Break up into a few components
    //error validation of form, ui styling
    //All styling


    useEffect(() => {
      
       if (items.length === 0) {
           getItemData();
       }
       if (valid == true) {
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


    const handleCreateItem = (e) => {
        e.preventDefault()
        let newItem = { name: newItemName, price: parseInt(newItemPrice) }
        createNewItem(newItem)
    }

    //TODO: add error handling

    const getItemData = async () => {
        const res = await fetch('api/store');
        const data = await res.json();
        setItems(data);
        setTimeout(() => setLoading(false), 1000)
    }

    const getMax = async () => {
        validateDone(false);
        const res = await fetch(`api/store/${input}`)
        const data = await res.json();
        if (data.length > 0) {
            setMaxItem(data);
        } else {
            setError(true)
            setErrorMsg("Item not found")
        }
        
        setTimeout(() => setLoading(false), 1000)
    }


    const createNewItem = async (newItem) => {
        const res = await fetch(`api/store`, {
            method: 'post',
            body: JSON.stringify(newItem),
            headers: {
                'Accept':'application/json',
                'Content-type': 'application/json'
            }
        })
        const status = await res.status;
        if (status == 200) {
            setNewItemName('')
            setNewItemPrice('')
            getItemData()
        } else {
            setError(true)
            setErrorMsg("Error creating Item")
        }
    }

    //const updateItem = async (item.id) => {
    //    const res = await fetch(`api/store`, { method: 'put' })
    //    const status = await res.status;
    //}

    //const removeItem = async(item.id) => {
    //    const res = await fetch(`api/store`, { method: 'delete' })
    //    const status = await res.status;
    //}

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

               <h2>Create New Item</h2>
               <div className="form__container">
                   <label htmlFor="name">Item Name</label>
                   <input className="form__input" type="text" name="name" onChange={e => setNewItemName(e.target.value)} />

                   <label htmlFor="price">Price</label>
                   <input className="form__input" type="text" name="price" onChange={e => setNewItemPrice(e.target.value)} />

                   <button className="form__btn" type="button" onClick={e => handleCreateItem(e)}>Create Item</button>
               </div>
                
            </div>
        );
}

export default FetchData