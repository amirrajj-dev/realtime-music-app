import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { axiosInstance } from "../configs/axios";
import SyncIcon from '@mui/icons-material/Sync';
import {useNavigate} from 'react-router-dom'

interface AuthContextType {
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate()

  useEffect(() => {
    const getToken = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/auth/get-token");
        console.log(res);
        if (res.data.token) {
          axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
        } else {
          navigate('/signin', { replace: true }); // Redirect to signin page on token not found
        }
      } catch (error) {
        console.error("Error fetching token:", error);
        axiosInstance.defaults.headers.common["Authorization"] = "";
        navigate('/signin', { replace: true }); 
      } finally {
        setLoading(false);
      }
    };
    getToken();
  }, []);

  if (loading){
    return (
        <div className="flex items-center justify-center h-screen bg-black/90 text-emerald-600">
            <SyncIcon fontSize="large" className="animate-spin" />
        </div>
    )
  }

  return (
    <AuthContext.Provider value={{ isLoading: loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;