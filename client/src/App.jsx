import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import Dashboard from '../components/Dashboard'

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard/*" element={<Dashboard />} />
            </Routes>
        </div>
    )
}

export default App
