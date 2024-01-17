import React, { useState, useEffect} from 'react';
import axios from 'axios';

function Test() {
    const [message, setMessage] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/employees')
        .then(response => {
            setMessage(response.data)
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    return (
        <div>
            <h1>Data</h1>
            <ul>{message.map((data) => {
                return (
                    <li key={data.id}>{data.first_name}</li>
                )
            })}</ul>
        </div>
    );
}

export default Test;