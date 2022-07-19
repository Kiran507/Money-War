const express = require("express");
const router = new express.Router();

const mongoose = require('mongoose');
const DB = process.env.DATABASE
require('../db/mongoose');

const User = require("../models/userSchema");
const Product = require("../models/productsSchema");

const { requiredAuth, checkUser } = require("../auth/authMiddleware.js");
const { createToken } = require('../auth/jwttoken.js')

// add products page
router.get('/products/add/:uid', requiredAuth, checkUser, async (req, res) => {
    // const usersData = await User.find({})
    res.render('addproduct', { message: req.flash('message') })
})

// to add products
router.post('/products/add/:uid', async (req, res) => {
    const user = await User.findById({ _id: req.params.uid })
    const { productname, description, addedby, addedon, endtime, minimumbid, type, tags, optionTitle, optionImg } = req.body;

    if (!productname || !description || !addedby || !addedon || !endtime || !minimumbid || !type) {
        req.flash('message', 'Please fill all the fields')
        res.redirect('/products/add/' + user._id)
        // return res.status(422).json({ error: "Please fill all the fields" })
    }

    try {
        const bidActive = true
        var highestbid = minimumbid
        const product = new Product({ productname, description, addedby, addedon, endtime, minimumbid, highestbid, type, tags, optionTitle, optionImg, bidActive })

        const productRegistered = await product.save();

        if (productRegistered) {
            await User.findByIdAndUpdate({ _id: req.params.uid }, { $push: { products: product._id } })

            req.flash('message', 'Product Added Successfully')
            res.redirect('/products/view/' + product._id + '/' + user._id)
            // res.status(201).json({ message: "Team Created Successfully" });
        } else {
            req.flash('message', 'Failed to add this product')
            res.redirect('/products/add/' + user._id)
            // res.status(500).json({ error: "Failed to create this team" })
        }
    } catch (err) {
        console.log(err)
    }
})

// view product page 
router.get('/products/view/:pid/:uid', requiredAuth, checkUser, async (req, res) => {
    const product = await Product.findById({ _id: req.params.pid })
    const user = await User.findById({ _id: req.params.uid })

    // check if deadlline is over
    var today = new Date()
    var endtime = product.endtime

    if (product.bidActive == true) {
        if (endtime > today) {
            product.bidActive = true
        } else {
            product.bidActive = false
        }
    }

    // users bid data
    usersBidData = []
    for (let i = 0; i < product.usersBid.length; i++) {
        const bUser = await User.findById({ _id: product.usersBid[i] })
        usersBidData.push(bUser)
    }

    res.render('productview', { product, user, usersBidData, message: req.flash('message') })
})

// your products page 
router.get('/products/:uid', requiredAuth, checkUser, async (req, res) => {
    const user = await User.findById({ _id: req.params.uid })

    activeProducts = []
    inactiveProducts = []
    for (let i = 0; i < user.products.length; i++) {
        const product = await Product.findById({ _id: user.products[i] })

        if (product.bidActive == true) {
            activeProducts.push(product)
        } else {
            inactiveProducts.push(product)
        }
    }

    res.render('yourproducts', { activeProducts, inactiveProducts, user, message: req.flash('message') })
})

// bid a product 
router.post('/products/bid/:pid/:uid', requiredAuth, checkUser, async (req, res) => {
    const { highestbid } = req.body;
    const product = await Product.findById({ _id: req.params.pid })
    const user = await User.findById({ _id: req.params.uid })

    await Product.findByIdAndUpdate({ _id: req.params.pid}, { $set: { highestbid: highestbid }, $push: { usersBidPrice: highestbid } })
    await Product.findByIdAndUpdate({ _id: req.params.pid}, { $push: { usersBid: user._id } })
    
    req.flash('message', 'Successfully Bid at Rs. ' + highestbid)
    res.redirect('/products/view/'+product._id+'/'+user._id)
})

// delete a product
router.get('/products/delete/:pid/:uid', requiredAuth, checkUser, async (req, res) => {
    const product = await Product.findById({ _id: req.params.pid })
    const user = await User.findById({ _id: req.params.uid })

    await Product.findByIdAndDelete({ _id: req.params.pid })
    await User.findByIdAndUpdate({ _id: req.params.uid}, { $pull: { products: product._id } })
    
    req.flash('message', 'Product Removed Successfully')
    res.redirect('/products/'+user._id)
})

// end bidding
router.get('/products/bid/end/:pid/:uid', requiredAuth, checkUser, async (req, res) => {
    const product = await Product.findById({ _id: req.params.pid })
    const user = await User.findById({ _id: req.params.uid })

    await Product.findByIdAndUpdate({ _id: req.params.pid }, {$set: { bidActive: false } })
    
    req.flash('message', 'Bid Ended Successfully for ' + product.productname)
    res.redirect('/products/view/'+product._id+'/'+user._id)
})

// dashboard
router.get('/dashboard/:uid', requiredAuth, checkUser, async (req, res) => {
    const allProducts = await Product.find({})
    const user = await User.findById({ _id: req.params.uid })

    res.render('dashboard', { allProducts, user, message: req.flash('message') })
})

// notifications 
router.get('/notifications/:uid', requiredAuth, checkUser, async (req, res) => {
    const user = await User.findById({ _id: req.params.uid })

    res.render('notifications', {  message: req.flash('message') })
})

module.exports = router