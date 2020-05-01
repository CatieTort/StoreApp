import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import ConfirmDelete from './ConfirmDelete';
import { validateInput } from './Utils/Validate';
import { getItemData, sortByMax, updateItem, removeItem } from './Utils/FetchData';
import { faSync, faEdit, faCheck, faTimes, faEllipsisV, faChevronLeft, faChevronDown, faSort, faSortUp, faSortDown} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function StoreItems(props) {

    //edit item;
    //remove & edit hover effects
   
    const [items, setItems] = useState([]);
    const [showModal, setViewModal] = useState(false);
    const [loading, setLoading] = useState(true)
    const [editItem, setEditItem] = useState('');
    const [deleteItem, setItemToDelete] = useState('');
    const [rowDropdown, setRowDropdown] = useState('');
    const [maxDropdownOpen, openMaxDropdown] = useState(false);
    const [sortPriceClick, setSortPriceClick] = useState(0);
    const [sortNameClick, setSortNameClick] = useState(0);
    const [editItemName, setEditItemName] = useState('');
    const [editItemPrice, setEditItemPrice] = useState('');

    const setLoader = (bool) => {
        bool === false ? setTimeout(() => setLoading(false), 1000) : setLoading(true);
    }
  

    useEffect(() => {
        if (items.length === 0) {
            refreshItems()
        }
    }, [items])

    const setSortIcon = (type) => {
        let iconType = type === "name" ? sortNameClick : sortPriceClick;

        if (iconType === 1) {
            return (<FontAwesomeIcon icon={faSortUp} style={{ padding: "0px 10px", marginBottom: "-4px" }} />)
        } else if (iconType === 2) {
            return (<FontAwesomeIcon icon={faSortDown} style={{ padding: "0px 10px", marginBottom: "2px" }} />)
        } else{
            return (<FontAwesomeIcon icon={faSort} style={{ padding: "0px 10px" }} />)
        }
    }

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

    const sortByPrice = () => {
        let itemData = [...items]
        let filteredItems
        
            if (sortPriceClick === 0) {
                filteredItems = itemData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
                setSortPriceClick(1)
            } else if (sortPriceClick === 1) {
                filteredItems = itemData.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
                setSortPriceClick(2)
            } else {
                setSortPriceClick(0)
                refreshItems()
            }

        if (sortPriceClick <= 1) setItems(filteredItems)
        
    }

    const sortByName = () => {
        let itemData = [...items]
       

        for (let i = 0; i < itemData.length; i++){
            let min = i
            for (let j = i + 1; j < itemData.length; j++){
           
                if (sortNameClick === 0) {
                    if (itemData[j].name > itemData[min].name) {
                        min = j
                        setSortNameClick(1)
                    }
                } else if (sortNameClick === 1) {
                    if (itemData[j].name < itemData[min].name) {
                        min = j
                        setSortNameClick(2)
                    }
                } else {
                    setSortNameClick(0)
                    refreshItems()
                    return
                }
            }
            if (i !== min) {
                let temp = itemData[i];
                itemData[i] = itemData[min]
                itemData[min] = temp
            }
        }
       setItems(itemData)
    }

    const handleSortMax = () => {
        setLoading(true)
        openMaxDropdown(false);
        let data = sortByMax();
        data.then(value => { setItems(value) })
        setLoader(false)
    }

    const toggleEdit = (item) => {
        setEditItem(item)
        setRowDropdown('')
    }


    const submitEdit = () => {
        let validName = validateInput(props, editItemName, "Name");
        let validPrice = validateInput(props, editItemPrice, "Price");
        if (validName && validPrice) {
           updateItem(editItem, { Name: validName, Price: validPrice })
        }
    }

    const clearEdit = () => {
        setEditItem('')
    }

    const confirmModal = showModal ? (
        <Modal>
            <ConfirmDelete deleteItem={deleteItem} showModal={setViewModal} confirmDelete={handleRemove} />
        </Modal>

    ) : null;

   
    const tableItems = items.length !== 0 && loading === false ? items.map(item => {
        return (
            <div className="items__row" key={item.id}>
                {editItem === item.id ? <input className={false ? `edit__input name hasError` : `edit__input name`} type="text" value={editItemName ? editItemName : item.name} onChange={(e) => setEditItemName(e.target.value)}  />

                    : <div className="text items__name">{item.name}</div>}
                {editItem === item.id ? <input className={false ? `edit__input price hasError` : `edit__input price`} type="text" value={editItemPrice ? editItemPrice : item.price} onChange={(e) => setEditItemPrice(e.target.value)} />
                    : <div className="text items__price">{item.price}</div>}
                {editItem === item.id ?
                    <div className="edit__btns">
                        <div className="edit__check-container"><FontAwesomeIcon icon={faCheck} onClick={() => submitEdit()} /></div>
                        <div className="edit__check-container close"><FontAwesomeIcon icon={faTimes} onClick={() => clearEdit()} /></div>
                    </div>
                    : <FontAwesomeIcon
                    onClick={() => toggleRowDropdown(item.id)}
                    className="items__row__dropdown-btn"
                    icon={faChevronLeft} />}
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
            <div className="">{props.errMsg}</div>
            <div className="items__table-container">
                {loading === false ?
                    <>
                        <div className="items__header-row">
                            <div onClick={() => sortByName()}>Item Name{setSortIcon("name")}</div>
                            <div onClick={() => sortByPrice()}>Price{setSortIcon()}</div>
                            <FontAwesomeIcon icon={faEllipsisV} onClick={() => openMaxDropdown(!maxDropdownOpen)} />
                            <div className={maxDropdownOpen ? `items__row--dropdown-container  items__row--dropdown-container--sort open` : `items__row--dropdown-container`}>
                                <div className="sort-btn" onClick={() => handleSortMax()}>Sort by Max Price</div>
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