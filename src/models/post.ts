import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId

const PostSchema = new mongoose.Schema({ // value's first letter must be a capital letter
    author: {type: String, ref:"User", required: true, index: true},
    body: { type: String, required: true, validate: (value) => { value.length > 0 } },
    likes: [{type: ObjectId, ref: "User"}],
    comments: [ {type: ObjectId, ref: "Comment"} ]
})

export const PostModel = mongoose.model('Post', PostSchema) // you have to put a capital letter in the first parameter

export type Post ={ 
    _id?: string;
    author: string;
    body: string;
    likes?: string[];
    comments?: string[];
}

//צריך לחלק לתגובות id?




