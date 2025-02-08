import React, { createContext, useEffect, useState, ReactNode, useCallback } from "react";
import { axiosInstance } from "../configs/axios";
import SyncIcon from '@mui/icons-material/Sync';
import { useNavigate } from 'react-router-dom';
import { useChatStore } from "../store/useChat";
import { useAuthStore } from "../store/useAuth";

interface AuthContextType {
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const initSocket = useChatStore((state) => state.initSocket);
  const disconnectSocket = useChatStore((state) => state.disconnectSocket);
  

  const user = useAuthStore((state) => state.user);

  const getToken = useCallback(async () => {
    if (!user || !user.id) return;

    try {
      setLoading(true);
      const res = await axiosInstance.get("/auth/get-token", { withCredentials: true });

      if (res.data.token) {
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
        initSocket(String(user.id)); 
      } else {
        navigate('/signin', { replace: true });
      }
    } catch (error) {
      console.error("Error fetching token:", error);
      axiosInstance.defaults.headers.common["Authorization"] = "";
      navigate('/signin', { replace: true });
    } finally {
      setLoading(false);
    }
  }, [user?.id, initSocket, navigate]);

  useEffect(() => {
    getToken(); 

    return () => disconnectSocket();
  }, [getToken, disconnectSocket]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black/90 text-emerald-600">
        <SyncIcon fontSize="large" className="animate-spin" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isLoading: loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;