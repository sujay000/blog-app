import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// const baseurl = `https://blog-app-27r2.onrender.com`
// const baseurl = `http://localhost:3000`

function ReadBlog() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    let { id } = useParams()
    console.log(id)
    useEffect(() => {
        async function fetchData() {
            const url = baseurl + `/blog/${id}`

            let res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            })
            res = await res.json()
            console.log(res)
            setTitle(res.blog.title)
            setDescription(res.blog.description)
        }
        fetchData()
    }, [])
    const navigate = useNavigate()
    return <div>hi there {id}</div>
}

export default ReadBlog
