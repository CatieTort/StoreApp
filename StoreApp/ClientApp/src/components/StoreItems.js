import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import ConfirmDelete from './ConfirmDelete'
import { getItemData, sortByMax, updateItem, removeItem } from './FetchData';
import { faSync, faEdit, faCheck, faTimes, faEllipsisV, faChevronLeft, faChevronDown, faSort} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function StoreItems(props) {

      //edit item & remove item buttons/ actions
     //filter table to view all, sort High > low, Low < high or specific price range in UI;
    // delete works but on success need to refresh items.
   
    const [items, setItems] = useState([]);
    const [showModal, setViewModal] = useState(false);
    const [loading, setLoading] = useState(true)
    const [editItem, setEditItem] = useState('');
    const [deleteItem, setItemToDelete] = useState('');
    const [rowDropdown, setRowDropdown] = useState('');
    const [maxDropdownOpen, openMaxDropdown] = useState(false);
    const [sortClick, setSortClick] = useState(0);

    const setLoader = (bool) => {
        bool === false ? setTimeout(() => setLoading(false), 1000) : setLoading(true);
    }
  

    useEffect(() => {
        if (items.length === 0) {
            refreshItems()
        }
    }, [items])


    const refreshItems = () => {
        let data = getItemData()
        data.then(value => { setItems(value) });
        setLoader(false)
    }

    const toggleRowDropdown = (id) => {
        if (id == rowDropdown) setRowDropdown('')
        else setRowDropdown(id)
    }

    const setRemoveItem = (item) => {
        setRowDropdown('')
        setItemToDelete(item);
        setViewModal(true);
    }

    const handleRemove = () => {
        setViewModal(false);
        let data = removeItem(deleteItem.id)
        data.then(value => value === 200 ? refreshItems() : props.setErrMsg(`Could not remove ${deleteItem.name}`))
    }

    const sortBy = (type) => {
           
        switch (sortClick) {
            case (0 && type == "price"):
                setSortClick(1);
                setItems(items.sort((a, b) => a.price - b.price));
                break;
            case (1 && type == "price"):
                setSortClick(2);
                setItems(items.sort((a, b) => b.price - a.price));
                break;
            case (0 && type == "name"):
                setSortClick(1);
                setItems(items.sort((a, b) => a.name - b.name));
                break;
            case (1 && type == "name"):
                setSortClick(2);
                setItems(items.sort((a, b) => b.name - a.name));
                break;
            case 2:
                setSortClick(0);
                refreshItems();
                break;
            default:
               break;
        }
        
        console.log(items, type, sortClick)
    }

    const handleSort = () => {
        setLoading(true)
        openMaxDropdown(false);
        let data = sortByMax();
        data.then(value => { setItems(value) })
        setLoader(false)
    }

    const toggleEdit = (item) => {

        //DO THE EDITS!!;
        setEditItem(item.id)
    }

    const confirmModal = showModal ? (
        <Modal>
            <ConfirmDelete deleteItem={deleteItem} showModal={setViewModal} confirmDelete={handleRemove} />
        </Modal>

    ) : null;
   
    const tableItems = items.length !== 0 && loading === false ? items.map(item => {
        return (
            <div className="items__row" key={item.id}>
                <div className="text items__name">{item.name}</div>
                <div className="text items__price">{item.price}</div>
                <FontAwesomeIcon
                    onClick={() => toggleRowDropdown(item.id)}
                    className="items__row__dropdown-btn"
                    icon={faChevronLeft} />
                <div className={rowDropdown === item.id ? `items__row--dropdown-container show` : `items__row--dropdown-container`}>
                    <div className="items__row--btn__top-sec">
                    <div className="items__row--btn items__row--btn-edit" onClick={() => toggleEdit(item.id)}>
                        <FontAwesomeIcon icon={faEdit} />
                        Edit Item
                    </div>
                        <FontAwesomeIcon
                            onClick={() => toggleRowDropdown(item.id)}
                            className="items__row__dropdown-btn"
                            icon={faChevronDown} style={{paddingLeft: "5px", paddingRight: "0px"}}/>
                        </div>
                    <div className="items__row--btn items__row--btn-delete" type="button" onClick={() => setRemoveItem(item)}>
                        <FontAwesomeIcon icon={faTimes} />
                        Delete Item
                    </div>
                 </div>
            </div>
        )
    }) : <div className="items__row"><div className="text items__name">No Items found</div></div>;


    return (
        <>
            <div>{props.errMsg}</div>
            <div className="items__table-container">
                {loading === false ?
                    <>
                        <div className="items__header-row">
                            <div onClick={() => sortBy("name")}>Item Name<FontAwesomeIcon icon={faSort} style={{padding: "0px 10px"}} /></div>
                            <div onClick={() => sortBy("price")}>Price<FontAwesomeIcon icon={faSort} style={{ padding: "0px 10px" }} /></div>
                            <FontAwesomeIcon icon={faEllipsisV} onClick={() => openMaxDropdown(!maxDropdownOpen)} />
                            <div className={maxDropdownOpen ? `items__row--dropdown-container  items__row--dropdown-container--sort open` : `items__row--dropdown-container`}>
                                <div className="sort-btn" onClick={() => handleSort()}>Sort by Max Price</div>
                             </div>
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