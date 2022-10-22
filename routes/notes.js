const express=require('express');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const Notes=require('../models/Notes');
const middleware=require('../middleware/fetchuser');
const fetchUser = require('../middleware/fetchuser');
const { json } = require('express');



// --------------------------------------------------------------------------
router.get(

    // end ponint 1 
    '/fetchAllNotes',
    fetchUser
    ,
   
    async (req, res) => {
            
            const notesList=await Notes.find({user:req.user.id});
            res.json(notesList); 
        try {
           
        } 
        catch (error) {
                console.error(error.message);
                res.status(500).send("kuch to gadbad hai");
        }

    }
)

// ------------------------------------------------------------------------------
router.post(

    // end ponint 1 
    '/AddNote',
    fetchUser
    ,
    [
        body('title').isLength({ min: 1 }),
        body('desc').isLength({min:1})
        

    ]
    ,
    async (req, res) => {
            
          
           
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {

            
            const Note = await Notes.create({

                user:req.user.id,
                title: req.body.title,
                desc: req.body.desc,
                
            });

            res.json(Note);
            
        } catch (error) {
            console.error(error.message);
            res.status(500).send("kuch to gadbad hai");
        }

    }
)


// -----------------------------------------------------------
router.put(

    // end ponint 1 
    '/UpdateNote/:uid',
    fetchUser
    
    ,
    async (req, res) => {
            
          
           
       
        try {

            
            const newNote = {

                user:req.user.id,
                title: req.body.title,
                desc: req.body.desc,
                
            };

            //find existing 

            let note= await Notes.findById(req.params.uid);
            if(!note){
                res.status(404).send("not found");
            }
            if(note.user.toString()!=req.user.id){
                res.status(401).send("not allowed");
            }
            
            note= await Notes.findByIdAndUpdate(req.params.uid,{$set:newNote},{new:true});
            res.json({note});


           
            
        } catch (error) {
            console.error(error.message);
            res.status(500).send("kuch to gadbad hai");
        }

    }
)



//------------------------------------------------------------------------

router.delete(

    // end ponint 1 
    '/deleteNote/:uid',
    fetchUser
    
    ,
    async (req, res) => {
            
          
           
       
        try {

            
        

            //find existing 

            let note= await Notes.findById(req.params.uid);
            if(!note){
                res.status(404).send("not found");
            }
            if(note.user.toString()!=req.user.id){
                res.status(401).send("not allowed");
            }
            
            note= await Notes.findByIdAndDelete(req.params.uid);
            res.json({sucess:"note deleted"});


           
            
        } catch (error) {
            console.error(error.message);
            res.status(500).send("kuch to gadbad hai");
        }

    }
)




module.exports=router