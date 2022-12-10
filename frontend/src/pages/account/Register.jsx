import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Layout from '../../components/Layout'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfrimPassword] = useState()
    const [imageUrl, setImage] = useState()
    const [fullName, setFullname] = useState()
    const [dob, setDob] = useState()
    const [telephone, setTelephone] = useState()
    const [address, setAdress] = useState()

    const submitHandler = async (e) => {
        e.preventDefault()

        dispatch({ type: 'LOADING', payload: true })

        if (password !== confirmPassword) {
            toast.error('Passwords doesn`t match!')
            return
        }

        try {
            await axios.post(
                'http://www.onlinecarrenting.somee.com/api/v1/Accounts/CreateAcountMember',
                {
                    email,
                    password,
                }
            )
            toast.success('Registration Successfull!')
            dispatch({ type: 'LOADING', payload: false })
            navigate('/login')
        } catch (error) {
            console.log(error)
            toast.error('Error, Try again!')
            dispatch({ type: 'LOADING', payload: false })
        }
    }

    useEffect(() => {
        if (localStorage.getItem('userInfo')) {
            localStorage.getItem('userInfo')
            navigate('/')
        }
    })

    return (
        <Layout>
            <div className="form-container">
                <div className="form-groups">
                    <form className="form" onSubmit={submitHandler}>
                        <h3 className="form-title">Register</h3>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                onChange={(e) => setEmail(e.target.value)}
                                className="input"
                                id="email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="input"
                                id="password"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rpassword">Retype Password</label>
                            <input
                                type="password"
                                onChange={(e) =>
                                    setConfrimPassword(e.target.value)
                                }
                                className="input"
                                id="rpassword"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <button className="rent-now">Register</button>
                        </div>
                        <div className="form-group">
                            <p>
                                You have an account?{' '}
                                <a href="/login" className="form-link">
                                    Here for Login
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Register
