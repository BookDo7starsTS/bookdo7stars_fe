'use client';
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import Image from 'next/image';

const RegisterForm = () => {
  return (
    <Container maxWidth="md">
      <Box>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Box sx={{ mr: 2 }}>
              <Image src={'/images/register.png'} alt="register" width={400} height={400} />
            </Box>
          </Grid>
          <Grid item xs>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 3, borderRadius: 2, p: 4, ml: 2, width: '100%' }}>
              <Typography component="h1" variant="h5" gutterBottom>
                Register
              </Typography>
              <Box component="form">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="name"
                  autoComplete="name"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="email"
                  type="email"
                  autoComplete="email"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="password"
                  type="password"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="confirmPassword"
                  label="confirmPassword"
                  type="password"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="address"
                  label="address"
                  autoComplete="address"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="phone"
                  label="phone"
                  autoComplete="phone"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <FormControlLabel control={<Checkbox name="policyyn" color="primary" />} label="I agree to the terms and conditions." />
                <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
                  Register
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default RegisterForm;
