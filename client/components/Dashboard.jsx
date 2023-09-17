import { Routes, Route } from 'react-router-dom'
import AllBlogs from './AllBlogs'
import MyBlogs from './MyBlogs'
import UpdateBlog from './UpdateBlog'
import { useNavigate } from 'react-router-dom'
function Dashboard() {
    const navigate = useNavigate()
    function handleLogout() {
        localStorage.removeItem('token')
        navigate('/')
    }
    return (
        <div>
            <h3>Dashboard</h3>
            <button onClick={handleLogout}>Logout</button>
            <button
                onClick={() => {
                    navigate('/createblog')
                }}
            >
                Create Blog
            </button>
            <Routes>
                <Route path="/" element={<AllBlogs />} />
                <Route path="/myblogs" element={<MyBlogs />} />
                <Route path="/updateblog/:id" element={<UpdateBlog />} />
            </Routes>
        </div>
    )
}

export default Dashboard
