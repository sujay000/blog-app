import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const baseurl = `https://blog-app-27r2.onrender.com`

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    async function handleLogin() {
        const url = baseurl + `/login`
        console.log(username, 'here')
        console.log(password)
        let data = {
            username,
            password,
        }
        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        res = await res.json()
        let token = res.token
        if (token) {
            localStorage.setItem('token', token)
            navigate('/dashboard')
        } else {
            console.log(username, '========')
            console.log(password)
            alert(`login invalid : ${res.message}`)
        }
    }
    async function handleDummy() {
        setUsername('hello')
        setPassword('123')
        const url = baseurl + `/login`
        let data = {
            username: 'hello',
            password: '123',
        }
        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        res = await res.json()
        let token = res.token
        if (token) {
            localStorage.setItem('token', token)
            navigate('/dashboard')
        } else {
            alert(`login invalid : ${res.message}`)
        }
    }
    return (
        <div>
            <h2>Login</h2>
            Username - <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /> <br />
            Password - <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
            <br />
            <button onClick={handleLogin} id="loginButton">
                Login
            </button>
            <button onClick={handleDummy}>Use dummy account</button> <br />
            <Link to={'/signup'}>Dont have an acc? Signup</Link>
        </div>
    )
}

export default Login
