import express from 'express';
import stytch from 'stytch';
import dotenv from 'dotenv';
import cors from 'cors';
import axios from "axios";


dotenv.config();

const app = express();

app.use(cors({
  origin: 'https://soilsenseist.netlify.app',
  credentials: true,
}));

app.use(express.json());

const client = new stytch.Client({
  project_id: process.env.PROJECT_ID,
  secret: process.env.SECRET,
  env: stytch.envs.test,
});

const port = process.env.PORT || 3333;

app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const resp = await client.passwords.create({
      email,
      password,
      session_duration_minutes: 60,
    });

    res.json({
      success: true,
      message: 'User registered successfully',
      token: resp.session_token,
    });
  } catch (err) {
    console.error(err);
    res.json({
      success: false,
      message: err.error_message || 'Registration failed',
      err: err,
    });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const resp = await client.passwords.authenticate({
      email,
      password,
      session_duration_minutes: 60,
    });
 

    res.json({
      success: true,
      message: 'User logged in successfully',
      token: resp.session_token,
    });
  } catch (err) {
    console.error("🔴 Login error:", err);

    console.error(err);
    res.json({
      success: false,
      message: err.error_message || 'Login failed',
      err: err,
    });
  }
});

app.post('/authenticate', async (req, res) => {
  const { session_token } = req.body;

  try {
    const resp = await client.sessions.authenticate({ session_token });

    res.json({
      success: true,
      message: 'Token is valid',
      token: resp.session_token,
    });
  } catch (err) {
    console.error(err);
    res.json({
      success: false,
      message: err.error_message || 'Authentication failed',
      err: err,
    });
  }
});

app.post('/logout', async (req, res) => {
  const { session_token } = req.body;

  try {
    await client.sessions.revoke({ session_token });

    res.json({
      success: true,
      message: 'User logged out successfully',
    });
  } catch (err) {
    console.error(err);
    res.json({
      success: false,
      message: err.error_message || 'Logout failed',
      err: err,
    });
  }
});

app.post('/profile', async (req, res) => {
  const { email, first_name, last_name, device_ID, device_key } = req.body;

  if (!email || !first_name || !last_name || !device_ID || !device_key) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields',
    });
  }

  try {
    const response = await axios.post("https://soilsense-api.onrender.com/api/profile", {
      email,
      first_name,
      last_name,
      device_ID,
      device_key
    });

    res.json({
      success: true,
      message: 'Perfil salvo com sucesso!',
      db_response: response.data,
    });

  } catch (err) {
    console.error("❌ Erro ao salvar perfil:", err);
    res.status(500).json({
      success: false,
      message: 'Erro ao comunicar com server2',
    });
  }
});

app.get('/api/user-profile', async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Email é obrigatório',
    });
  }

  try {
    // Requisição ao server2 (onde o banco está)
    const response = await axios.get(`https://soilsense-api.onrender.com/api/profile=${email}`);

    res.json({
      success: true,
      profile: response.data.profile,
    });
  } catch (err) {
    console.error("❌ Erro ao buscar perfil:", err.message);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar perfil no server2',
    });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
