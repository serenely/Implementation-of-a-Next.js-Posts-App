'use client'

import { useState } from 'react'
import Image from 'next/image'
import './login.scss'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [errors, setErrors] = useState({}) 
  const router = useRouter() 


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
  
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
  
      const data = await response.json()
  
      if (response.ok) {
        document.cookie = `token=${data.token} path=/`
        alert('Login successful!')
        router.push('/')

      } else {
        alert(data.message || 'Login failed')
      }
    } catch (error) {
      alert('Something went wrong. Please try again.')
    }
  }
  

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="logo">
          <Image src="/assets/icons/serenelyLogo.png" alt="Serenely Logo" width={250} height={150} />
        </div>

        <h2 className="title">Login</h2>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p className="error-text">{errors.username}</p>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        {errors.global && <p className="error-text global-error">{errors.global}</p>}

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  )
}
