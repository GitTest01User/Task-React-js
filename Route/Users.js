const { UserListGet,
    UserListDelete,
    UserListPost,
    UserListUpdate,
    UserListFullUpdate } = require('../Controller/User')

const express = require('express')

const Routes = express.Router()


Routes.get("/Users", UserListGet)
Routes.delete("/Users", UserListDelete)
Routes.post("/Users", UserListPost)
Routes.patch("/Users", UserListUpdate)
Routes.put("/Users", UserListFullUpdate)
module.exports = Routes