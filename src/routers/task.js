const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')

router.post('/tasks',auth,async(req,res)=>{
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try{
        await task.save() 
        res.status(201).send(task)

    } catch(e){
        res.status(400).send(error)

    }
   
}) 

//GET /tasks?completed=true
//GET /tasks?limit=2&skip=2
//GET /tasks?sortBy=createdAt:desc

router.get('/tasks',auth, async(req,res)=>{
   const match={}
   const sort={}

    if(req.query.completed){ //if querystring exist then only we will update match object, else match will be empty
        match.completed = req.query.completed==='true' //req.query.completed will be string not boolean thats why to convert
    }
    if(req.query.sortBy){
        const parts=req.query.sortBy.split(':')
        sort[parts[0]]= parts[1] === 'desc' ? -1 : 1
    }

    try{
        // const tasks = await Task.find({owner: req.user._id, completed:false})
        await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit: parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
                
            }
        })
        res.send(req.user.tasks)
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/tasks/:id',auth, async(req,res)=>{
    const _id = req.params.id
    try{
        const task = await Task.findOne({_id, owner:req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send()

    }
    

})

router.patch('/tasks/:id',async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']
    const IsValidUpdates = updates.every((update) => allowedUpdates.includes(update))

    if(!IsValidUpdates) return res.status(400).send({error:'Invalid updates!'})

    try{
        const task=await Task.findById(req.params.id)
        
        task.forEach((update)=>{
            task[update]=req.body[update]
        })

        await task.save()
        
        if(!task){
           return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', async (req,res)=>{
    try{
        const task= await Task.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).send({error:"Task not found"})
        }
        res.send(task)
        
    }catch(e){
        res.status(500).send(e)
    }
})
module.exports = router