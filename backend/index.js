import express from 'express';
import {PrismaClient} from '@prisma/client';
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const prisma = new PrismaClient();

app.get('/', async (req, res) => {
    const request = await prisma.request.count();
    if(request === 1000) {
        res.json({message: "FLAG"});
    }else{
        res.json({request});
    }
})

app.post('/request', async (req, res) => {
    const {name} = req.body;
    const request = await prisma.request.create({
        data: {
            name
        }
    })
    res.json(request)
})

setTimeout(async () => {
    await prisma.request.deleteMany();
    console.log("Deleted all requests");
}, 60000);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})