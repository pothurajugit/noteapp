const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const studentModel = require('../models/student');
const jwt = require('jsonwebtoken');


// Student Registration
router.post('/registration', (req,res) =>{
    console.log(req.body);
    studentModel.findOne({username: req.body.username}, (err, document) =>{
        if (err) {
            console.log(`Error in student read: ${err}`)
        } else if (document == null) {
            bcrypt.hash(req.body.password, 10).then(hashedPassword =>{
                const userData = new studentModel({
                    name: req.body.name,
                    username : req.body.username,
                    email: req.body.email,
                    password: hashedPassword,
                    class : req.body.class,
                    gender: req.body.gender,
                    time : Date.now()
                });
                userData.save().then(result => {
                    res.send({message:'Student Registred Success', data: result});
                })
            }).catch(err => {
                console.log('Error ')
                res.send({error : `Error in student registration ${err}`});
            });
        } else {
            res.send({message: 'username name existed'});
        }
    })
});


// studen login
router.post('/login', (req, res) => {
    studentModel.findOne({username: req.body.username}).then(studentResult => {
        console.log(studentResult)
        var studentdata = studentResult;
        var student = studentResult;
        if(studentResult == null) {
            res.send({message:'username not available'});
        } else {
            //pwd match
            bcrypt.compare(req.body.password, studentResult.password).then(result => {
                if (result == false) {
                    res.send({message:'Invaid password'});ss
                } else {
                    jwt.sign({username : studentResult.username, studentId: studentResult._id},'sssssssss_ssssssssss',{expiresIn:"1h"}, (err, token) =>{
                        if(err) {
                            console.log(`Error in generating token ${err}`);
                        } else {
                            res.send({message:'Login success', token:token,name: studentdata.name, username: studentdata.username, class: studentdata.class});
                        }
                    })
                }
            });
        }
    });
});




module.exports = router;