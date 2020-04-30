import React from 'react'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ConfirmDelete = (props) => {

    return (
        <div className="modal__container">
            <FontAwesomeIcon icon={faTimes} />
            <div className="modal__message">
                Are you sure you want to remove {props.deleteItem}?
            </div>
            <div className="modal__btn--container">
                <button className="button modal__btn-pos" type="button">Yes, Delete</button>
                <button className="button modal__btn-neg" type="button">No, Cancel</button>
            </div>
        </div>
        )
}

export default ConfirmDelete