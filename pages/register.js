// pages/signin.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { TextField, Button, Container, Typography, Grid, CssBaseline } from '@mui/material';
import axios from 'axios';

const SignIn = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Realiza validaciones
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
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
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
        {
          name,
          username,
          password
        }
      );
      router.push('/');
      console.log('Información enviada:', { response });
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
                label="Nombre"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
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

export default SignIn;
