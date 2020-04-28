import React, { useState } from 'react'
import Form from './Form';

function MaxPrice(props) {
    const { maxPrice } = props
    const [loading, setLoading] = useState(true)

    const setLoader = (bool) => {
        bool === false ? setTimeout(() => setLoading(false), 1000) : setLoading(true);
    }

    return (
        <>
        <div>{maxPrice && maxPrice.length > 0 && loading === false ?
            maxPrice.map(item => {
                return (<p>{item.name}<span>{item.price}</span></p>)
            }) : null}</div>
            <Form create={false} />
         </>
        )
}

export default MaxPrice