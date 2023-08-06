import { useSelector } from "react-redux";
import { supabase } from "../supabaseClient";
import { RootState } from "@/store/store";


export const followUser = async (follow:any[],authorId: string, authorName: string, authorAvatar: string) => {

  const newFollowItem = {
    authorId: authorId,
    username: authorName,
    icon: authorAvatar,
  };

  const updatedFollow = [...follow, newFollowItem];

  await supabase.auth.updateUser({
    data: {
      follow: updatedFollow,
    },
  });
}