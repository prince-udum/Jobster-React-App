import React from 'react'
import { useState, useEffect } from 'react';
import { Logo, FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import {toast} from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true
}

const Register = () => {
  const [values, setValues] = useState(initialState)
  const {user, isLoading} = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({...values, [name]: value})
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    const {name, email, password, isMember} = values;
    if(!email || !password || (!isMember && !name)){
      toast.error('Please fill all fields')
      return;
    }
    if(isMember) {
      dispatch(loginUser({email: email, password: password}))
      return;
    }
    dispatch(registerUser({name, password, email}))
  }

  const toggleMember = () => {
    setValues({...values, isMember: !values.isMember})
  }

  useEffect(() => {
    if(user) {
      setTimeout(()=>{
        navigate('/')
      }, 2000)
    }
  }, [user])

  return (
    <Wrapper className='full-page'>
      <form className="form" onSubmit={handleSubmit}>
        <Logo/>
        <h3>{values.isMember ? 'login' : 'register'}</h3>

        {/* name field */}
        {
          !values.isMember && <FormRow name='name' type='type' handleChange = {handleChange} value = {values.name}/>
        }

        {/* email field */}
        <FormRow name='email' type='email' handleChange = {handleChange} value = {values.email}/>

        {/* password field */}
        <FormRow name='password' type='password' handleChange = {handleChange} value = {values.password}/>

        <button type="submit" className='btn btn-block' disabled={isLoading}>{isLoading ? 'loading...' : 'submit'}
        </button>

        <button className="btn btn-block btn-hipster" type='button' disabled={isLoading} onClick={() => dispatch(loginUser({email: 'testUser@test.com', password: 'secret'}))} >{isLoading ? 'loading...' : 'demo'}</button>

      <p>
        {values.isMember ? 'Not a member yet?' : 'Already a member?'}

        <button type='button' onClick={toggleMember} className='member-btn'>
          {values.isMember ? 'Register' : 'Login'}
        </button>
    </p>
        
      </form>
    </Wrapper>
  )
}

export default Register