import express from "express"
import productsRouter from "./routes/products"


const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello Worldjkj!')
})

app.use('/products',productsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})