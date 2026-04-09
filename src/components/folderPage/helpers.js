import { supabase } from '../supabase/supabase'

export async function getListAndTodos () {
    const { data, error } = await supabase
        .from('lists')
        .select('*')
        .order('position', {ascending: true});
    
    if(error) throw error;


    return data;
}