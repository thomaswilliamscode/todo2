import { supabase } from '../supabase/supabase'
import { useContext } from 'react'
import { FolderContext } from '../../context/folderContext'

export async function getData (type, id) {
    const { getFolders, setGetFolders } = useContext(FolderContext)

    let query = supabase
        .from(type)
        .select('*')
        .order('position', {ascending: true})

        //if id exists add this 
    if (id !== undefined && id !== null) {
        query = query.eq('list_id', id)
    }

    const { data, error } = await query

    setGetFolders('got')
    
    if(error) throw error;

    return data;

}

export async function pushData(addData, table) {
    const { name, position } = addData

    let payload = {name, position }

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

export async function  maxPosition (table) {

    const query = supabase
        .from(table)
        .select('position')
        .order('position', {ascending: false})
        .limit(1)
        .single()

    const { data, error} = await query

    if(error) throw error

    return data;
}

