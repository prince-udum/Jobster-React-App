import React from 'react'
import { useState } from 'react';
import { FormRow } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUser } from '../../features/user/userSlice';

const Profile = () => {
  const {isLoading, user} = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    lastName: user?.lastName || '',
    location: user?.location || '',
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    const {name, email, lastName, location} = userData;
    if(!name || !email || !lastName || !location){
      toast.error('Please Fill Out All Fields');
      return;
    }
    dispatch(updateUser(userData))
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({...userData, [name]: value})
  }

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit} >
        <h3>Profile</h3>

        <div className="form-center">
          <FormRow name='name' type='text' value={userData.name} handleChange={handleChange} />

          <FormRow name='lastName' labelText='last name' type='text' value={userData.lastName} handleChange={handleChange} />

          <FormRow name='email' type='email' value={userData.email} handleChange={handleChange} />

          <FormRow name='location' type='text' value={userData.location} handleChange={handleChange} />

          <button className='btn btn-block' type='submit' disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default Profile