import Navbar from "../components/Navbar";
import TableBarbershop from "../components/TableBarbershop";

function Home(){
    const barbershop = useSelector(state =>{
        return state.barbershop.list
    })
    const loading = useSelector(state =>{
        return state.barbershop.loading
    })
    const dispatch = useDispatch();

    useEffect(()=>{ 
        dispatch(fetchBarbershop());
    }, []);

    if(loading){
        return( 
        <>
            <iframe src={loadingGif} width="480" height="480" allowFullScreen></iframe>
            <h1>Loading...</h1>
        </>
        )
    }
    return(
        <>
        <Navbar/>
        <div className="container" style={{marginTop: '100px'}}>
            <h1>List Barbershop</h1>
            <div className="container">
             <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Thumbnail</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>  
                <tbody>
                    {
                         barbershop.map(barbershop =>{
                            return <TableBarbershop barbershop={barbershop}/>
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