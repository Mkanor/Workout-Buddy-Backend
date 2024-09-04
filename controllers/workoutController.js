const WorkoutModel = require('../models/WorkoutModels');
const express = require('express');
const mongoose = require('mongoose')

const CreateWorkout = async (req,res)=>{
    console.log(req.body);

    const {title,reps,load} = req.body;
    let emptyFields = [];
    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length>0){
       return res.status(400).json({error:'Please fill all fields',emptyFields}) 
    }

    try{
    const user_id = req.user._id;
    const workout =await  WorkoutModel.create({title,reps,load,user_id});
    res.status(200).json({workout})
    }catch(err){
        res.status(400).json({error:err.message})
    }
    
}

const GetWorkouts = async(req,res)=>{
    const user_id = req.user._id;
    const workouts = await WorkoutModel.find({user_id}).sort({createdAt:-1})
    if(workouts)
    res.status(200).json({workouts})
    else
    res.status(404).json({error:"Something went wrong"})
}

const  GetWorkout = async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"No such Id"});

    }else{
    const workout = await WorkoutModel.findById({_id:id});
    if(!workout){
        return res.status(400).json({error:"No such Workout"});
    }else{
        res.status(200).json({workout})
    }
}
}

const DeleteWorkout = async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"No such Id"});

    }else{
        const workout = await WorkoutModel.findOneAndDelete({_id:id});
        if(!workout){
            return res.status(400).json({error:"No such Workout"});
        }else{
            res.status(200).json({workout})
        }
    }
}

const UpdateWorkout = async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"No such Id"});

    }else{
        const workout = await WorkoutModel.findOneAndUpdate({_id:id},{...req.body})
        if(!workout){
            return res.status(400).json({error:"No such Workout"});
        }else{
            res.status(200).json(workout)
        }
    }
}

module.exports={CreateWorkout, GetWorkout, GetWorkouts, UpdateWorkout, DeleteWorkout}