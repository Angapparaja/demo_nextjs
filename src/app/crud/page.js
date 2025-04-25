 
 "useclient"
 const crud = () =>{
    const arraylist =["sno","task","status"];
    console.log("arraydata" , arraylist[2]); //status

    const empdetails =[{empid:1,empname:"ram",empage:25},
        {empid:2,empname:"raja",empage:22}
    ]

    const bankdetails =["sno",{bankid:1,bankname:"john",empage:25},"task"]
    console.log("bankdetails" , bankdetails) // sno {bankid:1,bankname:"john",empage:25} task

    console.log("bankdetails1" , bankdetails[1]) // {bankid:1,bankname:"john",empage:25}

    console.log("bankdetails2" , bankdetails[1].bankid) // {bankid:1,bankname:"john",empage:25}

    console.log("empdetails" , empdetails[0]); //{empid: 1, empname: 'ram', empage: 25}

    console.log("empdetails3" ,empdetails[1].empage) //22
  
    return <div>
        <div>
            {arraylist.map((item,index) => (
              <h1 className="p-3" key={index}>{item}</h1> //sno task status
            ))}

            {/* {arraylist.map((item,index)=> (
                <h1 className="p-3" key={index}>{item[0]}</h1>  //s t s 
            ))} */}

            {/* {empdetails.map((item,index)=>(
                // <h1 className="p-3" key={index}>{item.empage}</h1> //25 22
                <h1 className="p-3" key={index}>{item}</h1> // error message throws because it is array of object
            ))} */}

                  {/* {empdetails.map((item,index)=>(
            
                <h1 className="p-3" key={index}>{empdetails[1].item.empname}</h1> // error message throws because it is array of object
            ))} */}


               {/* {empdetails.map((item,index)=>(
                <h1 className="p-3" key={index}>{item.empage}</h1> 
            ))} */}

          

                    </div>
    </div>
}

export default crud;