import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2'


const Users = () => {
    const users = useLoaderData()
    const [loadedUsers, setLoadedUsers] = useState(users)
    console.log(users)
    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                fetch(`http://localhost:5000/users/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            const remaining = loadedUsers.filter(items => items._id !== _id)
                            console.log('remaining ', remaining)
                            setLoadedUsers(remaining)
                        }
                    })
            }
        });


    }
    return (
        <div>
            <h2>Users {loadedUsers.length} </h2>
            {
                loadedUsers.map(user => <div key={user._id}
                    className='m-4 p-4 bg-cyan-400 rounded'>
                    <h2 className='text-xl font-bold'> {user.name} </h2>
                    <p> {user.email} </p>
                    <div className='mt-4'>
                        <Link to={`/users/update/${user._id}`}>
                        <button className='btn btn-sm btn-neutral mx-2'> Update </button>
                        </Link>
                        <button onClick={() => handleDelete(user._id)} className='btn btn-sm btn-neutral'> Delete </button>
                    </div>
                </div>)
            }
        </div>
    );
};

export default Users;