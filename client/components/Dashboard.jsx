import { Routes, Route } from 'react-router-dom'
import AllBlogs from './AllBlogs'
import MyBlogs from './MyBlogs'
import UpdateBlog from './UpdateBlog'
import { useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'

function Dashboard() {
    const navigate = useNavigate()
    function handleLogout() {
        localStorage.removeItem('token')
        navigate('/')
    }
    return (
        <Container>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Dashboard
                        </Typography>
                        <Button
                            color="inherit"
                            onClick={() => {
                                navigate('/createblog')
                            }}
                        >
                            Create Blog
                        </Button>
                        <Button color="inherit" variant="outlined" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>

            <Routes>
                <Route path="/" element={<AllBlogs />} />
                <Route path="/myblogs" element={<MyBlogs />} />
                <Route path="/updateblog/:id" element={<UpdateBlog />} />
            </Routes>
        </Container>
    )
}

export default Dashboard
