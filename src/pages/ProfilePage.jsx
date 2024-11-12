// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import Navbar from '../components/NavBar';

// const ProfilePage = () => {
//   const location = useLocation();

//   const {
//     firstName,
//     lastName,
//     pid,
//     phoneNumber,
//     email,
//     profileImage,
//     role,
//     location: userLocation,
//     vehicle,
//     workingDays,
//   } = location.state || {};

//   const [image, setImage] = useState(null);

//   useEffect(() => {
//     const savedImage = localStorage.getItem('profileImage');
//     if (savedImage) {
//       setImage(savedImage);
//     } else if (profileImage) {
//       setImage(profileImage);
//     }
//   }, [profileImage]);

//   const handleFileChange = (event) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImage(reader.result);
//         localStorage.setItem('profileImage', reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div>
//       <Navbar role={role} />
//       <div className="p-4 flex flex-col items-center">
//         <img
//           src={image ? image : 'path/to/default/image.png'}
//           alt="Profile Image"
//           className="w-48 h-48 rounded-full"
//         />
//         <button
//           className="mt-2 p-2 bg-blue-500 text-white"
//           onClick={() => document.getElementById('fileInput').click()}
//         >
//           Upload Image
//         </button>
//         <input
//           id="fileInput"
//           type="file"
//           accept="image/*"
//           hidden
//           onChange={handleFileChange}
//         />
//         <h2 className="mt-2 text-xl">{`${firstName || ''} ${lastName || ''}`}</h2>
//         <p>PID: {pid || 'Not provided'}</p>
//         <p>Phone: {phoneNumber || 'Not provided'}</p>
//         <p>Email: {email || 'Not provided'}</p>

//         {role === 'user' && userLocation && (
//           <div>
//             <h3>Address:</h3>
//             <p>City: {userLocation.city}</p>
//             <p>Street: {userLocation.street}</p>
//           </div>
//         )}

//         {role === 'courier' && workingDays && (
//           <div>
//             <h3>Vehicle: {vehicle || 'Not provided'}</h3>
//             <h3>Working Days:</h3>
//             {workingDays.length > 0 ? (
//               workingDays.map(({ index, day, startHours, endHours }) => (
//                 <div key={index}>
//                   <p>{day}: {startHours} - {endHours}</p>
//                 </div>
//               ))
//             ) : (
//               <p>No working days available.</p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;
