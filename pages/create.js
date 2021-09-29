import Link from 'next/link'
import baseUrl from '../helpers/baseUrl';
import {useState} from 'react'
const Create=()=>{
  const [name,setName]=useState("");  
  const [price,setPrice]=useState("");
  const [media,setMedia]=useState("");
  const [description,setDescription]=useState("");
  const handleSubmit= async (e)=>{
    e.preventDefault()
    const mediaUrl = await imageUpload()
    const res = await fetch(`${baseUrl}/api/products`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        name,
        price,
        mediaUrl,
        description
      })
    })
    const res2 = await res.json()
    if(res2.error){
      M.toast({html: res2.error,classes:"red"})

    }else{
      M.toast({html:"product saved",classes:"green"})
    }
  }
  const imageUpload=async ()=>{
      const data=new FormData()
      data.append('file',media)
      data.append('upload_preset',"mystore")
      data.append('cloud_name',"dddjtwkgg")
      const res =  await fetch("https://api.cloudinary.com/v1_1/dddjtwkgg/image/upload",{
        method:"POST",
        body:data
      })
      const res2=await res.json()
      return res2.url
  }
  return (
      <form className="container" onSubmit={(e)=>handleSubmit(e)}>
        <input type="text" name="name" placeholder="name" 
         value={name}
         onChange={
           (e)=>{
             setName(e.target.value)
           }
         }
         />
         <input type="text" name="price" placeholder="price" 
         value={price}
         onChange={
           (e)=>{
             setPrice(e.target.value)
           }
         }
         />
           <div className="file-field input-field">
                 <div className="btn">
                   <span>File</span>
                  <input type="file"
                    accept="image/*"
                    onChange={(e)=>{
                      setMedia(e.target.files[0])
                    }}
                    />
                </div>
             <div className="file-path-wrapper">
               <input className="file-path validate" type="text" />
             </div>
           </div>
           <img className="responsive-img" src={media?URL.createObjectURL(media):""} />
           <textarea name="description"  className="materialize-textarea" 
              value={description}
              onChange={(e)=>{
                setDescription(e.target.value)
              }}
              placeholder="description"
            />
      
           <button className="btn waves-effect waves-light" type="submit" >Submit
            <i className="material-icons right">send</i>
           </button>
        


      </form>
    )
  }
  export default Create