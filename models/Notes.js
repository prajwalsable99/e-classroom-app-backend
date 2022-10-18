const mongoose=require('mongoose');

const NotesScehma = new Schema(

    {

        title:{ type:String ,required : true},
        desc:{ type:String ,required : true},
        
    }
)


module.exports=mongoose.model('notes',NotesScehma);