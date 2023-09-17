import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function UpdateBlog() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    let { id } = useParams()
    useEffect(() => {
        async function fetchData() {
            const baseurl = `http://localhost:3000`
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

    async function handleUpdate() {
        const baseurl = `http://localhost:3000`
        const url = baseurl + `/updateBlog/${id}`
        let data = {
            title,
            description,
        }
        let res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify(data),
        })
        res = await res.json()
        console.log(res)
        navigate('/dashboard/myblogs')
    }
    return (
        <div>
            Title - <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /> <br />
            Description - <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            <br />
            <br />
            <button onClick={handleUpdate}>Update</button>
        </div>
    )
}

export default UpdateBlog
