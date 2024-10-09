import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useHistory } from 'react-router-dom';

const LoginScreen = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleLogin = () => {
        if (id && password) {
            history.push('/main');
        }
    };

    return (
        <Box className="screen-container">
            <img src="/logo.png" alt="Logo" style={{ width: '200px', marginBottom: '20px' }} />
            <Typography variant="h4" gutterBottom>로그인</Typography>
            <TextField
                label="아이디"
                variant="outlined"
                fullWidth
                margin="normal"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <TextField
                label="비밀번호"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" fullWidth onClick={handleLogin} style={{ marginTop: '20px' }}>
                로그인
            </Button>
        </Box>
    );
};

export default LoginScreen;