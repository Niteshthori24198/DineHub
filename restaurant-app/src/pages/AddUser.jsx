import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import { postUser } from '../redux/User/action';



const defaultTheme = createTheme();

export default function AddRestaurant({ goToStepZero, selectedRestaurentId: restaurantId }) {

    const initialState = {
        name: '',
        email: ''
    }

    const [user, setUser] = React.useState(initialState);
    const [isDone, setIsDone] = React.useState(false);

    const dispatch = useDispatch();
    const {  isError } = useSelector((store) => {
        return {
            isError: store.user.isError
        }
    })

    React.useEffect(() => {
        setUser(initialState)
    }, [])


    const { name, email } = user;


    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(postUser(user))
        setUser(initialState)
        setIsDone(true)
        setTimeout(() => {
            setIsDone(false)
        },3000)
    };

    const handleChange = (e) => {
        const { value, name } = e.target
        setUser({ ...user, [name]: value })
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            {isDone && (isError ?
                <Alert severity="error" color="error">
                    Something Went Wrong
                </Alert> :
                <Alert severity="success" color="info">
                    Successfully done !
                </Alert>)
            }
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Typography component="h1" variant="h5">
                        Add New User
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Restaurant Name"
                            name="name"
                            autoComplete="name"
                            value={name}
                            onChange={handleChange}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={handleChange}
                            type='email'
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            ADD USER
                        </Button>

                    </Box>
                </Box>
            </Container>

        </ThemeProvider>
    );
}