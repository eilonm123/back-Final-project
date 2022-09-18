import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId

const commnentSchema = new mongoose.Schema({ 
    author: {type: String, ref:"User", required: true, index: true},
    comments: [ {type: ObjectId, ref: "Comment"} ]
})

