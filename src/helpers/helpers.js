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
    const {destination, source, draggableId, type} = result

    if(!destination) return 

    if (destination.index === source.index) return
    
    

    if (type === 'folder') {
        const data = [...getter]

        const [moved] = data.splice(source.index, 1)

        data.splice(destination.index, 0, moved)

        setter(data) 
        
        await updateTable(table, data)
    }

    if (type === "list") {
        // grab source info 
        console.log('source', source)
        console.log('dest', destination)
    }

    console.log('test')
    

    
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

