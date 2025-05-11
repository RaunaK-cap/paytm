import express from "express"
import { users } from "./rotuers/users"

const app = express()

app.use(express.json())

app.use("/paytm" , users)

app.listen(3000)