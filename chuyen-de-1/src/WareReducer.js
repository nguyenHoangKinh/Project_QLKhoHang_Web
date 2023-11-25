import {  createSlice } from "@reduxjs/toolkit";
 import { wareList } from "./Data";
  

 const wareSlice = createSlice({
    name: "wares",
    initialState: wareList ,
    reducers: {
        addWare: (state, action) =>{
            // console.log(action)
            state.push(action.payload)
        },
        deleteWare: (state, action) => {
            const {id} = action.payload;
            const uu = state.find(user => user.id == id);
            if(uu){
                return state.filter(f => f.id !== id);
            }
        }
    
    }
 })

 export const {addWare, deleteWare} = wareSlice.actions;
 export default wareSlice.reducer;