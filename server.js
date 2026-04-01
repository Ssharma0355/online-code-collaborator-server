import express from "express"
import { createServer } from "http"
import { Server } from "socket.io";
import { YSocketIO } from "y-socket.io/dist/server"

const app = express()
app.use(express.static("public"))


const httpServer  = createServer(app);




//setting cors 
const io = new Server(httpServer, {
    cors:{
        origin:"*",
        methods:["GET", "POST"]
    }
})


// Y JS setup inside server 
const ySocketIO = new YSocketIO(io)
ySocketIO.initialize()

// //health check route
// app.get("/",(req,res)=>{
//     res.status(200).json({
//         message:"All Fine",
//         success:true
//     })
// })

app.get("/health",(req,res)=>{
    res.status(200).json({
        message:"Health is Ok",
        success: true
    })
})
httpServer.listen(3000,()=>{
    console.log("Server Running at",3000)
})
