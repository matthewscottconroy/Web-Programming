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

    // Route to display images
    app.get('/images', (req, res) => {
        const imageDir = path.join(__dirname, '../public/images');
        fs.readdir(imageDir, (err, files) => {
            if (err) throw err;
            res.render('images', { images: files });
        });
    });

    // Route to display data based on query
    app.get('/data', (req, res) => {
        const { type, filter } = req.query; // e.g., ?type=json&filter=someValue
        const filePath = path.join(__dirname, `../public/data/example.${type}`);
        
        if (type === 'json') {
            fs.readFile(filePath, (err, data) => {
                if (err) throw err;
                const jsonData = JSON.parse(data).filter(item => item.key === filter);
                res.render('data', { data: jsonData });
            });
        } else if (type === 'csv') {
            const results = [];
            fs.createReadStream(filePath)
                .pipe(csvParser())
                .on('data', (data) => {
                    if (data.key === filter) results.push(data);
                })
                .on('end', () => {
                    res.render('data', { data: results });
                });
        }
    });

    // Route to handle form submission
    app.post('/submit-form', upload.none(), (req, res) => {
        const { name, email } = req.body;
        // Process form data here...
        res.render('form', { name, email });
    });
};

