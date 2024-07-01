import { Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from '../config/instance';

export default function TableBarbershop({c}){

    async function handleDelete(e){
        e.preventDefault(); 
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
          });
          swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
          }).then(async (result) => {
            if (result.isConfirmed) {
                // console.log(e.target.value, '-<< delete id');
                let id = e.target.value;
                console.log(id);
                await axios.delete(`/${id}`,{headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }});
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              }).then(function(result){
                if(result.value){
                    window.location = '/my-videos';
                }
              });
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
              });
            }
          });
    }

    async function handleEdit(e){
        e.preventDefault();
        let id = e.target.value;
        console.log(id, '---> handle edit id');
        const inputValue = barbershop.title;
        const { value: nameBarbershop } = await Swal.fire({
            title: "Enter your new Barbershop name",
            input: "text",
            inputLabel: "Your New Barbershop name",
            inputValue,
            showCancelButton: true,
            inputValidator: (value) => {
              if (!value) {
                return "You need to write something!";
              }
            }
          });
          if (nameBarbershop) {
            let {data} = await axios.put(`/${id}`, 
            {
                title: nameBarbershop
            },
            {
                headers: {
                Authorization: `Bearer ${localStorage.access_token}`},
            })
            // console.log(data, '--> edit data');
            Swal.fire(`Your New Barbershop is ${nameBarbershop}`).
            then(function(result){
                if(result.value){
                    window.location = '/';
                }
            });
          }
    }
    return (
        <>
            <tr>
                <th scope="row">{barbershop.id}</th>
                <td>{barbershop.title}</td>
                <td>{barbershop.location}</td>
                <td><img src={barbershop.thumbnailUrl} style={{width: '263px', height: '197px', objectFit:'fill'}} onError={event => {
                    event.target.src = "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"
                    event.onerror = null}}/></td>
                <td>
                    <Link to={`/${barbershop.id}`} className='btn btn-primary' style={{marginRight: '10px'}}>Detail</Link>
                </td>
            </tr>
        </>
    )
}