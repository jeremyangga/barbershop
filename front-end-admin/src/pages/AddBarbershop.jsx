import { useState } from 'react';
import axios from '../config/instance';
import Swal from 'sweetalert2';
import ReactLoading from 'react-loading';

function AddBarbershop() {
    let [addForm, setAddForm] = useState({
        name: "",
        alamat: "",
        price: ""
    });
    const [file, setFile] = useState(null);
    let [loading, setLoading] = useState(false);

    async function submitHandler(e) {
        try {
            e.preventDefault();
            setLoading(true);

            const uploadImage = new FormData();
            uploadImage.append('name', addForm.name);
            uploadImage.append('alamat', addForm.alamat);
            uploadImage.append('price', addForm.price);
            uploadImage.append('file', file); // append the file to the FormData

            let { data } = await axios.post('/api/barbershop', uploadImage, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(data, '<-- upload');
            setLoading(false);
            Swal.fire({
                title: "Success Add",
                text: "Success Add Barbershop",
                icon: "success"
            }).then(function (result) {
                if (result.value) {
                    window.location = '/';
                }
            });
        } catch (error) {
            console.error("Error uploading file:", error);
            setLoading(false);
            Swal.fire({
                title: "Error",
                text: "Failed to add barbershop",
                icon: "error"
            });
        }
    }

    function handleChange(e) {
        setFile(e.target.files[0]);
    }

    if (loading) {
        return (
            <div className='container' style={{ marginTop: '100px' }}>
                <div style={{ marginLeft: '45%' }}>
                    <ReactLoading type="spin" color={"#000000"} height={'20%'} width={'20%'} />
                </div>
                <h1>Loading please wait...</h1>
            </div>
        );
    }

    return (
        <>
            {
                loading ?
                    <div className='container' style={{ marginTop: '100px' }}>
                        <div style={{ marginLeft: '45%' }}>
                            <ReactLoading type="spin" color={"#000000"} height={'20%'} width={'20%'} />
                        </div>
                        <h1>Loading please wait...</h1>
                    </div>
                    :
                    <div className='container' style={{ marginTop: '100px' }}>
                        <h1>Add Barbershop</h1>
                        <div className='' style={{ marginTop: '50px' }}>
                            <br />
                            <form onSubmit={submitHandler}>
                                <div className='mb-3'>
                                    <input type='text' className='form-control' placeholder='Input nama barbershop' onChange={(e) => setAddForm({ ...addForm, name: e.target.value })} required />
                                </div>
                                <div className='mb-3'>
                                    <input type='text' className='form-control' placeholder='Input alamat' onChange={(e) => setAddForm({ ...addForm, alamat: e.target.value })} required />
                                </div>
                                <div className='mb-3'>
                                    <text>Input gambar</text>
                                    <input type='file' name='file' className='form-control' placeholder='Input gambar' onChange={handleChange} />
                                </div>
                                <div className='mb-3'>
                                    <input type='number' className='form-control' placeholder='Input harga' onChange={(e) => setAddForm({ ...addForm, price: e.target.value })} required />
                                </div>
                                <div className='mb-3'>
                                    <input type='submit' className='btn btn-success' value='Save' />
                                </div>
                            </form>
                        </div>
                    </div>
            }
        </>
    );
}

export default AddBarbershop;
