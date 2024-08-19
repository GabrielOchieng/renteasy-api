import express from "express";
import asyncHandler from "express-async-handler";
import House from "../models/houseModel.js";

// const upload = multer({ storage }); // Create Multer upload instance

//Get all houses
const getHouses = asyncHandler(async (req, res) => {
  try {
    const houses = await House.find();
    res.json(houses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Get one house
const getHouse = asyncHandler(async (req, res) => {
  try {
    const house = await House.findById(req.params.id);
    if (!house) return res.status(404).json({ message: "House not found" });
    res.json(house);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Create a house
const createHouse = asyncHandler(async (req, res) => {
  try {
    // Access uploaded photos from req.files

    const newHouse = new House({
      street: req.body.street,
      town: req.body.town,
      estate: req.body.estate,
      address: req.body.address,
      propertyType: req.body.propertyType,
      bedrooms: req.body.bedrooms,
      bathrooms: req.body.bathrooms,
      rentPrice: req.body.rentPrice,
      // photos, // Store the constructed image URLs
      description: req.body.description,
      amenities: req.body.amenities,
      contactInfo: req.body.contactInfo,
      landlord: req.body.landlord,
    });
    console.log("user", req.user);
    console.log("houses", req.body);
    const savedHouse = await newHouse.save();
    res.status(201).json(savedHouse);
    console.log("success", savedHouse);
  } catch (err) {
    res.status(400).json({ message: err.message }); // Handle validation errors
    console.log("error", err.message);
  }
});

// update a house
const updateHouse = asyncHandler(async (req, res) => {
  const houseId = req.params.id;
  const updates = req.body;
  try {
    const updatedHouse = await House.findByIdAndUpdate(houseId, updates, {
      new: true,
    });
    if (!updatedHouse)
      return res.status(404).json({ message: "House not found" });
    res.json(updatedHouse);
  } catch (err) {
    res.status(400).json({ message: err.message }); // Handle validation errors
  }
});

//Delete a house
const deleteHouse = asyncHandler(async (req, res) => {
  const houseId = req.params.id;
  try {
    const deletedHouse = await House.findByIdAndDelete(houseId);
    if (!deletedHouse)
      return res.status(404).json({ message: "House not found" });
    res.json({ message: "House deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export { getHouses, getHouse, createHouse, updateHouse, deleteHouse };
