
// import React, { createContext, useContext, useState } from 'react';
// import  auth  from '../../firebase'; 
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);

//     const signUp = async (email, password) => {
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//         setUser(userCredential.user);
//     };

//     const signIn = async (email, password) => {
//         const userCredential = await signInWithEmailAndPassword(auth, email, password);
//         setUser(userCredential.user);
//     };

//     return (
//         <AuthContext.Provider value={{ user, signUp, signIn }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);
