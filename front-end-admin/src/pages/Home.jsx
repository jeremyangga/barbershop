import TableBarbershop from "../components/TableBarbershop";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBarbershop } from "../features/barbershopSlice";

function Home(){
   const barbershops = useSelector(state => state.barbershops.list);
   const loading = useSelector(state => state.barbershops.loading);

   const dispatch = useDispatch();

   useEffect(()=>{
    dispatch(fetchBarbershop());
   }, [])
    return(
        <>
        {/* <Navbar/> */}
        <div className="container" style={{marginTop: '100px'}}>
            <h1>List Barbershop</h1>
            <div className="container">
             <table className="table table-bordered">
                <thead>
                    <tr>
                        {/* <th scope="col">ID</th> */}
                        <th scope="col">Nama</th>
                        <th scope="col">Alamat</th>
                        <th scope="col">Gambar</th>
                        <th scope="col">Antrian</th>
                    </tr>
                </thead>  
                <tbody>
                    {
                        barbershops.map(barbershop =>{
                            return <TableBarbershop key={barbershop._id} barbershop={barbershop}/>
                        })
                    }
                </tbody> 
             </table>   
            </div>
        </div>
        </>
    )
}   

export default Home;