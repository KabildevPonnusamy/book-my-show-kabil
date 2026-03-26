const express = require('express');
const Theatre = require('../models/Theatre');
const ApiResponse = require('../core/ApiResponse');
const {isLoggedIn, isPartnerOrAdmin } = require('../middlewares/user');

const router = express.Router();

router.post('/theatres', isLoggedIn, isPartnerOrAdmin, async (req, res) => {
    const { name, address, contactNo, capacity} = req.body;
    const { userId } = req;
    const theatre = await Theatre.create({ name, address, contactNo, capacity, user: userId });
    res.status(201).json(ApiResponse.build( true, { theatre }, "Theatre created successfully."));
});

router.get('/theatres',isLoggedIn, isPartnerOrAdmin, async (req, res) => {
    const theatres = await Theatre.find().populate( { path: 'user', select: '-password'});
    res.status(200).json(ApiResponse.build(true, {theatres}, 'Theatres fetched successfully'));
});

router.get('/theatres/:id', isLoggedIn, isPartnerOrAdmin, async( req, res) => {
    const {id} = req.params;
    const theatre = await Theatre.findById(id).populate({ path: 'user', select: '-password'});
    return res.status(200).json(ApiResponse.build(true, theatre, 'Theatre fetched successfully.'));
});

router.delete('/theatres/:id', isLoggedIn, isPartnerOrAdmin, async (req, res) => {
    const id = req.params.id;
    console.log("ID: ", id);
    const deleteTheatre = await Theatre.findByIdAndDelete(id);
    if(!deleteTheatre) {
        return res.json(ApiResponse.build( false, null, "Theatre not found!"));
    }

    res.json(ApiResponse.build(true, { deleteTheatre }, "Theatre deleted successfully."));
});

module.exports = router;