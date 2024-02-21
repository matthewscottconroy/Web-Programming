const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const csvParser = require('csv-parser');

module.exports = (app) => {
    // Route for home page
    app.get('/', (req, res) => {
        res.render('home');
			  //res.json({soda: "Coke", meal: "chicken"});
    });


    app.get('/patient', (req, res) => {
        const patientId = req.query.patientId;
        
        const results = [];
            fs.createReadStream('./public/data/example.csv')
                .pipe(csvParser())
                .on('data', (data) => {
                    if (data.PatientID === patientId) results.push(data);
                })
                .on('end', () => {
                    res.render('patient', { data: results });
                });     
    });
};

