import React, { use } from "react";
 function Usercards() {
   const[user,setuser] = React.useState([])

   useEffect(()=>{
    fetchdata()
   },[])

   const fetchdata = async () => {
    try {
        const res = await fetch("https://fakestoreapi.com/products")
        const data = await res.json()
        setuser(data)
    } catch (error) {
        console.log(error)
    }
   }



function Cards() {
  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <img src="https://via.placeholder.com/150" className="card-img-top" alt="..." />

        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title.
          </p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </div>
  );
}

export default Cards;
