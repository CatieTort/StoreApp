

const getItemData = async () => {
        const res = await fetch('api/store');
        const data = await res.json();
        return data
   }

    const sortByMax = async () => {
        const res = await fetch(`api/store/max`);
        const data = await res.json();
        return data
    }

   const getMax = async (input) => {
       const res = await fetch(`api/store/${input}`);
        const data = await res.json();
        return data;
    }
 

      
module.exports = {
    getItemData,
    sortByMax,
    getMax
}
