import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const baseurl = `https://blog-app-27r2.onrender.com/`

function CreateBlog() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate()
    async function handleCreate() {
        const url = baseurl + `/createBlog`
        let data = {
            title,
            description,
        }
        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify(data),
        })
        res = await res.json()
        console.log(res)
        navigate('/dashboard')
    }
    return (
        <div>
            Title - <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /> <br />
            Description - <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            <br />
            <br />
            <button onClick={handleCreate}>Create</button>
        </div>
    )
}

export default CreateBlog
