import React, { useState, Fragment } from 'react'
import { getMax }from './Utils/FetchData';
import Form from './Form';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function MaxPrice(props) {
    const [maxPrice, setMaxPrice] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submit, setSubmit] = useState(false);
    const [noItems, setNoItems] = useState('');

    const setLoader = (bool) => {
        bool === false ? setTimeout(() => setLoading(false), 1000) : setLoading(true);
    }

    const clearResults = () => {
        setMaxPrice([])
        setSubmit(false)
        setLoading(true)
        setNoItems("")
    }

    const handleGetMax = (name) => {
        setSubmit(true)
        let data = getMax(name)
        data.then(value => {
            if (value.length > 0) {
                setMaxPrice(value)
            } else {
                setNoItems("Item not found")
            }
            
        });
        setLoader(false)
    }

    let formProps = { ...props, handleGetMax, clearResults }

    return (
        <>
            <h2>Search Items</h2>
            <Form {...formProps} />
            {loading && submit ? <div className="loader__container"><FontAwesomeIcon className="rotate" icon={faSync} /></div> :
                <div className={!loading ? `result__container background` : `result__container hidden`}>
                    {noItems === "" && !loading && maxPrice.length > 0 ?
                        maxPrice.map(item => {
                            return (<Fragment key={item.id}><div style={{ fontWeight: 'bold' }}>Max Item Price:</div><div>{item.name}</div>
                                <div>{item.price}</div></Fragment>)
                        }) : <div className="text">{noItems}</div>}
                </div>}
         </>
        )
}

export default MaxPrice