const express = require('express')
const Port = 3004
const app = express()

const cors=require('cors')
const Routes = require('./Route/Users')
app.use(express.json())
const path = require('path')

app.use(cors())
app.get("/Status", (req, res) => {
    res.status(200).send("Hello World")
})

// Serve static files from the 'build' directory of the frontend
app.use(express.static(path.join(__dirname, 'Frontend', 'build')));

// Catch-all route to handle client-side routing for React (SPA)
app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'Frontend', 'build', 'index.html'));
});

app.use("/Status", Routes)

app.listen(Port, () => {
    console.log('Server Is Running !')

})
