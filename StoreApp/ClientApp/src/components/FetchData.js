
    //const [items, setItems] = useState([]);
   

   
    //const [maxPrice, setMaxItem] = useState([]);

    //const [editItem, toggleEdit] = useState(false);

    

    
   
    //TODO: update & delete
    //TODO: Portal/ Modal confirm delete
    //error validation of form, ui styling
    //All styling
    


    //TODO: add error handling

   const getItemData = async () => {
        const res = await fetch('api/store');
        const data = await res.json();
        return data
    }

   const getMax = async (input) => {
        const res = await fetch(`api/store/${input}`)
        const data = await res.json();

        return data;
        //if (data.length > 0) {
        //    setMaxItem(data);
        //} else {
        //    setError(true)
        //    setErrorMsg("Item not found")
        //}
    }


   const createNewItem = async (newItem) => {
        const res = await fetch(`api/store`, {
            method: 'post',
            body: JSON.stringify(newItem),
            headers: {
                'Accept':'application/json',
                'Content-type': 'application/json'
            }
        })
        const status = await res.status;

        return status

        //if (status == 200) {
        //    setNewItemName('')
        //    setNewItemPrice('')
        //    getItemData()
        //} else {
        //    setError(true)
        //    setErrorMsg("Error creating Item")
        //}
    }

    const updateItem = async (id, itemChanged) => {
        const res = await fetch(`api/store/${id}`, {
            method: 'put',
            body: JSON.stringify(itemChanged),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })
        const status = await res.status;
    }

   const removeItem = async(id) => {
        const res = await fetch(`api/store${id}`, { method: 'delete' })
        const status = await res.status;
        return status;
    }

      
module.exports = {
    getItemData,
    getMax,
    createNewItem,
    updateItem,
    removeItem
}
