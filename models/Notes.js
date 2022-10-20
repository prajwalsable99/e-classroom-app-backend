const mongoose=require('mongoose');

const NotesScehma = new mongoose.Schema(

    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        },
        title:{ type:String ,required : true},
        desc:{ type:String ,required : true},

        
    }
)


Notes=mongoose.model('notes',NotesScehma);
module.exports=Notes;