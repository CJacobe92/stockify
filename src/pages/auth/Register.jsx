import React, { useEffect, useState } from 'react'

import RegisterForm from '../../components/forms/RegisterForm'
import FetchLoading from '../../components/spinners/FetchLoading'
import fetchRegister from '../../services/fetchRegister'
import { useNavigate } from 'react-router-dom'
import { ErrorOutlineRounded } from '@mui/icons-material'

const Register = () => {
  
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  // hooks
  const navigate = useNavigate();
  const {mutate, isLoading} = fetchRegister();

  const handleChange = (e) => {
    const {id, value} = e.target
    setFormData({...formData, [id]: value})
    setIsTyping(true)
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    const firstname = formData.firstname
    const lastname = formData.lastname
    const email = formData.email
    const password = formData.password
    const passwordConf = formData.password_confirmation


    if(firstname == '' || lastname == '' || email == '' || password == '' || passwordConf == ''){
      setError("**Please fill all required fields.")
    }else{
      mutate(formData, {
        onSuccess: () => {
          navigate('/review')
        },
        onError: (error) => {
          setError(error)
        }
      })
    }
    
  }

  useEffect(() => {
    const password = formData.password
    const passwordConf = formData.password_confirmation
    
    if(password !== passwordConf){
      setError('**Password do not match.')
    }else if(isTyping){
      setError('')
    }

  }, [formData])

  return(isLoading ? <FetchLoading /> :
    <section className='flex items-center justify-center w-full min-h-screen bg-gray-900'>
      <RegisterForm 
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={formData}
        setError={setError}
        error={error}
        isTyping={isTyping}
      />
    </section>
  )
  
}

export default Register