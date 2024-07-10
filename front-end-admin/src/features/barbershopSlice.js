import { createSlice } from '@reduxjs/toolkit';
import axios from '../config/instance';
import Swal from 'sweetalert2';

const initialState = {
    list: [],
    loading: false
}

export const barbershopSlice = createSlice({
    name: 'barbershop',
    initialState,
    reducers: {
        setBarbershop: (state, action) =>{
            state.list = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const {setBarbershop, setLoading} = barbershopSlice.actions;

export const fetchBarbershop = () => async(dispatch) => {
    try {
        dispatch(setLoading(true));
        const {data} = await axios.get('/api/barbershop');
        console.log(data, '<--barbershop');
        dispatch(setBarbershop(data));
    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: "error"
          });
    } finally {
        dispatch(setLoading(false));
    }
}

export default barbershopSlice.reducer