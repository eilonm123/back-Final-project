import { Post, PostModel } from '../models/post'



export async function serviceCreatePost(postData: Post, username: String) {
    const newPost = new PostModel(postData)
    await newPost.save()
    return newPost
}

export async function serviceGetFeed() {
    const allPosts = await PostModel.find({})
    return allPosts
}

export async function getPostById(postId: string) {
    const post = await PostModel.findById(postId);
    return post;
}

export async function deletePostById(postId: string) {

        const deletePost = await PostModel.findByIdAndDelete();
}

export async function chengePostById(id, prop:string ,value) { //שינוי פוסט
    const chengeP = await PostModel.findByIdAndUpdate({_id: id}, {$set:{[prop]:value}},{new: true})
    return chengeP;
}

export async function changeCommnetById(postId: string,comments,) {
    const changeC = await PostModel

}


export async function changeLikeById(postId: string,) {
    
}






// פוסט שינוי 
//שינוי של תגובה
//שינוי של לייק
//לעלות תגובה
//לעלות לייק
//תיוגים לעלות
//מחיקת תיוג

///פוסט ממומן וסטורי ממומן

