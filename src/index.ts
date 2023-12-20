import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import sequelizeConnection from "./db/config";
import { initModels } from "./model/init-models";
import { Op } from 'sequelize'
import fs from "fs";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const connectServer = async () => {
    try {
        await sequelizeConnection.authenticate();
    } catch (err) {
        console.log(err, "======== message err");
    }
};

connectServer();

const model = initModels(sequelizeConnection);

app.get("/", async (req: Request, res: Response) => {
    const result = await model.user.create({
        address: " mock",
        birth_day: new Date(),
        password: "mock",
        username: "mock",
    });
    console.log('result', result)
    res.send("create success");
});

app.get("/get-book", async (req: Request, res: Response) => {
    // include change model user to another name
    try{
        const result = await model.user.findByPk(21, {
            include: [
                {
                    model: model.booking,
                },
            ],
        });
        res.send(result);
    } catch (err) {
        console.log(err)
        res.send(err)
    }
});

app.get("/init-model", async (req: Request, res: Response) => {
    const result = await model.user.findAll();
    const result2 = await model.booking.findAll();
    // write file json 
    await fs.writeFileSync('./data/user.json', JSON.stringify(result));
    await fs.writeFileSync('./data/booking.json', JSON.stringify(result2));
    // res.send({
    //     user:result,
    //     booking:result2
    // });
    res.send('mock')
})

// git uncommit
// git reset --soft HEAD~1

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
