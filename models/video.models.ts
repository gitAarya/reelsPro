import mongoose,{Schema,model, models} from "mongoose";
import User from "./user.model";

export const VideoDimension={
    width:1080,
    height:1920,
}as const

export interface videoI{
    _id?:mongoose.Types.ObjectId;
    title:string;
    discription:string;
    thumbnailUrl:string;
    videoUrl:string;
    controls?:boolean;
    transformation?:{
        height:number,
        width:number,
        quality?:number
    };
    createdAt:Date;
    updatedAt:Date
}

const VideoSchema= new Schema<videoI>(

    {
        title:{
            type:String,
            required:true,
        },
        discription:{
            type:String,
            required:true,
        },
        thumbnailUrl:{
            type:String,
            required:true
        },
        videoUrl:{
            type:String,
            required:true

        },
        controls:{
            type:Boolean,
            default:true,
        },
        transformation:{
            height:{
                type:Number,
                default:VideoDimension.height
            },
            width:{
                type:Number,
                default:VideoDimension.width
            },
            quality:{
                type:Number,
                min:1,
                max:100
            }
        }
    },
    {
        timestamps:true
    }
)
const Video= models?.Video || model<videoI>("Video",VideoSchema)
export default Video