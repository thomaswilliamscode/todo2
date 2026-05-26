import { supabase } from "../components/supabase/supabase";



export function capital(string) {
    // turn string into array 
    let seperate = string.split(' ').filter(Boolean)

    // capitalize first letter of each word 
    let newArray = []
    for (let word of seperate) {
        let first = word[0];
        let cap = first.toUpperCase()

        // slice back together
        let newString = cap + word.slice(1)
        newArray.push(newString)
    }
    // turn array into string 
    let joined = newArray.join(' ')
    
    
    // return new string 
    return joined
}

export async function handleDragEnd( result, table, getter, setter ) {
    console.log(getter)
    const {destination, source} = result

    if(!destination) return 

    if (destination.index === source.index) return

    const updated = [...getter]

    const [moved] = updated.splice(source.index, 1)

    updated.splice(destination.index, 0, moved)

    setter(updated) 
    
    await updateTable(table, updated)

    
    return true
}

export async function updateTable(table, getter) {
    const updates = getter.map( ( item, index,) => ({
        id: item.id,
        position: index,
    }))


    await Promise.all(
        updates.map( (item) => {
            return supabase
                .from(table)
                .update({position: item.position})
                .eq('id', item.id)
        })
    )
}

