import React, { useState, useEffect } from 'react'
import { getItemData, updateItem, removeItem } from './FetchData';
import { faEdit, faSync, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function StoreItems(props) {

    const [editItem, setEditItem] = useState("")
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true)

    const setLoader = (bool) => {
        bool === false ? setTimeout(() => setLoading(false), 1000) : setLoading(true);
    }

    //edit item & remove item buttons/ actions
    //filter table to view all, sort High > low, Low < high or specific price range in UI

    useEffect(() => {
        if (items.length === 0) {
            let data = getItemData()
            data.then(value => { setItems(value)});
            setLoader(false)
        }
    }, [items])
  

    const toggleEdit = (e) => {
        console.log(e.target)
    }

    console.log(items, loading)
    return (
        <>
        <div className="items__table-container">
            {items.length > 0 && loading === false ? items.map(item => {
                return ( 
                  <div className="item__row" key={item.id}>
                       <div >{item.name}</div>
                       <div>{item.price}</div>
                   
                    <div className="item__row--btn-container">
                            <button className="item__row--btn-edit" type="button" onClick={e => toggleEdit()}>
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button className="item__row--btn-delete" type="button" onClick={(e, item) => removeItem(e, item)}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                    </div>
                  </div>)
            }) : <FontAwesomeIcon className="rotate" icon={faSync} />}
            </div>
            </>
        )
}

export default StoreItems