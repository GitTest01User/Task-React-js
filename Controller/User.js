const { PrismaClient } = require('@prisma/client')

const Prisma = new PrismaClient()


UserListGet = async (req, res) => {
    try {
        const { id, email, name, age } = req.query
        let WhereClose = {}

        if (id) {
            WhereClose.id = id
        }
        if (email) {
            WhereClose.email = email
        }
        if (name) {
            WhereClose.name = name
        }
        if (age) {
            WhereClose.age = parseInt(age)
        }
        let Users;
        if (Object.keys(WhereClose).length > 0) {
            Users = await Prisma.users.findMany({
                where: WhereClose
            })

            res.status(201).send({
                Status: true,
                Massage: 'Users List Get Value!',
                Result: Users
            })
        } else {
            Users = await Prisma.users.findMany()
            res.status(201).send({
                Status: true,
                Massage: 'Users List Get Value!',
                Result: Users
            })
        }

    } catch (error) {
        res.status(400).send({
            Status: false,
            Massage: 'Users List Not Get Value!',

        })
    }

}

UserListPost = async (req, res) => {
    try {
        const { name, age, email } = req.body
        if (!name) {
            res.status(400).send({
                status: false,
                Massage: 'User is Not Provide name value !'
            })
        }
        if (!age) {
            res.status(400).send({
                status: false,
                Massage: 'User is Not Provide age value !'
            })
        }
        if (!email) {
            res.status(400).send({
                status: false,
                Massage: 'User is Not Provide email value !'
            })
        }
        let UsersCreate;
        if (name && age && email) {
            UsersCreate = await Prisma.users.create({
                data: {
                    name: name,
                    age: age,
                    email: email
                }
            })
            console.log('UsersCreate', UsersCreate)
            res.status(201).send({
                Status: true,
                Massage: 'User Was Create Successfully !',
                Result: UsersCreate
            })
        } else {

            res.status(400).send({
                Status: false,
                Message: 'Users Not Create Con You Pleace Provide Body!',

            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({
            Status: false,
            Message: 'Server error!',

        })
    }

}

UserListUpdate = async (req, res) => {
    try {
        const { id } = req.query
        var { name, age, email } = req.body
        let WhereCloseUpdate = {}
        if (id) {
            WhereCloseUpdate.id = id
        }
        let UserUpdate;
        if (Object.keys(WhereCloseUpdate).length > 0) {
            UserUpdate = await Prisma.users.update({
                where: WhereCloseUpdate,
                data: {
                    name: name,
                    age: age,
                    email: email
                }

            })
           
            res.status(201).send({
                Status: true,
                Message: 'User Updeted successfully !',
                Result: UserUpdate
            })

        } else {
            res.status(400).send({
                Status: false,
                Message: 'Users Not Updated Con You Pleace Provide Id !',

            })

        }

    } catch (error) {
        console.log(error)
        res.status(500).send({
            Status: false,
            Message: 'Server error!',

        })
    }


}


UserListFullUpdate = async (req, res) => {
    try {
       
        var { name, age, email } = req.body
       
        const whereCloseFullUpdate = {}
        if (id) {
            whereCloseFullUpdate.id = id
        }
        let UserUpdateFull;

        if (Object.keys(whereCloseFullUpdate).length > 0) {
            UserUpdateFull = await Prisma.users.update({
                where: req.query.id,
                data: {
                    name: name,
                    age: age,
                    email: email
                }
            })
           
            res.status(201).send({
                Status: true,
                Message: "User Details Full Updated !",
                Result: UserUpdateFull
            })
        } else {
            res.status(400).send({
                Status: false,
                Message: "User Details Id Messing Not Updated !",

            })
        }


    } catch (error) {
        res.status(500).send({
            Status: false,
            Message: "Server Error !",

        })
    }

}




UserListDelete = async (req, res) => {
    try {
        const { id } = req.query
        let WhereCloseDelete = {}

        if (id) {
            WhereCloseDelete.id = id
        }

        let UserDelete;
        if (Object.keys(WhereCloseDelete).length > 0) {
            UserDelete = await Prisma.users.delete({
                where: WhereCloseDelete
            })
            res.status(201).send({
                Status: true,
                Message: 'Users Deleted By Id!',
                Result: UserDelete
            })

        }
        else {

            res.status(400).send({
                Status: false,
                Message: 'Users Not Deleted Con You Pleace Provide Id!',

            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            Status: false,
            Message: 'Server error!',

        })
    }

}

module.exports = {
    UserListGet,
    UserListDelete,
    UserListPost,
    UserListUpdate,
    UserListFullUpdate
}