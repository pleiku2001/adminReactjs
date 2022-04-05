import { useEffect, useState } from "react";
import "./products.scss"
import { DataGrid } from "@mui/x-data-grid";
import { productsColumns, userRows } from "../../datatablesource";
import {db} from "../../firebase"
import { Link,useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
function Products() {
  const [data, setData] = useState([]);
  const navigate = useNavigate()
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

const handleDelete = async (id) => {
  try {
    await deleteDoc(doc(db, "products", id));
    setData(data.filter((item) => item.id !== id));
  } catch (err) {
    console.log(err);
  }
};
const handleView = async (id) => {
  try {
    await doc(db, "products", id);
    //   setData(data.filter((item) => item.id !== id));
      navigate(`/products/${id}`)
    console.log(id);
  } catch (err) {
    console.log(err);
  }
};

const actionColumn = [
  {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      // console.log(params);
      return (
        <div className="cellAction">
          {/* <Link to="/users/test" style={{ textDecoration: "none" }} >
            <div className="viewButton">View</div>
          </Link> */}
          <div
            className="deleteButton"
            onClick={() => handleView(params.row.id)}
          >
            View
          </div>
          <div
            className="deleteButton"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </div>
        </div>
      );
    },
  },
];
return (
  <div className="datatable">
    <div className="datatableTitle">
      Add New Product
      <Link to="/products/new" className="link">
        Add New
      </Link>
    </div>
    <DataGrid
      className="datagrid"
      rows={data}
      columns={productsColumns.concat(actionColumn)}
      pageSize={9}
      rowsPerPageOptions={[9]}
      checkboxSelection
    />
  </div>
);
};


export default Products