import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [leaving, setLeaving] = useState(new Date());
  const [status, setStatus] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    leaving: '',
    status: '',
    phone: '',
    email: ''
  });

  const { id } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          const { firstName, lastName, leaving, status, phone, email } = response.data;
          setFirstName(firstName);
          setLastName(lastName);
          setLeaving(new Date(leaving));
          setStatus(status);
          setPhone(phone);
          setEmail(email);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [id]);

  function saveOrUpdateEmployee(e) {
    e.preventDefault();
    if (validateForm()) {
      const employee = { firstName, lastName, leaving, status, phone, email };

      if (id) {
        updateEmployee(id, employee)
          .then(() => {
            navigator('/employees');
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        createEmployee(employee)
          .then(() => {
            navigator('/employees');
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (firstName.trim()) {
      errorsCopy.firstName = '';
    } else {
      errorsCopy.firstName = 'First name is required';
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = '';
    } else {
      errorsCopy.lastName = 'Last name is required';
      valid = false;
    }

    if (!leaving) {
      errorsCopy.leaving = 'Leaving date is required';
      valid = false;
    } else {
      errorsCopy.leaving = '';
    }

    if (phone.trim()) {
      errorsCopy.phone = '';
    } else {
      errorsCopy.phone = 'Phone number is required';
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = '';
    } else {
      errorsCopy.email = 'Email is required';
      valid = false;
    }

    if (status.trim()) {
      errorsCopy.status = '';
    } else {
      errorsCopy.status = 'Status is required';
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  return (
    <div className='container'>
      <br />
      <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>
          <h2 className='text-center'>{id ? 'Update Employee' : 'Add Employee'}</h2>
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-lable'>First Name</label>
                <input
                  type='text'
                  placeholder='First Name'
                  name='firstName'
                  value={firstName}
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-lable'>Last Name</label>
                <input
                  type='text'
                  placeholder='Last Name'
                  name='lastName'
                  value={lastName}
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-lable'>Leaving</label>
                <DatePicker
                  selected={leaving}
                  onChange={date => setLeaving(date)}
                  className={`form-control ${errors.leaving ? 'is-invalid' : ''}`}
                  showTimeSelect={false}
                />
                {errors.leaving && <div className='invalid-feedback'>{errors.leaving}</div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-lable'>Status</label>
                <select
                  name='status'
                  value={status}
                  className={`form-control ${errors.status ? 'is-invalid' : ''}`}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value=''>Select Status</option>
                  <option value='🟩 Approved'>Approved</option>
                  <option value='🟥 Not Approved'>Not Approved</option>
                  <option value='🟨 Pending'>Pending</option>
                </select>
                {errors.status && <div className='invalid-feedback'>{errors.status}</div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-lable'>Phone</label>
                <input
                  type='text'
                  placeholder='Phone'
                  name='phone'
                  value={phone}
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.phone && <div className='invalid-feedback'>{errors.phone}</div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-lable'>Email</label>
                <input
                  type='text'
                  placeholder='Email'
                  name='email'
                  value={email}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
              </div>

              <button className='btn btn-success' onClick={saveOrUpdateEmployee}>
                {id ? 'Update' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
