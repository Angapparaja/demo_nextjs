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
    const type = URLrequest.searchParams.get("type");
    const id = URLrequest.searchParams.get("id");
    if (type === "all") {
        // Delete all tasks
        await task.deleteMany({});
        return NextResponse.json({ message: "All tasks deleted successfully" }, { status: 200 });
      }

      if (id) {
        // Delete single task
        const taskData = await task.findByIdAndDelete(id);
        return NextResponse.json({ userData: taskData, message: "Delete Successfully" }, { status: 200 });
      }
      return NextResponse.json({ message: "Invalid request" }, { status: 400 })
}

export async function PUT(req) {
    await dbConnect();
    const editdata = await req.json();
    console.log(editdata,"editdata");
    const taskEditData = await task.findByIdAndUpdate(editdata.id,editdata, {new:true,});
    return NextResponse.json({taskData: taskEditData},{status:200});
}