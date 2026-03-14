import Box from "@mui/material/Box";
import { useAuthStore } from "../src/store/useAuthStore";
import { Navigate } from "react-router-dom";


export default function ProtectedRouter({children}) {

  
    console.log("ProtectedRouter");
    const token = useAuthStore((state)=>state.token);
    if(!token){
        return <Navigate to='/login' />
    }
    return children;
}
