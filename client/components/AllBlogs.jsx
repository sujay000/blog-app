import { Link } from 'react-router-dom'
import Blog from '../extra-components/Blog'
import { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
const baseurl = `https://blog-app-27r2.onrender.com`
// const baseurl = `http://localhost:3000`

function AllBlogs() {
    const [blogs, setBlogs] = useState([])
    useEffect(() => {
        async function fetchData() {
            const url = baseurl + `/allBlogs`

            let res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            })
            res = await res.json()
            setBlogs(res.blogs)
        }
        fetchData()
    }, [])
    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4">All blogs</Typography>
                <Link to="/dashboard/myblogs">
                    <Typography>Go to your blogs</Typography>
                </Link>
            </div>
            {blogs.map((blog) => {
                return <Blog key={blog._id} id={blog._id} title={blog.title} description={blog.description} />
            })}
        </div>
    )
}

export default AllBlogs
