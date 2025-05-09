const express = require("express");
const { DogModel } = require("../models/dog.model");
const dogRouter = express.Router();

dogRouter.post("/create", async (req, res) => {
    try {
      const { name, breed, age, description } = req.body;
      
      // Validate required fields
      if (!name || !breed || !age || !description) {
        return res.status(400).json({ msg: "All fields are required" });
      }
      
      // Create new dog with owner from authenticated user
      const newDog = await DogModel.create({
        name,
        breed,
        age,
        description,
        owner: req.user._id
      });
      
      res.status(201).json(newDog);
    } catch (error) {
      console.error("Error creating dog:", error);
      res.status(500).json({ msg: "Error creating dog", error: error.message });
    }
});

// Get all dogs
dogRouter.get("/", async (req, res) => {
    try {
      const dogs = await DogModel.find({ owner: req.user._id });
      res.status(200).json(dogs);
    } catch (error) {
      res.status(500).json({ msg: "Error fetching dogs", error: error.message });
    }
  });

// Get all dogs
dogRouter.get("/all", async (req, res) => {
    try {
      const dogs = await DogModel.find({});
      res.status(200).json(dogs);
    } catch (error) {
      res.status(500).json({ msg: "Error fetching dogs", error: error.message });
    }
  });

// Delete dog
dogRouter.delete("/:id", async (req, res) => {  // dog Id
    try {
      const result = await DogModel.findOneAndDelete({ 
        _id: req.params.id, 
        owner: req.user._id 
      });
      
      if (!result) {
        return res.status(404).json({ msg: "Dog not found or you don't have permission to delete it" });
      }
      
      res.status(200).json({ msg: "Dog deleted successfully" });
    } catch (error) {
      res.status(500).json({ msg: "Error deleting dog", error: error.message });
    }
  });
  
  

module.exports = { dogRouter }