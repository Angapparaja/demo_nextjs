"use client"
import axios from "axios";


import { useEffect, useState } from "react";

export default function Home() {
  const tableheading = ["Sno","Task","Action"];
  const [data,setData] = useState([]); // return data Array a erukuthu so [] use pannuom
const [iscreateOpen , setCreateOpen] = useState(false); // boolean value so "false or true nu set pannalam"
const [taskname , settaskname] = useState("");  //text value thaa use pannurom so empty string"" pass panurom
const [loading ,setloading] = useState(true);

  console.log(tableheading,"tableheading");
  // const data=[{serialnumber:1,task:"complete task"},
  //   {serialnumber:2,task:"task processing"},
  //   {serialnumber:3,task:"task pending"}
  // ];

const getTask = async () => {
  const data = await axios.get("/api/task");
  // console.log(data, "datadata");
  // console.log(data.data,"inside data");

  console.log(data.data.taskData, "taskcheck");
  setData(data.data.taskData)
  setloading(false);
}
  // console.log("datavalue", data)

useEffect(()=> {
  getTask();
},[]);

const handleCreate =()=>{
  // console.log("hello");
  //setCreateOpen(true); //click first time its open and then click again its not closed
  setCreateOpen(!iscreateOpen); //its switch clicking  false to true and true to false  change to opposite condition
  settaskname("");
}

const handleSave = async() => {
const passvalue = { task_name: taskname};
const data = await axios.post("api/task" , passvalue) //api/task is a first string and passvalue is a object
// console.log(data ,"data");
if(data.status===201){
  setCreateOpen(false); //ipput box close aagum
  
  getTask(); //getapi again call aagum page render aagum

}
}

console.log(taskname, "taskname");

const handleDelete = async(taskId) =>{  //delete functionality ku mattum param la Id pass pananum
console.log("Deleted Id" , taskId);

// const taskdata = {
//   id: taskId,
// };

// console.log(taskdata);

// const data = await axios.delete(`api/task`,{ data: taskdata }); //delete method aa erutha config anupanum so athu direct aa object aa retrive pannaathu so athuku data:taskdata nu data la object aa set pannanum pola  'api/task' is a first parameter and data:taskData second parameter

// console.log({ data: taskdata } ,"check deleteId")

const data = await axios.delete(`api/task?id=${taskId}`);

console.log(data, "data");  // delete method ku axios la request pannanum na eppadi thaa pass pannum but its not correct only way in pass params 
if(data.status === 200) {
getTask();
}
};

  return (
    <div>
    <div className="flex justify-between mb-5 mr-10">
      
      <div className="mb-5">Homepage</div>  {/* margin-bottom - 20 px */}
<button className="p-2 bg-green-400 m-2" onClick={handleCreate}>Create
</button>
    </div>

{ iscreateOpen && ( <div className="flex justify-end mb-5 mr-10">  
      <input className="border border-blue-500" 
      type="text"
      value={taskname} // default value aa set pannu ,Like usestate la intial aa enna pass pannirukom mo athu list aagum and edit functionality ku entha value method use aagum
      onChange={(e) => settaskname(e.target.value)}/>  {/* Input event action aa erutha onchange use pannurom like Text type pannurathu and click event aa erutha Onclick*/}
      <button className="p-2 bg-blue-400" onClick={handleSave}>
        save
      </button>

    </div>
  )}
      
      <table className="w-full">  {/* full width */}
        <thead className="p-3 border">  {/* padding for all side and apply to equvalent 0.75 rem or 12 px  */}
          <tr className="p-3 border">
{tableheading.map((item,index) => (
  <th className="p-3 border" key={index}>{item}</th> 
))}
            {/* <th className="p-3 border">s.no</th>  */}
    
          </tr>
        </thead>
        <tbody>
        

{loading ? (
  <tr><td colSpan={3} className="w-full text-center mt-3">Loading...</td></tr>

) : data.length !== 0 ? (
data.map((item,index) => (
  <tr className="p-3 border text-center" key={index}>
      <td className="p-3 border" >
      {index + 1}
    </td>

<td className="p-3 border" key={index}>
{item.task_name}
</td>

<td className="p-3 border">
              <button className="mr-4">Edit
              </button>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </td>
</tr>
))
):(
  <tr><td colSpan={3} className="w-full text-center mt-3">No Result found</td></tr>
)
}
            {/* <td className="p-3 border">
              1
            </td>
            <td className="p-3 border">Complete the task</td> */}
          
           
        </tbody>
      </table>
      </div>


  );
}
