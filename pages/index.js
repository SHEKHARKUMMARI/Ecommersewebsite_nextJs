import Link from 'next/link'
import NavBar from '../components/Navbar';
import baseUrl from '../helpers/baseUrl';
const Home=({products})=>{
  const productlist=products.map(product=>{
    return(
      <div className="card" key={product._id}>
      <div className="card-image">
        <img src={product.mediaUrl} />
        <span className="card-title ">{product.name}</span>
      </div>
      <div className="card-content">
        <p>RS: {product.price}</p>
      </div>
      <div className="card-action">
        <Link href={'/product/[id]'} as={`/product/${product._id}`}><a>View product</a></Link>
      </div>
    </div>

    )
  })
  return (
    <div className="rootcard">
    {productlist}
    </div>
  )
}
/*export async function getStaticProps({context}){
  const res=await fetch('http://localhost:3000/api/products');
  const data=await res.json();
  return {
    props:{
      products:data
    }
  }
} */
export async function getStaticProps({context}){
  const res=await fetch(`${baseUrl}/api/products`);
  const data=await res.json();
  return {
    props:{
      products:data
    }
  }
}


export default Home