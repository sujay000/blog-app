import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import CardActions from '@mui/material/CardActions'
const baseurl = `https://blog-app-27r2.onrender.com`
// const baseurl = `http://localhost:3000`

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
        <Card>
            <CardContent>
                <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{
                        mb: 2,
                        mt: 2,
                    }}
                />
                <TextField
                    label="Content"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </CardContent>
            <CardActions
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Button onClick={handleCreate} variant="outlined" size="large">
                    Create
                </Button>
                <Button
                    onClick={() => {
                        navigate('/dashboard/myblogs')
                    }}
                    variant="outlined"
                    size="large"
                >
                    Cancel
                </Button>
            </CardActions>
        </Card>
    )
}

export default CreateBlog
