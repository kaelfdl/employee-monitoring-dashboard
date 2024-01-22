import React, { useState, useEffect} from 'react';
import { Button, Table } from 'react-bootstrap';
import { FaArrowUp, FaArrowDown } from "react-icons/fa"; 

function EmployeeTable({client, currentUser, createEmployeeToggle, setCreateEmployeeToggle, serverMessage}) {
    const [employeeData, setEmployeeData] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [sortUsername, setSortUsername] = useState("username"); 
    const [sortOrder, setSortOrder] = useState("asc"); 
    const [sortMsg, setSortMsg] = useState(""); 


    useEffect(() => {
        client.get('/employees/')
        .then(response => {
            setEmployeeData(response.data);
        })
        .catch(error => {
            console.log(error);
            setEmployeeData([]);
        });
    }, [serverMessage]);

    function handleAddEmployee(){
        createEmployeeToggle ? setCreateEmployeeToggle(false) : setCreateEmployeeToggle(true)
    }

    function sortFunction(f) { 
        if (f === "username") { 
            if (sortUsername === "username") { 
                setSortOrder(sortOrder === "asc" ? "desc" : "asc"); 
                setSortMsg( 
                    `Table is Sorted in ${sortOrder ===  
                        "asc" ? "Ascending" : "Descending"
                    } Order` 
                ); 
            } else { 
                setSortUsername("username"); 
                setSortOrder("asc"); 
                setSortMsg(`Table is Sorted in Descending Order`); 
            } 
        } else { 
            setSortMsg("Sorting is disabled for this column"); 
        } 
        const sorted = [...employeeData].sort((a, b) => { 
            const multi = sortOrder === "asc" ? 1 : -1; 
            return multi * (a["username"] - b["username"]); 
        }); 
        console.log(sorted);
        setEmployeeData(sorted); 
    }; 

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Id</th>
                    <th onClick={() => sortFunction("username")}> 
                            Username{" "} 
                            {sortUsername === "username" && 
                                (sortOrder === "asc" ?  
                                    <FaArrowUp /> : <FaArrowDown />)}</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Online</th>
                    
                    {/* <th>Username</th> */}
                    </tr>
                </thead>
                <tbody>
                    {employeeData.map((data) => {
                        return (
                            <tr>
                                <td key={data.id}>{data.id}</td>
                                <td key={data.username}>{data.username}</td>
                                <td key={data.first_name}>{data.first_name}</td>
                                <td key={data.last_name}>{data.last_name}</td>
                                <td key={data.is_online} class={data.is_online ? 'table-success' : 'table-danger'}>{data.is_online ? "Online" : "Offline"}</td>
                            </tr>
                        )
                    })}
                 </tbody>
            </Table>
         </div>
    );
}

export default EmployeeTable;