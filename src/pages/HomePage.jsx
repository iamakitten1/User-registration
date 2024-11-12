// import React, { useState } from 'react';
// import DynamicForm from '../components/DynamicForm';

// const HomePage = () => {
//   const [role, setRole] = useState('admin');

//   return (
//     <div className="container mx-auto mt-8 p-4">
//       <h1 className="text-3xl mb-4">LOG IN</h1>
//       <div className="mb-4">
//         <label htmlFor="role-select" className="block mb-2">Select Role</label>
//         <select
//           id="role-select"
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           className="border p-2 w-full"
//         >
//           <option value="admin">Admin</option>
//           <option value="user">User</option>
//           <option value="courier">Courier</option>
//         </select>
//       </div>

//       <DynamicForm role={role} />
//     </div>
//   );
// };

// export default HomePage;
