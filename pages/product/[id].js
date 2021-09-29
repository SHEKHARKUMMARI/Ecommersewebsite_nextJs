import{useEffect, useRef} from 'react';

import { Mongoose } from 'mongoose';
import baseUrl from '../../helpers/baseUrl';
import { useRouter } from 'next/router';

const Product=({product})=>{
    const router=useRouter()
    const modalRef=useRef(null)
    useEffect(()=>{
        M.Modal.init(modalRef.current)
    },[])
    if(router.isFallback)
    {
        return <h1>Loading...</h1>
    }
    const getModal=()=>{
        return (
            <div id="modal1" className="modal" ref={modalRef}>
    <div className="modal-content">
      <h4>{product.name}</h4>
      <p>Are you sure you want to delete this</p>
    </div>
    <div className="modal-footer">
    <button className="btn waves-effect waves-light #2196f3 blue">Cancel
    </button>
    <button className="btn waves-effect waves-light #f44336 red" onClick={()=>deleteProduct()}>Yes
    </button>
    </div>
  </div>

        )

    }
    const deleteProduct = async ()=>{
        const res=await fetch(`${baseUrl}/api/product/${product._id}`,{method:"DELETE"})
        await res.json()
        router.push("/")
    }
    return (
        <div className="container center-align">
            <h3>{product.name}</h3>
            <img src={product.mediaUrl} style={{width:'30%'}}/>
            <h5>RS:{product.price}</h5>
            <input type="number"
              style={{width:'400px',margin:'10px'}}
              min="1"
              placeholder="quantity"
            />
            <button className="btn waves-effect waves-light #2196f3 blue">Add
             <i className="material-icons right">add</i>
            </button>

            <p className="left-align">{product.description}</p>
            <button  data-target="modal1" className="btn waves-effect waves-light #f44336 red btn modal-trigger">Delete
             <i className="material-icons left">delete</i>
            </button>
            {getModal()}
            
        </div>
    )
}
/*export async function getServerSideProps({params:{id}}) {
    const res=await fetch(`http://localhost:3000/api/product/${id}`);
    const data=await res.json();
    return {
      props: {product:data}, // will be passed to the page component as props
    }
  } */
  export async function getStaticProps({params:{id}}) {
    const res=await fetch(`${baseUrl}/api/product/${id}`);
    const data=await res.json();
    return {
      props: {product:data}, // will be passed to the page component as props
    }
  }
  export async function getStaticPaths() {
    const path=await fetch(`${baseUrl}/api/product`);
    console.log(path);
    return {
      paths: [
        { params: { id:"6152d255e0685aa696a92837" } } // See the "paths" section below
      ],
      fallback: true // See the "fallback" section below
    };
  }
  export default Product