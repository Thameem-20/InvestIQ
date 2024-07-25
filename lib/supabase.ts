import "react-native-url-polyfill"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://mtjzxkwwdzqlnakstjws.supabase.co"

const supabaseAnonKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10anp4a3d3ZHpxbG5ha3N0andzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE5MjI4ODksImV4cCI6MjAzNzQ5ODg4OX0.ykHLHCmolgQHYQuAAc5-JPTmItjWTGEX100B4iFbhlc"


export const supabase = createClient(supabaseUrl,supabaseAnonKey,{
    auth:{
        storage:AsyncStorage,
        autoRefreshToken :true,
        persistSession:true,
        detectSessionInUrl:false

    },
})

