// import mockAPI from "./api/mockapi";
// //import Table from "./components/Table";
// import { useState, useEffect } from "react";

// function Parent() {
//   //const [status, setStatus] = useState([]);

//   const apiGet = async () => {
//     console.log("Test");
//     try {
//       const response = await mockAPI.get(`/users/1/attendance`);
//       console.log(response.data);
//       //setStatus(response.data);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   useEffect(() => {
//     apiGet();
//   }, []);

//   return (
//     <div>
//       <h1>Parents Page</h1>
//       <button onClick={apiGet}>Refresh</button>
//       {/* {status && <Table list={status} />} */} */}
//       {/* <AddForm handlerAddItem={apiPost} /> */}
//     </div>
//   );
// }

// export default Parent;
