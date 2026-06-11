import express from 'express';
import serviceRoutes from './routes/service.routes';


const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).json({
        message: "Welcome to the application"
    })
})

app.get("/health",(req,res)=>{
    res.status(200).json({
        message:"Backend Server is running...."
    })
})

app.use("/api/services", serviceRoutes);

export default app;