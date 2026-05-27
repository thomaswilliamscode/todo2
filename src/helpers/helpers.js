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
    console.log('getter', getter)

    if(!destination) return 

    if (destination.index === source.index) return
    
    

    if (type === 'folder') {
        const data = [...getter]

        const [moved] = data.splice(source.index, 1)

        data.splice(destination.index, 0, moved)

        setter(data) 
        
        await updateTable(table, data)
    }
    console.log(getter)


    if (type === "list") {
        // grab info 
        const sourceFolder = source.droppableId.replace('lists-', '')
        const destFolder = destination.droppableId.replace('lists-', '')
        const destIndex = destination.index
        const sourceIndex = source.index

        console.log('source', source)
        console.log('dest', destination)
        console.log(draggableId)

        // copy data
        const data = [...getter]
        console.log(data, 'data')

        // remove list from folder
        const oldFiltered = data.filter( (listObj) => listObj.id !== draggableId)
        console.log('filtered', oldFiltered)

        //reorder list positions inside folder
        let oldFilteredPos = oldFiltered.map( (listObj, index) => {
            listObj.position = index
            return listObj
        })
        console.log('filteredPos', oldFilteredPos)
        // create oldList obj
        let newList = data.find( (listObj) => listObj.id === draggableId)

        // add list to new folder
        newList.folder_id = destFolder
        console.log('source', source)
        console.log('destination', destination)

        // set new position 
        newList.position = destIndex

        // splice newList into oldFiltered array
        oldFiltered.splice(destIndex, 0, newList)
        console.log('oldFilteredNew ', oldFiltered)

        // update list info in table
    }

    

    
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

