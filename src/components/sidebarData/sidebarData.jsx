import { supabase } from '../supabase/supabase'
import { useState, useEffect } from 'react'
import { getFolders } from './helpers'

export default function SidebarData () {
    const [] = useState()
    useEffect( () => {
        getFolders()
    }, [])
    
    return (
        <>
            <div>SidebarData</div>
        </>
    )
}