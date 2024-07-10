export default function TableBarbershop({barbershop}){
    console.log("masuk table barbershop")
    return (
        <>
            <tr>
                <th>{barbershop.name}</th>
                <td>{barbershop.alamat}</td>
                <td><img src={barbershop.image} style={{width: '263px', height: '197px', objectFit:'fill'}} onError={event => {
                    event.target.src = "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"
                    event.onerror = null}}/></td>
                <td>{barbershop.queue}</td>
            </tr>
        </>
    )
}