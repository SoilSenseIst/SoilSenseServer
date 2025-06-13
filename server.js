import express from 'express';
import stytch from 'stytch';
import dotenv from 'dotenv';
import cors from 'cors';
<<<<<<< HEAD
import axios from "axios";

=======
>>>>>>> 6ab5ae8151af897012f117d86d70b4b56dd03aed

dotenv.config();

const app = express();

app.use(cors({
<<<<<<< HEAD
  origin: 'https://soilsenseist.netlify.app',
=======
  origin: 'https://soilsenseist.netlify.app', 
>>>>>>> 6ab5ae8151af897012f117d86d70b4b56dd03aed
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
<<<<<<< HEAD
 
=======
>>>>>>> 6ab5ae8151af897012f117d86d70b4b56dd03aed

    res.json({
      success: true,
      message: 'User logged in successfully',
      token: resp.session_token,
    });
  } catch (err) {
<<<<<<< HEAD
    console.error("🔴 Login error:", err);

=======
>>>>>>> 6ab5ae8151af897012f117d86d70b4b56dd03aed
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
<<<<<<< HEAD
  const { email, first_name, last_name, device_ID, device_key } = req.body;

  if (!email || !first_name || !last_name || !device_ID || !device_key) {
=======
  const { session_token, first_name, last_name, device_ID, device_key } = req.body;

  if (!session_token || !first_name || !last_name || !device_ID || !device_key) {
>>>>>>> 6ab5ae8151af897012f117d86d70b4b56dd03aed
    return res.status(400).json({
      success: false,
      message: 'Missing required fields',
    });
  }

  try {
<<<<<<< HEAD
    const response = await axios.post("https://soilsense-api.onrender.com/api/profile", {
      email,
      first_name,
      last_name,
      device_ID,
      device_key
    });
=======
    // Autentica o token para obter user_id
    const session = await client.sessions.authenticate({ session_token });
    const user_id = session.user_id;

>>>>>>> 6ab5ae8151af897012f117d86d70b4b56dd03aed

    res.json({
      success: true,
      message: 'Perfil salvo com sucesso!',
<<<<<<< HEAD
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
=======
    });

  } catch (err) {
    console.error(err);
    res.status(401).json({
      success: false,
      message: err.error_message || 'Token inválido ou expirado',
>>>>>>> 6ab5ae8151af897012f117d86d70b4b56dd03aed
    });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
