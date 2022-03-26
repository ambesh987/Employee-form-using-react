import React, { useState, useEffect } from "react";
import './Form.css'
const Forms = () => {
    
    const [formData,setFormData]=React.useState({
        name:"",
        age:"",
        address:"",
        department:"",
        salary:"",
        isMarried:false,

    });

    const handleChange=(e)=>{
        const {id,value,checked,type}=e.target;
        setFormData({
            ...formData,
            [id]:type==="checkbox"? checked:value,
        })
    }
    const {name,age,address,department,salary,isMarried} = formData;

    // const handleSubmit=(e)=>{
    //     e.preventDefault();
    //     console.log(formData);
    // }
    const [allArray, setAllArray] = React.useState([]);
    const [fetchData, setFetchData] = React.useState(false);

     useEffect(() => {
        fetch(`http://localhost:3001/Employee`)
        .then((res) => res.json())
        .then((res) => setAllArray(res)) 
        .then(() => {
          setFetchData(false);
        })
    }, [fetchData])
    
    
    
      let handleSubmitdata = (e) => {
        e.preventDefault();
        // console.log(formData);
        let payloadjson = JSON.stringify(formData);
        fetch(`http://localhost:3001/Employee`, {
          method: "POST",
          body: payloadjson,
          headers : {
            "content-type" : "application/json"
          }
        })
        .then(() => {
          setFetchData(true)
        })
    
        
      }

      let showData = allArray.map((e) => {
        const {name, age, address, department,salary,isMarried} = e;
        return (
          <div className="dataContainer" key={e.id}>
            <div className="row">
              <div>Name:{" "+name +" "}</div>
            </div>
    
            <div className="row">
              <div>Age : {" "+age}</div>
              
            </div>
    
            <div className="row">
              <div>Address : {" "+address}</div>
              
            </div>
            
            <div className="row">
              <div>Department : {" "+department == "" ? "Not selected" : department}</div>
             
            </div>

           
    
           
    
            <div className="row">
              <div>Salary : {" "+salary}</div>
              
            </div>
    
            <div className="row">
              <div>Maritial Status : {" "+isMarried ? "Married" : "Unmarried"}</div>
             
            </div>
    
    
    
          </div>
        )
      })
    
  return (
    <>
      <form onSubmit={handleSubmitdata}>
      <h1>Forms</h1>
      <input id='name' type="text" onChange={ handleChange} placeholder='Enter your username...' value={name} /> <br /> <br />
      <input id='age'    type="number" onChange={ handleChange } placeholder='Enter your age...' value={age} /> <br /> <br />
      <input  id='address'  type="text" onChange={ handleChange } placeholder='Enter your address...' value={address} /> <br /> <br />
      <label>
          Department: &nbsp;
          <select onChange={handleChange} id='department' value={department}>
              <option value="">Select</option>
              <option value="IT">IT</option>
              <option value="SALES">SALES</option>
              <option value="MARKETING">MARKETING</option>

          </select>
      </label> <br /> <br />
      <input  id='salary'  type="number" onChange={ handleChange } placeholder='Enter your salary...' value={salary} /> <br /> <br />
      <label > Are you Married? :
      <input  id='isMarried'  type="checkbox" onChange={ handleChange } checked={isMarried}/> <br />
      </label> <br />
      <button type='submit'>SUBMIT</button>
      </form>
       <div>{showData}</div>
      </>
    
  )
}

export default Forms;