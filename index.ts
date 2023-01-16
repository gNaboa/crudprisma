import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
const app = express()

app.use(express.json())

const prisma = new PrismaClient()

app.post('/api/create', async (req: Request, res: Response) => {
     const { username, password, phone } = req.body

     const user = await prisma.user.create({

          data: {
               username: username,
               password: password,
               phone: phone

          }
     })

     res.json(user)
});
app.post('/api/createcars', async (req: Request, res: Response) => {
     const { carList } = req.body

     const cars = await prisma.car.createMany({
          data: carList

     })

     res.json(cars)
});

app.get('/api/usersCars', async (req: Request, res: Response) => {


     const usersCars = await prisma.user.findMany({
          include: { cars: true }
     })
     res.json(usersCars)
});


app.get('/api/get', async (req: Request, res: Response) => {

     const users = await prisma.user.findMany()

     return res.json(users)

})

app.get('/api/get/:id', async (req: Request, res: Response) => {
     const { id } = req.params
     const usersbyid = await prisma.user.findFirst({
          where: {
               id: id
          }
     })

     return res.json(usersbyid)

})


app.put('/api/update', async (req: Request, res: Response) => {

     const { id, username } = req.body

     const updateUser = await prisma.user.update({
          where: {
               id: id
          },
          data: {
               username: username
          }
     })
     return res.json(updateUser)
})

app.delete('/api/delete/:id', async (req: Request, res: Response) => {

     const { id } = req.params
     const deleteUser = await prisma.user.delete({
          where: {
               id: id
          }
     })
     return res.json(deleteUser)
})


app.listen(3001, () => console.log("App running on port 3001"))




