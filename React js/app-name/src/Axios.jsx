
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function UserAxios() {

     const [user, setuser] = useState([])

    useEffect(()=>{
        fetchdata()
    },[])

    const fetchdata = async () => {
        try {
            const res = await axios.get("https://jsonplaceholder.typicode.com/users")
            // console.log(res.data)
            setuser(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
             <div className="container">
                <table className="table table-dark table-hover">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Name</th>
                            <th scope="col">email</th>
                            <th scope="col">city</th>
                            <th scope="col">company</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            user && user.map((data, index) => {
                                // console.log(data)
                                return (
                                    <tr key={data.id}>
                                        <th scope="row">{data.id}</th>
                                        <td>{data.name}</td>
                                        <td>{data.email}</td>
                                        <td>{data.address.city}</td>
                                        <td>{data.company.name}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserAxios
