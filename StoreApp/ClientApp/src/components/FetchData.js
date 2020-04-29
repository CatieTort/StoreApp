

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
 

      

