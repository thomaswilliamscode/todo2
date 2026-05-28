import { supabase } from '../components/supabase/supabase'

export async function getData (type, id) {

    let query = supabase
        .from(type)
        .select('*')
        .order('position', {ascending: true})

        //if id exists add this 
    if (id !== undefined && id !== null && type === 'folders') {
        query = query.eq('id', id)
    }
    if (id !== undefined && id !== null && type === 'lists') {
        query = query.eq('folder_id', id)
    }
    if (id !== undefined && id !== null && type === 'todos') {
        query = query.eq('list_id', id)
    }

    const { data, error } = await query

    
    if(error) throw error;

    return data;

}

export async function pushData(addData, table) {
    const { name, position } = addData

    let payload = {name, position: position ?? 0 }

    if (addData?.folder_id) {
        payload.folder_id = addData.folder_id
    }

    if(addData?.list_id) {
        payload.list_id = addData.list_id
    }

    let query = supabase
        .from(table)
        .insert([payload])

    const { data, error } = await query

    if (error) throw error;


}

export async function updateData (updates, table) {
    await Promise.all(
        updates.map( (itemObj) => {
            const { position, id} = itemObj
            const payload = {
                position,
            }

            if (itemObj?.folder_id) {
                payload.folder_id = itemObj.folder_id
            }

            if(itemObj?.list_id) {
                payload.list_id = itemObj.list_id
            }

            return supabase
                .from(table)
                .update(payload)
                .eq('id', id)
        })
    )
}

export async function  maxPosition (table, id) {
    let column = null;
    
    if (table === 'lists') {
        column = 'folder_id'
    }
    if (table === 'todos') {
        column = 'list_id'
    }

    let query = supabase
        .from(table)
        .select('position')
        .order('position', {ascending: false})
        .limit(1)
        .maybeSingle()

        if (column && id) {
            query = query.eq(column, id)
        }

    const { data, error} = await query

    if(error) throw error

    return data;
}

export async function deleteItem(table, id) {
    const query = supabase
        .from(table)
        .delete()
        .eq('id', id)

    const { data, error } = await query

    if(error) throw error

    return data;
}

