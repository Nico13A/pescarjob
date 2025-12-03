import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import ofertaRoutes from './routes/oferta.routes.js';
import skillRoutes from './routes/skill.routes.js';
import postulacionRoutes from './routes/postulacion.routes.js';

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api/ofertas", ofertaRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/postulaciones", postulacionRoutes);

export default app;