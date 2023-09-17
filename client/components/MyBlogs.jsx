import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Blog from '../extra-components/Blog'
const baseurl = `https://blog-app-27r2.onrender.com`

function MyBlogs() {
    const [blogs, setBlogs] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        async function fetchData() {
            const url = baseurl + `/myblogs`

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

    async function handleDelete(e) {
        let id = e.target.id
        const url = baseurl + `/blog/${id}`
        await fetch(url, {
            method: 'DELETE',
        })
        const rest = blogs.filter((x) => x._id !== id)
        console.log(rest)
        setBlogs(rest)
    }
    async function handleUpdate(e) {
        let id = e.target.id
        navigate(`/dashboard/updateblog/${id}`)
    }

    return (
        <div>
            <h3>My blogs</h3>

            <Link to="/dashboard/"> Go to all blogs</Link>
            {blogs.map((blog) => {
                return (
                    <div
                        key={blog._id}
                        style={{
                            border: '1px solid black',
                        }}
                    >
                        <Blog id={blog._id} title={blog.title} description={blog.description} />
                        <button onClick={handleUpdate} id={blog._id}>
                            Update
                        </button>
                        <button onClick={handleDelete} id={blog._id}>
                            Delete
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default MyBlogs
