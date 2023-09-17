import { Link } from 'react-router-dom'
import Blog from '../extra-components/Blog'
import { useEffect, useState } from 'react'

function AllBlogs() {
    const [blogs, setBlogs] = useState([])
    useEffect(() => {
        async function fetchData() {
            const baseurl = `http://localhost:3000`
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
            <Link to="/dashboard/myblogs">Go to your blogs</Link>
            {blogs.map((blog) => {
                return <Blog key={blog._id} id={blog._id} title={blog.title} description={blog.description} />
            })}
        </div>
    )
}

export default AllBlogs
