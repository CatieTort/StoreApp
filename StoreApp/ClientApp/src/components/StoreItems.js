﻿import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import ConfirmDelete from './ConfirmDelete'
import { getItemData, sortByMax, updateItem, removeItem } from './FetchData';
import {  faSync, faEdit, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function StoreItems(props) {

      //edit item & remove item buttons/ actions
     //filter table to view all, sort High > low, Low < high or specific price range in UI;
   
    const [items, setItems] = useState([]);
    const [showModal, setViewModal] = useState(false);
    const [loading, setLoading] = useState(true)
    const [deleteItem, setItemToDelete] = useState('');

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


    const handleRemove = (item) => {
        setItemToDelete(item);
        setViewModal(true);
    }


    const handleSort = () => {
        setLoading(true)
        let data = sortByMax();
        data.then(value => { setItems(value) })
        setLoader(false)
    }


    const toggleEdit = (item) => {
        console.log(item)
    }

    const confirmModal = showModal ? (
            <Modal>
                <ConfirmDelete deleteItem={deleteItem} showModal={setViewModal} confirmDelete={removeItem} />
            </Modal>

    ) : null;
   
    const tableItems = items.length !== 0 && loading === false ? items.map(item => {
        return (
            <div className="items__row" key={item.id}>
                <div className="text items__name">{item.name}</div>
                <div className="text items__price">{item.price}</div>
                <div className="item__row--dropdown-container">
                    <button className="items__row--btn-edit" type="button" onClick={() => toggleEdit(item)}>
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="items__row--btn-delete" type="button" onClick={() => handleRemove(item)}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                 </div>
            </div>
        )
    }) : <div className="items__row"><div className="text items__name">No Items found</div></div>;


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
            {confirmModal}
            </>
        )
}

export default StoreItems