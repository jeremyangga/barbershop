
function TableHistory({history}){
    console.log(history,"<--history")
    return(<>
    <tr>
        <th>{history.invoice}</th>
        <td>{history.name}</td>
        <td>{history.price}</td>
        <td>{history.status}</td>
        <td>{history.orderBy}</td>
    </tr>
</>)
}
export default TableHistory;