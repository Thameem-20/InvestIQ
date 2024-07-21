import { useUserStore } from '@/store/useUserStore';
import { supabase } from '../lib/supabase'


export default function useSupabaseAuth() {
  const { setUser , setSession , session} = useUserStore();

  async function signInWithEmail(email:string ,password:string) {
    const { error,data } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return{
        error,
        data
    }
  }

async function signUpWithEmail(email:string ,password:string) {
    const { error,data } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return{
        error,
        data
    }
  }

  async function signOut(){
    const { error } = await supabase.auth.signOut();

    if(!error){
        setUser(null);
        setSession(null);
    }
    return{
        error
    }
  }

  async function getUserProfile(){
    if (!session?.user) throw new Error("no user on the sesssion!")
        const { data ,error ,status } = await supabase
    .from("profiles")
    .select(`username,fullname,avatar_url,website`)
    .eq("id",session?.user.id)
    .single();
    return{
        data ,error ,status
    }
  }

  async function updateUserProfile(
    username:string,
    fullname:string,
    avatar_url:string,
    website:string
    ){
        if (!session?.user) throw new Error("no user on the sesssion!")
            const { error } = await supabase
        .from("profiles")
        .update({
            username,
            fullname,
            avatar_url,
            website,
            })
            .eq("id",session?.user.id)
            return{
                error
                }
    }
    return{
        signInWithEmail,
        signUpWithEmail,
        signOut,
        getUserProfile,
        updateUserProfile
    }
}