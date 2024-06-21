import { useState } from 'react'
import _ from 'lodash'
import {useNavigate} from 'react-router-dom'
import axios from '../config/axios'
import validator from 'validator'
import { useAuth } from '../context/AuthContext'

export default function Login(){

    const {dispatch} = useAuth() 

    const navigate = useNavigate()
    const [form, setForm] = useState({
        email: '',
        password: '',
        serverErrors: null,
        clientErrors: {}
    })

    const errors = {}

    const runValidations = () => {
        if(form.email.trim().length === 0){
            errors.email = 'email is required'
        } else if(!validator.isEmail(form.email)){
            errors.email = 'email should be in valid format'
        }

        if(form.password.trim().length === 0){
            errors.password = 'password is required'
        } else if(form.password.trim().length < 8 || form.password.trim().length > 128){
            errors.password = 'password should be between 8-128 characters'
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = _.pick(form, ['email', 'password'])

        runValidations()

        if(Object.keys(errors).length === 0){
        try {
            const response = await axios.post('/api/users/login', formData)
            localStorage.setItem('token', response.data.token)
            const userResponse = await axios.get('/api/users/profile', { 
                    headers : {
                        Authorization: localStorage.getItem('token')
                    }
                })
                dispatch({ type: "LOGIN", payload: { account: userResponse.data } })
            navigate('/')
        } catch(err){
            setForm({...form, serverErrors: err.response.data.errors, clientErrors: {} })
        }
    } else {
        setForm({...form, clientErrors: errors})
    }
    }


    const handleChange = (e) => {
        const {name,value} = e.target
        setForm({...form, [name]: value})
    }

    const displayErrors = () => {
        if(typeof form.serverErrors === 'string'){
            return <p>{form.serverErrors}</p>
        } else {
            return (
                <div>
                    <h3>these are the server errors</h3>
                    <ul>
                        {form.serverErrors.map((ele,i) => {
                            return <li key={i}>{ele.msg}</li>
                        })}
                    </ul>
                </div>
            )
        }
    }


    return (
        <div>
            <h3>Login here</h3>
            {form.serverErrors && displayErrors()}
            <form onSubmit={handleSubmit}>
                <label htmlFor='email'>Enter email</label><br/>
                <input type='text'
                id='email'
                value={form.email}
                name='email'
                onChange={handleChange}/>
                {form.clientErrors.email && <span>{form.clientErrors.email}</span>}<br/>

                <label htmlFor='password'>Enter password</label><br/>
                <input type='password'
                id='password'
                value={form.password}
                name='password'
                onChange={handleChange}/>
                {form.clientErrors.password && <span>{form.clientErrors.password}</span>}<br/>

                <input type='submit'/>
            </form>
        </div>
    )
    
}