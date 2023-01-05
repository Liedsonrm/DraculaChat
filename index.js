const express = require('express')
const app = express()
port = 5000



app.use(express.static('public'))
app.use(express.json())

app.get("/", (req,res) => {
    console.log("OI")
    res.sendFile(__dirname+"/start.html")
})

app.get("/chat", (req, res) => {
    var {name} = req.query
    res.sendFile(__dirname+"/index.html")
})


const server  = app.listen(5000, () => console.log("ON"))

const io = require('socket.io')(server)

io.on("connection", (socket) => {
    console.log("[LOGADO]", socket.id)
    socket.on("chat_message", (msg) => {
        console.log("User:", socket.id, "Msg:", msg)
        io.emit("chat_message", msg)
    })
})

