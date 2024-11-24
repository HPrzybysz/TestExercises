const express = require('express');
const bodyParser = require('body-parser');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

const app = express();

app.use(bodyParser.json());
app.use('/users', router);

app.get('/', (req, res) => {
    res.send('Hello World!');
})

router.get('/', async (req, res) => {
    try{
        const users = await prisma.user.findMany();
        res.status(200);
        res.json(users);
    }catch(err){
        res.status(500).send('Something went wrong!' + err);
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const users = await prisma.user.findUnique({
            where: {id: parseInt(id)},
        })
        if (!users) {
            res.status(404).send('User Not Found');
        }else
            res.status(200).send(users);
    }catch(err){
        res.status(500).send('Something went wrong!');
    }
})

router.post('/', async (req, res) => {
    const {name, surname} = req.body;
    try{
        const user = await prisma.user.create({
                data: {name, surname}
        });
        res.status(201).send(user);
    }catch(err){
        res.status(500).send('Something went wrong!');
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const {name, surname} = req.body;
    try{
        const user = await prisma.user.update({
            where: {id: parseInt(id)},
            data: {name, surname}
        })
        res.status(200).send(user);
    }catch(err){
        res.status(500).send('Something went wrong!');
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const user = await prisma.user.delete({where: {id: parseInt(id)}});
        res.status(200).send(user);
    }catch(err){
        res.status(500).send('Something went wrong!');
    }
})



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})