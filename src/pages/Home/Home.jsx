import React from "react";
import "./home.scss";

import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
function Home() {
  const [data, setData] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
        // console.log(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setDataUser(list);
        // console.log(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  // console.log(data);

  return (
    <div className="home">
      <div className="right">
        <h2>Newly Added Products</h2>
        <div className="table">
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Description</th>
            </tr>

            {data.map((e) => {
              return (
                <tr>
                  <td>
                    <img src={e.img} alt="" />
                  </td>
                  <td>{e.Title}</td>
                  <td>{e.Category}</td>
                  <td>{e.Price}</td>
                  <td>{e.Stock}</td>
                  <td>{e.Description}</td>
                </tr>
              );
            })}
          </table>
        </div>
        <Link to={"/products"} className="link">
          <button>View ALl</button>
        </Link>
      </div>
      <div className="left">
        <h2>Newly Added Users</h2>
        <div className="table">
          <table>
            <tr>
              <th>Image</th>
              <th>Username</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Country</th>
              <th>Email</th>
            </tr>

            {dataUser.map((e) => {
              return (
                <tr>
                  <td>
                    <img src={e.img} alt="" />
                  </td>
                  <td>{e.Username}</td>
                  <td>{e.Address}</td>
                  <td>{e.Phone}</td>
                  <td>{e.Country}</td>
                  <td>{e.email}</td>
                </tr>
              );
            })}
          </table>
        </div>
        <Link to={"/users"} className="link">
          <button>View ALl</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
