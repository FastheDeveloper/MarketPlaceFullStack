import { Router } from "express"

//products endpoints
const router=Router()

router.get('/',(req,res)=>{
  res.send("list of product")
})

router.get('/:id',(req,res)=>{
  res.send("A Product")
})

router.post("/",(req,res)=>{
  res.send("new prodicts created")
})

export default router; 