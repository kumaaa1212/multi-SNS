import { supabase } from "../supabaseClient";

export const unFollowUser = async (follow:any[],authorId: string) => {
  const newFollowItem = follow.filter((item: any) => item.authorId !== authorId);

  await supabase.auth.updateUser({
    data: {
      follow: newFollowItem,
    },
  });
}