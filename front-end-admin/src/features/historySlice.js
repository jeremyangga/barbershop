import { createSlice } from '@reduxjs/toolkit';
import axios from '../config/instance';
import Swal from 'sweetalert2';

const initialState = {
    list: [],
    loading: false
}

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        setHistory: (state, action) =>{
            state.list = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const {setHistory, setLoading} = historySlice.actions;

export const fetchHistory = () => async(dispatch) => {
    try {
        dispatch(setLoading(true));
        const {data} = await axios.get('/api/allhistory');
        console.log(data, '<--history slice');
        dispatch(setHistory(data));
    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: "error"
          });
    } finally {
        dispatch(setLoading(false));
    }
}

export default historySlice.reducer