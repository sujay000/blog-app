import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const baseurl = `https://blog-app-27r2.onrender.com`

function SignUp() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    async function handleSignUp() {
        const url = baseurl + `/signup`
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
            alert(`signup invalid: ${res.message}`)
        }
    }

    return (
        <div>
            <h2>Sign Up</h2>
            Username - <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /> <br />
            Password - <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} /> <br />{' '}
            <br />
            <button onClick={handleSignUp}>Sign Up</button> <br />
            <Link to="/">Already have an acc? Login</Link>
        </div>
    )
}

export default SignUp
