import React from 'react'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ConfirmDelete = (props) => {

    return (
        <div className="modal__container">
            <FontAwesomeIcon className="modal__close" onClick={() => props.showModal(false)} icon={faTimes} />
            <div className="modal__message">
                Are you sure you want to remove {props.deleteItem.name}?
            </div>
            <div className="modal__btn--container">
                <button className="button modal__btn-pos" type="button" onClick={() => props.confirmDelete(props.deleteItem.id)}>Yes, Delete</button>
                <button className="button modal__btn-neg" type="button" onClick={() => props.showModal(false)}>No, Cancel</button>
            </div>
        </div>
        )
}

export default ConfirmDelete