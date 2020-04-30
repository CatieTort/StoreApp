

   export async function getItemData() {
        const res = await fetch('api/store');
        const data = await res.json();
        return data
   }

    export async function sortByMax() {
        const res = await fetch(`api/store/max`);
        const data = await res.json();
        return data
    }

   export async function getMax(input) {
       const res = await fetch(`api/store/${input}`);
        const data = await res.json();
        return data;
    }
 

    export const createNewItem = async (newItem) => {
        const res = await fetch(`api/store`, {
            method: 'post',
            body: JSON.stringify(newItem),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })
        const status = await res.status;
        return status;
    }   
    //if (status == 200) {
    //    setNewItemName('')
    //    setNewItemPrice('')
    //    getItemData()
    //} else {
    //    setError(true)
    //    setErrorMsg("Error creating Item")
    //}


   export async function updateItem (id, itemChanged) {
       const res = await fetch(`api/store/${id}`, {
           method: 'put',
           body: JSON.stringify(itemChanged),
           headers: {
               'Accept': 'application/json',
               'Content-type': 'application/json'
           }
       });
        const status = await res.status;
        return status;
    }

    export async function removeItem (id) {
        const res = await fetch(`api/store/${id}`, { method: 'delete' });
        const status = await res.status;
        return status;
    }