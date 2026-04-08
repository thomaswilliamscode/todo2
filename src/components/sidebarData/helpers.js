import { supabase } from '../supabase/supabase'

export async function getFolders () {
    const { data, error } = await supabase
        .from('Folders')
        .select('*')
    
    if(data){
        console.log(data)
        return data
    } else {
        console.log(error)
        return error
    }

}

