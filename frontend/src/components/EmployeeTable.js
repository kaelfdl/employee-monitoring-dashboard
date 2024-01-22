import React, { useState, useEffect} from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import { FaArrowUp, FaArrowDown, FaArrowAltCircleDown } from "react-icons/fa"; 

function EmployeeTable({client, currentUser, createEmployeeToggle, setCreateEmployeeToggle, serverMessage}) {
    const [employeeData, setEmployeeData] = useState([]);
    const [tabData, setTabData] = useState([]);
    const [sortColumn, setSortColumn] = useState("id"); 
    const [sortOrder, setSortOrder] = useState("desc"); 
    const [statusFilters, setStatusFilters] = useState(new Set([true, false]))


    useEffect(() => {
        client.get('/employees/')
        .then(response => {
            setEmployeeData(response.data);
            setTabData(response.data)
        })
        .catch(error => {
            console.log(error);
            setEmployeeData([]);
            setTabData([])
        });
    }, [serverMessage]);

    useEffect(() => {
        updateFilteredStatus();
    }, [statusFilters])

 
    function sortFunction(f, arr) { 
        setSortOrder(sortOrder === "asc" ? "desc" : "asc"); 
        
        let sorted = []
        if (f === 'id') {

        sorted = arr.sort((a, b) => { 
            return sortOrder === "asc" ? ((a.id > b.id) ? 1 : -1) : ((a.id > b.id) ? -1 : 1)
        }); 
        setSortColumn('id')
        }
        else if (f === 'username') {

        sorted = arr.sort((a, b) => { 
            return sortOrder === "asc" ? ((a.username.toLowerCase() > b.username.toLowerCase()) ? 1 : -1) : ((a.username.toLowerCase() > b.username.toLowerCase()) ? -1 : 1)
        }); 
        setSortColumn('username')
        }
        else if(f === 'firstName') {
        sorted = arr.sort((a, b) => { 
            return sortOrder === "asc" ? ((a.first_name.toLowerCase() > b.first_name.toLowerCase()) ? 1 : -1) : ((a.first_name.toLowerCase() > b.first_name.toLowerCase()) ? -1 : 1)
        }); 
        setSortColumn('firstName')
        }
        else if(f === 'lastName') {
        sorted = arr.sort((a, b) => { 
            return sortOrder === "asc" ? ((a.last_name.toLowerCase() > b.last_name.toLowerCase()) ? 1 : -1) : ((a.last_name.toLowerCase() > b.last_name.toLowerCase()) ? -1 : 1)
        }); 
        setSortColumn('lastName')
        }
        else if(f === 'status') {
        sorted = arr.sort((a, b) => { 
            return sortOrder === "asc" ? ((a.is_online > b.is_online) ? 1 : -1) : ((a.is_online > b.is_online) ? -1 : 1)
        }); 
        setSortColumn('status')
        }
        setTabData(sorted); 
    }; 
    
    function filterID(arr, query) {
        return query == "" ? setTabData(tabData) : setTabData(arr.filter((el) => el.id == query));
    }

    function filterUsername(arr, query) {
        return setTabData(arr.filter((el) => el.username.toLowerCase().includes(query.toLowerCase())));
    }
    function filterFirstName(arr, query) {
        return setTabData(arr.filter((el) => el.first_name.toLowerCase().includes(query.toLowerCase())));
    }
    function filterLastName(arr, query) {
        return setTabData(arr.filter((el) => el.last_name.toLowerCase().includes(query.toLowerCase())));
    }

function updateFilters(statusFilter, checked) {
    if (checked)
      setStatusFilters((prev) => new Set(prev).add(statusFilter));
    if (!checked)
      setStatusFilters((prev) => {
        const next = new Set(prev);
        next.delete(statusFilter);
        return next; 
     });
  }

  function updateFilteredStatus() {
    const filteredStatus = statusFilters.size === 0 ? [] : employeeData.filter((p) => statusFilters.has(p.is_online));
    setTabData(filteredStatus)
    return filteredStatus
  }

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th onClick={() => sortFunction("id", tabData)}> 
                            ID{" "} 
                            {sortColumn === "id" && 
                                (sortOrder === "asc" ?  
                                    <FaArrowUp /> : <FaArrowDown />)}
                    </th>
                    <th onClick={() => sortFunction("username", tabData)}> 
                            Username{" "} 
                            {sortColumn === "username" && 
                                (sortOrder === "asc" ?  
                                    <FaArrowUp /> : <FaArrowDown />)}
                    </th>
                    <th onClick={() => sortFunction("firstName", tabData)}> 
                            First Name{" "} 
                            {sortColumn === "firstName" && 
                                (sortOrder === "asc" ?  
                                    <FaArrowUp /> : <FaArrowDown />)}
                    </th>
                    <th onClick={() => sortFunction("lastName", tabData)}> 
                            Last Name{" "} 
                            {sortColumn === "lastName" && 
                                (sortOrder === "asc" ?  
                                    <FaArrowUp /> : <FaArrowDown />)}
                    </th>
                    <th onClick={() => sortFunction("status", tabData)}> 
                            status{" "} 
                            {sortColumn === "status" && 
                                (sortOrder === "asc" ?  
                                    <FaArrowUp /> : <FaArrowDown />)}
                    </th>
                    
                    </tr>
                </thead>
                <thead>
                <tr>
                    <th>
                        <Form.Control type="text" placeholder="Search ID" onChange={e => filterID(updateFilteredStatus(), e.target.value)}/> 
                    </th>
                    <th> 
                        <Form.Control type="text" placeholder="Search username" onChange={e => filterUsername(updateFilteredStatus(), e.target.value)}/> 
                    </th>
                    <th>
                        <Form.Control type="text" placeholder="Search first name" onChange={e => filterFirstName(updateFilteredStatus(), e.target.value)}/> 
                    </th>
                    <th>
                        <Form.Control type="text" placeholder="Search last name" onChange={e => filterLastName(updateFilteredStatus(), e.target.value)}/> 
                    </th>
                    <th>
                        <Form.Check type="checkbox" label="Online" onChange={e => updateFilters(true, e.target.checked)} defaultChecked={true}/>
                        <Form.Check type="checkbox" label="Offline" onChange={e => updateFilters(false, e.target.checked)} defaultChecked={true}/>
                    </th>
                </tr>
                </thead>
                <tbody>
                    {tabData.map((data) => {
                        return (
                            <tr key={data.id}>
                                <td>{data.id}</td>
                                <td>{data.username}</td>
                                <td>{data.first_name}</td>
                                <td>{data.last_name}</td>
                                <td className={data.is_online ? 'table-success' : 'table-danger'}>{data.is_online ? "Online" : "Offline"}</td>
                            </tr>
                        )
                    })}
                 </tbody>
            </Table>
         </div>
    );
}

export default EmployeeTable;