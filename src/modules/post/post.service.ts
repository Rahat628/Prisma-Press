import { prisma } from "../../lib/prisma"

const CreatePost = async(payload : any, userId : string)=>{
    
    const {title,content,thumbnail,isFeatured,status,tags} = payload
    const post = await prisma.post.create({
        data:{
            title,
            content,
            thumbnail,
            isFeatured,
            status,
            tags,
            userId
        }
    }) 

    return post;

}

export const postService = {
    CreatePost
}