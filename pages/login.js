'use client'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { setCookie } from 'cookies-next';
import { TextField, Button, Container, Typography, Grid, CssBaseline } from '@mui/material';
import axios from 'axios';


const LogIn = () => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!username.trim()) {
      newErrors.username = 'El nombre de usuario es requerido';
    }
    if (!password.trim()) {
      newErrors.password = 'La contraseña es requerida';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      console.log({url});
      const response = await axios.post(
        `${url}/auth/login`,
        {
          username,
          password
        }
      );
      console.log('Información enviada:', { response });
      const token = response.data.token;
      const userId = response.data.user.id;
      setCookie('jwToken', token);
      setCookie('userId', userId);
      router.push('/blog');
    } catch (error) {
      console.log(error);
    }
    
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '64px' }}>
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '16px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nombre de Usuario"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={!!errors.username}
                helperText={errors.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth style={{ marginTop: '16px' }}>
            Iniciar Sesión
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default LogIn;
