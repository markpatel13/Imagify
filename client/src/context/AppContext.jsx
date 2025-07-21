import {createContext, useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import axios from 'axios'

const AppContext = createContext();

const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [token,setToken] = useState(localStorage.getItem('token'))

    const[credit,setCredit] = useState(false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const loadCreditsData = async ()=>{
        try{
            const{data} = await axios.get(backendUrl + '/api/user/credits',{headers:{token}})

            if(data.success){
                setCredit(data.credits)
                setUser(data.user)
            }
        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }

    const logout = ()=>{
        localStorage.removeItem('token');
        setToken('')
        setUser(null)
    }

    useEffect(()=>{
        if(token){
            loadCreditsData()
        }
    },[token])


    const value = {
        user, setUser, showLogin, setShowLogin,backendUrl,token,setToken,credit,setCredit,loadCreditsData,logout
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export { AppContext };
export default AppContextProvider;
// import { createContext, useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import axios from 'axios';

// const AppContext = createContext();

// const AppContextProvider = (props) => {
//   const [user, setUser] = useState(null);
//   const [showLogin, setShowLogin] = useState(false);
//   const [token, setToken] = useState('');
//   const [credit, setCredit] = useState(false);

//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   const loadCreditsData = async () => {
//     try {
//       const storedToken = localStorage.getItem('token');
//       if (!storedToken) return;

//       console.log('Calling backend with token:', storedToken);

//       const { data } = await axios.get(backendUrl + '/api/user/credits', {
//         headers: { token: storedToken },
//       });

//       console.log('Response:', data);

//       if (data.success) {
//         setCredit(data.credits);
//         setUser(data.user);
//       } else {
//         console.log('API responded with success = false');
//       }
//     } catch (error) {
//       console.log('Error fetching credits:', error);
//       toast.error(error.message);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setToken('');
//     setUser(null);
//     setCredit(false);
//   };

//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     if (storedToken) {
//       setToken(storedToken);
//     }
//   }, []);

//   useEffect(() => {
//     if (token) {
//       loadCreditsData();
//     }
//   }, [token]);

//   const value = {
//     user,
//     setUser,
//     showLogin,
//     setShowLogin,
//     backendUrl,
//     token,
//     setToken,
//     credit,
//     setCredit,
//     loadCreditsData,
//     logout,
//   };

//   return (
//     <AppContext.Provider value={value}>
//       {props.children}
//     </AppContext.Provider>
//   );
// };

// export { AppContext };
// export default AppContextProvider;
