const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const app=express()
const port = process.env.PORT 

const User = require('./models/user')

app.use(express.json()) //automatically parse incoming json to an object
app.use(userRouter)
app.use(taskRouter)



app.listen(port, ()=>{
    console.log('Server up on port' + port)

})

// const main= async()=>{
//     // const task=await Task.findById('61debb5857c37bccf427fe88')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)
//     const user =await User.findById('61e2812bb01c960ce87f5cdb')
//     await user.populate('tasks')
//     console.log(user.tasks)

// }
// main()

