const express = require('express');
const router = express.Router();
const notesModel = require('../models/notes');
const studentModal = require('../models/student');



// get notes data
router.get('/notedrecords/:username', (req,res) => {
    // notesModel.find().then(result => {
    //     res.send(result);
    // })
    notesModel.find({username: req.params.username}).then(data => {
        res.send({notesData: data});
    }).catch(err => {
        console.log(`Error in reading notes data: ${err}`);
        res.send({message:'Error in notes data finding'});
    })
})

// svae notes content
router.post('/savenotes', (req,res) => {
    var studentdata = req.body;
    studentModal.find({username: req.body.username}).then(studenuObj => {
        if(studenuObj) {
            const studentnotesData = new notesModel({
                username: studentdata.username,
                class : studentdata.data.class,
                notescontent : studentdata.data.notesdata,
                time : Date.now()
            });
            studentnotesData.save().then(succ =>{
                console.log(`ppppppppppppp`,succ);
                res.send({message:'notes saved successfully', data: succ});
            }).catch(err => {
                res.send({message:`Error in saving notes ${err}`});
            })
        } 
    }).catch(err => {
        console.log(`Error in user read ${err}`);
    })
});

// update notes
router.put('/updatecontent', (req,res) => {
    notesModel.findByIdAndUpdate({_id:req.body.id},{$set:{notescontent: req.body.content, time: Date.now()}}).then(succ => {
        if(succ) {
            res.send({message:'Update success'});
        }
    }).catch(err => {
        console.log(`Error in update ${err}`);
        res.send({message:'Error in update'});
    })
});

// delete notes
router.delete('/deletenotes/:id', (req, res) => {
    console.log(req.params);
    notesModel.deleteOne({_id: req.params.id}).then(succ => {
        console.log(succ);
        res.send({message:'Deleted success'});
    }).catch(err => {
        console.log(`Error in deleting object ${err}`);
    })
});

// teacher class list
router.post('/classlist/:classname', (req,res) => {
    notesModel.find({class: req.params.classname}).then(result => {
        if(result) {
            res.send({message: result});
        }
    }).catch(err => {
        console.log(`Error in read classlist ${err}`);
    })
})

module.exports = router;    