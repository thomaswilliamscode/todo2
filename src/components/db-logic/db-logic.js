import { supabase } from '../supabase/supabase'

export async function getData (type, id) {

    let query = supabase
        .from(type)
        .select('*')
        .order('position', {ascending: true})

        //if id exists add this 
    if (id !== undefined && id !== null) {
        query = query.eq('list_id', id)
    }

    const { data, error } = await query
    
    if(error) throw error;

    return data;

}

