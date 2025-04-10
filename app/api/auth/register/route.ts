import { NextRequest,NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/user.model";

export async function POST(request:NextRequest) {
    try {
       const {email,password,username}=await request.json()
        if(!email ||!password){
            return NextResponse.json(
                {error:"email and password are required"},
                {status:400}
            )
        }

        await connectToDatabase();

       const existingUser= await User.findOne({email});

       if(existingUser){
        return NextResponse.json(
            {error:"useralready exists!"},
            {status:400}
        )
       };

      const user= await User.create(
        {
            username,
            email,
            password
        }
       )
       console.log(user);
       
       return NextResponse.json(
        {message:"user registers successfully"},
        {status:201}
    )


    } catch (error) {
        console.log(error);
        
        return NextResponse.json(
            {error:"registration failed"},
            {status:500}
        )
    }
    
}