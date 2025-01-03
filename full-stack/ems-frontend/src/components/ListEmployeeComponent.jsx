import React, { useEffect, useState } from 'react';
import { deleteEmployee, listEmployees } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const ListEmployeeComponent = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [theme, setTheme] = useState('black');
    const navigator = useNavigate();

    useEffect(() => {
        getAllEmployees();
    }, []);

    function getAllEmployees() {
        listEmployees()
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function addNewEmployee() {
        navigator('/add-employee');
    }

    function updateEmployee(id) {
        navigator(`/edit-employee/${id}`);
    }

    function removeEmployee(id) {
        deleteEmployee(id)
            .then((response) => {
                getAllEmployees();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function handleSearch(event) {
        setSearchTerm(event.target.value);
    }

    function toggleTheme() {
        setTheme(theme === 'black' ? 'white' : 'black');
    }

    return (
        <div className={`container-fluid ${theme === 'black' ? 'bg-dark text-white' : ''}`}>
            <h2 className={`text-center ${theme === 'black' ? 'text-white' : ''}`}>Employees Leaving System</h2>
            <div className="mb-4"></div>
            <div className="mb-2 d-flex justify-content-between align-items-center">
                <button className={`btn ${theme === 'black' ? 'btn-primary' : 'btn-secondary'}`} onClick={addNewEmployee}>
                    Add Employee
                </button>
                <div className='input-group w-25'>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='Search'
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <button type='button' className='btn btn-primary' data-mdb-ripple-init>
                        <i className='fas fa-search'></i>
                    </button>
                </div>
                <button className={`btn ${theme === 'black' ? 'btn-primary' : 'btn-secondary'}`} onClick={toggleTheme} style={{position: 'absolute', top: '10px', right: '10px'}}>
                    Toggle Theme
                </button>
            </div>
            <table className={`table table-striped table-bordered ${theme === 'black' ? 'table-dark' : ''}`}>
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee leaving</th>
                        <th>Employee Phone</th>
                        <th>Leave status</th>
                        <th>Employee Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees
                        .filter(
                            (employee) =>
                                employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                employee.lastName.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.leaving}</td>
                                <td>{employee.phone}</td>
                                <td>{employee.status}</td>
                                <td>{employee.email}</td>
                                <td>
                                    <button className={`btn ${theme === 'black' ? 'btn-success' : 'btn-outline-success'}`} onClick={() => updateEmployee(employee.id)}>
                                        Update
                                    </button>
                                    <button
                                        className={`btn ${theme === 'black' ? 'btn-warning' : 'btn-outline-warning'} ml-2`}
                                        onClick={() => removeEmployee(employee.id)}
                                        style={{ marginLeft: '10px' }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListEmployeeComponent;
