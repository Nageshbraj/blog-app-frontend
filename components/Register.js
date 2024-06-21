import { useState } from 'react'
import axios from '../config/axios'
import { useNavigate} from 'react-router-dom'
import validator from 'validator'

export default function Register(){

    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [serverErrors, setServerErrors] = useState(null)
    const [clientErrors, setClientErrors] = useState({})

    const errors = {}

    const runValidations = () => {
        if(username.trim().length === 0){
            errors.username = 'username is required'
        }

        if(email.trim().length === 0){
            errors.email = 'email is required'
        } else if(!validator.isEmail(email)){
            errors.email = 'email should be in valid format'
        }

        if(password.trim().length === 0){
            errors.password = 'password is required'
        } else if(password.trim().length < 8 || password.trim().length > 128){
            errors.password = 'password between 8-128 characters'
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = {
            username,
            email,
            password,
        }

        runValidations()

        if(Object.keys(errors).length === 0){
        try {
            const response = await axios.post('/api/users/register', formData)
            navigate('/login')
        } catch(err){
            setServerErrors(err.response.data.errors)
        }
    } else {
        setClientErrors(errors)
    }
    }


    const handleCheckemail = async () => {
        if(validator.isEmail(email)){
            const response = await axios.get(`/api/users/checkemail?email=${email}`)
            if(response.data.is_email_registered){
                setClientErrors({email: 'email already taken'})
            } else {
                setClientErrors({email: ''})
            }
        }
    }


    return (
        <div>
            <h3>Register Here</h3>

            {serverErrors && (
                <div>
                    <h3>These are the server errors</h3>
                    <ul>
                        {serverErrors.map((ele,i) => {
                            return <li key={i}>{ele.msg}</li>
                        })}
                    </ul>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Enter Username</label><br/>
                <input 
                type='text'
                id='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}/>
                {clientErrors.username && <span>{clientErrors.username}</span>}<br/>

                <label htmlFor='email'>Enter Email</label><br/>
                <input 
                type='text'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleCheckemail}/>
                {clientErrors.email && <span>{clientErrors.email}</span>}<br/>

                <label htmlFor='password'>Enter Password</label><br/>
                <input 
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
                {clientErrors.password && <span>{clientErrors.password}</span>}<br/>

                <input type='submit'/>
            </form>
        </div>
    )
    
}

