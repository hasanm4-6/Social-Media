const express = require("express")
const session = require("express-session")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const http = require("http")
const socketIo = require("socket.io")
const userRoutes = require("./SocialMedia/Routes/User Routes")
const postRoutes = require("./SocialMedia/Routes/Posts Routes")
const path = require("path")

dotenv.config()
const app = express()

// Create HTTP server and initialize Socket.IO
const server = http.createServer(app)
const io = socketIo(server)

app.use(express.json())
app.use(cors())
app.use(
  session({
    secret: "SeSsIoNsEcReTkEy",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
)

app.use("/Posts", express.static(path.join(__dirname, "Posts")))
app.use(express.static(path.join(__dirname, "SocialMedia", "Front-End")))
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "SocialMedia", "Front-End", "index.html"))
})

app.use("/api/posts", postRoutes)
app.use("/api/users", userRoutes)

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("A user connected")

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected")
  })
})

mongoose
  .connect("mongodb://localhost:27017/SocialMedia")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Database connection error:", err))

// Start the server with Socket.IO enabled
const PORT = process.env.PORT || 4000
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`)
})

// Attach io to the app so that it can be accessed in routes and controllers
app.set('io', io)

module.exports = io