import React from 'react'
import "./new.scss"
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  serverTimestamp,
  setDoc,
  doc,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const New = ({ inputs, title }) => {
    const [file, setFile] = useState("");
    const [data, setData] = useState({});
    const [percent, setPercent] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
      const uploadFile = () => {
        const imgName = new Date().getTime() + file.name;
        // console.log(imgName)
  
        const storageRef = ref(storage, imgName);
  
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            setPercent(progress);
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
  
              default:
            }
          },
          (error) => {
            console.log(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              // console.log("File available at", downloadURL);
              setData((e) => ({ ...e, img: downloadURL }));
            });
          }
        );
      };
      file && uploadFile();
    }, [file]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // console.log("submit");
      try {
        const res = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        )
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
  
        // console.log(res.user)
        if (title === "Add New User") {
          const docRef = await addDoc(collection(db, "users"), {
            ...data,
            TimeStamp: serverTimestamp(),
          });
          // console.log("Document written with ID: ", docRef.id);
          // navigate("/users")
        } else {
          const docRef = await addDoc(collection(db, "products"), {
            ...data,
            TimeStamp: serverTimestamp(),
          });
  
          // console.log("Document written with ID: ", docRef.id);
          // navigate("/products")
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      if (title === "Add New User") {
        navigate("/users");
      } else {
        navigate("/products");
      }
    };
    const handleInput = (e) => {
      const id = e.target.id;
      const value = e.target.value;
  
      setData({ ...data, [id]: value });
    };
    // console.log(data);
    return (
      <div className="new">
        {/* <Sidebar /> */}
        <div className="newContainer">
          {/* <Navbar /> */}
          <div className="top">
            <h1>{title}</h1>
          </div>
          <div className="bottom">
            <div className="left">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
              />
            </div>
            <div className="right">
              <form onSubmit={handleSubmit}>
                <div className="formInput">
                  <label htmlFor="file">
                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </div>
  
                {inputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input
                      type={input.type}
                      placeholder={input.placeholder}
                      onChange={handleInput}
                      id={input.id}
                    />
                  </div>
                ))}
                <button disabled={percent !== null && percent < 100}>Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default New;
  