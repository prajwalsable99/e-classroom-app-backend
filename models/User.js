const mongoose=require('mongoose');


const UserScehma = new mongoose.Schema(

    {

        name:{ type:String ,required : true},
        email:{ type:String ,required : true,unique:true},
        password:{ type:String ,required : true},
        date:{ type:Date ,default:Date.now},
    }
)


User=mongoose.model('user',UserScehma);

module.exports=User;