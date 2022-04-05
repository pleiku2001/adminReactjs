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
import "./single.scss";
function Single() {
  let userId = useParams();
  console.log(userId);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      // let list = [];
      try {
        const docRef = doc(db, "users", userId?.userId);
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
                <h1 className="itemTitle">{data.Username}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{data.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{data.Phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">{data.Address}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">{data.Country}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Single;
