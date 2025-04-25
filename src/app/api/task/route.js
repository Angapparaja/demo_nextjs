import task from "@/model/task";
import { dbConnect } from "@/utilis/dbconnection";
import { NextResponse } from "next/server";


export async function GET(){
    await dbConnect();
    const taskData = await task.find();
    console.log(taskData, "taskData");
    return NextResponse.json({ taskData },{status:200});
}

export async function POST(req) {
    await dbConnect();
    const data = await req.json();
    console.log(data,"data");

    const taskData = await task.create(data);
    return NextResponse.json({userData:taskData},{status:201})
    
}

// export async function DELETE(req){
//     await dbConnect();
//     const data = await req.json();

//     const taskData = await task.findByIdAndDelete(data.id);
//     return NextResponse.json({userData:taskData},{status:200});
// }


export async function DELETE(req){
    await dbConnect();
    const URLrequest = new URL(req.url); //get the request URL
    console.log(URLrequest, "URLrequest");
    const id = URLrequest.searchParams.get("id");
    console.log(id, "id");
    const taskData = await task.findByIdAndDelete(id);
    return NextResponse.json({userData:taskData, messsage : "Delete Successfully"},{status:200});
  
}

export async function PUT(req) {
    await dbConnect();
    const editdata = await req.json();
    console.log(editdata,"editdata");
    const taskEditData = await task.findByIdAndUpdate(editdata.id,editdata, {new:true,});
    return NextResponse.json({taskData: taskEditData},{status:200});
}