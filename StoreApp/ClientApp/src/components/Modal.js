import React from 'react';
import { createPortal } from 'react-dom';

const MODAL = document.getElementById('modalRoot');

const Modal = ({children}) => {
    return createPortal(
            <div className="modal">{children}</div>
            , MODAL
        )
    }
    
export default Modal