import React, { useState, useEffect } from 'react'
import { getItemData, sortByMax } from './FetchData';
import {  faSync } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function StoreItems(props) {

   
    const [items, setItems] = useState([]);
   
    const [loading, setLoading] = useState(true)

    const setLoader = (bool) => {
        bool === false ? setTimeout(() => setLoading(false), 1000) : setLoading(true);
    }
  

    useEffect(() => {
        if (items.length === 0) {
            let data = getItemData()
            data.then(value => { setItems(value)});
            setLoader(false)
        }
    }, [items])

    const handleSort = () => {
        setLoading(true)
        let data = sortByMax();
        data.then(value => { setItems(value) })
        setLoader(false)
    }

   
    const tableItems = items.length > 0 && loading === false ? items.map(item => {
        return (
            <div className="items__row" key={item.id}>
                <div className="text item__name">{item.name}</div>
                <div className="text item__price">{item.price}</div>
            </div>
        )
    }) : <div className="items__row"><div className="text item__name">No Items found</div></div>;


    return (
        <>
            <div className="sort__container"><button className="button sort-btn" type="button" onClick={handleSort}>Sort by Max Price</button></div>
            <div className="items__table-container">
                {loading === false ?
                    <>
                    <div className="items__header-row">
                    <div>Item Name</div>
                    <div>Price</div>
                    </div>
                    {tableItems}</>
                    : <div className="loader__container"><FontAwesomeIcon className="rotate" icon={faSync} /></div>
                }
            </div>
            </>
        )
}

export default StoreItems