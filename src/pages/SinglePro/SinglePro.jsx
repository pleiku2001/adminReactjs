import { Routes, Route, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import "./singlepro.scss";
function SinglePro() {
  let productId = useParams();
  console.log(productId);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      // let list = [];
      try {
        const docRef = doc(db, "products", productId?.productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          // hasData = docSnap.data() !== [] ? true : false;

          // let a = Object.values(docSnap.data());
          setData(docSnap.data());
          // console.log(a);
        } else {
          // doc.data() will be undefined in this case
          // console.log("No such document!");
        }
      } catch (err) {
        // console.log(err);
      }
    };
    fetchData();
  }, []);

  console.log(data.img);

  return (
    <div className="single">
      {/* <Sidebar /> */}
      <div className="singleContainer">
        {/* <Navbar /> */}
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img src={data.img} alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">{data.Title}</h1>
                <div className="detailItem">
                  <span className="itemKey">Category:</span>
                  <span className="itemValue">{data.Category}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">{data.Description}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <span className="itemValue">{data.Price}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Stock:</span>
                  <span className="itemValue">{data.Stock}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePro;
