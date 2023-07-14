import Icongenerate from "@/components/parts/Avater";
import { supabase } from "@/utils/supabaseClient";
import { createContext, useContext, useEffect, useState } from "react";
interface AuthContextProps {
  username: string;
  team: string;
  icon: string;
}
export const AuthContext = createContext({
  username: "",
  team: "",
  icon: "",
});

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setcurrentUser] = useState<AuthContextProps>({
    username: "",
    team: "",
    icon: "",
});
  const getCurrentUser = async () => {
    // ログインのセッションを取得する処理
    try{
      const { data } = await supabase.auth.getSession()
      console.log(data);
      const Icon =  Icongenerate(data.session!.refresh_token)
            // セッションがあるときだけ現在ログインしているユーザーを取得する
    if (data.session !== null) {
      // supabaseに用意されている現在ログインしているユーザーを取得する関数
      const { data }:any = await supabase.auth.getUser()
      console.log(data);
      // currentUserにユーザーのメールアドレスを格納
      setcurrentUser({
         username:data.user.user_metadata.username,
         team:data.user.user_metadata.team,
         icon:Icon
      })
    }
    }catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
    getCurrentUser()
  },[])
  return (
    <AuthContext.Provider value={currentUser}>
      {children}
    </AuthContext.Provider>
  );
};
