import "react-native-url-polyfill"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://yoyuxbgialomivgneypa.supabase.co"

const supabaseAnonKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlveXV4YmdpYWxvbWl2Z25leXBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE1MDA0OTQsImV4cCI6MjAzNzA3NjQ5NH0.vNupo3iKg5rOBgADYsLA_QimHo0dnmUPzC3W31-8oyU"


export const supabase = createClient(supabaseUrl,supabaseAnonKey,{
    auth:{
        storage:AsyncStorage,
        autoRefreshToken :true,
        persistSession:true,
        detectSessionInUrl:false

    },
})