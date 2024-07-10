import { useDispatch, useSelector } from "react-redux";
import axios from "../config/instance";
import { fetchHistory } from "../features/historySlice";
import { useEffect } from "react";
import TableHistory from "../components/TableHistory";
function LihatAntrian(){
   const histories = useSelector(state => state.histories.list);
   const loading = useSelector(state => state.histories.loading);

   const dispatch = useDispatch();

   useEffect(() => {
    dispatch(fetchHistory());
   }, [])
    return (<>
         <div className="container" style={{marginTop: '100px'}}>
            <h1>List Antrian</h1>
            <div className="container">
             <table className="table table-bordered">
                <thead>
                    <tr>
                        {/* <th scope="col">ID</th> */}
                        <th scope="col">Invoice</th>
                        <th scope="col">Nama Barbershop</th>
                        <th scope="col">Harga</th>
                        <th scope="col">Status</th>
                        <th scope="col">Pemesan</th>
                    </tr>
                </thead>  
                <tbody>
                    {
                        histories.map(history =>{
                            return <TableHistory key={history._id} history={history}/>
                        })
                    }
                </tbody> 
             </table>   
            </div>
         </div>
    </>)
}

export default LihatAntrian;