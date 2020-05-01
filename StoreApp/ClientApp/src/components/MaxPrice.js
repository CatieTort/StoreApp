﻿import React, { useState } from 'react'
import { getMax }from './FetchData';
import Form from './Form';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function MaxPrice(props) {
    const [maxPrice, setMaxPrice] = useState([]);
    const [loading, setLoading] = useState(true)
    const [submit, setSubmit] = useState(false)

    let formProps = { ...props, handleGetMax, clearResults }

    const setLoader = (bool) => {
        bool === false ? setTimeout(() => setLoading(false), 1000) : setLoading(true);
    }

    const clearResults = () => {
        setMaxPrice([])
        setSubmit(false)
        setLoading(true)
    }

    const handleGetMax = (name) => {
        setSubmit(true)
        let data = getMax(name)
        data.then(value => { setMaxPrice(value) });
        setLoader(false)
    }

    return (
        <>
            <h2>Search Items</h2>
            {loading && submit ? <div className="loader__container"><FontAwesomeIcon className="rotate" icon={faSync} /></div> :
                <div className={!loading ? `result__container background` : `result__container hidden`}>
                    {maxPrice.length > 0 && !loading ?
                        maxPrice.map(item => {
                            return (<><div style={{fontWeight: 'bold'}}>Max Item Price:</div><div>{item.name}</div>
                                <div>{item.price}</div></>)
                        }) : <div className="text">Item not found</div>}
                </div>}
            <Form {...formProps}/>
         </>
        )
}

export default MaxPrice