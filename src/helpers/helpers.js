import { supabase } from "../components/supabase/supabase";

import {getData,pushData, deleteItem, updateData} from '../db-logic/db-logic'



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

        const sourceFolder = source.droppableId.replace('lists-', '')
        const destFolder = destination.droppableId.replace('lists-', '')
        const destIndex = destination.index

        if (sourceFolder === destFolder) {
            //  copy
            const data = [...getter]

            // find lists not in folder
            const listsNotInFolder = data.filter( (listObj) => listObj.folder_id !== sourceFolder)

            // source folder lists
            const sourceLists = data.filter( (listObj) => listObj.folder_id === sourceFolder)

            // find dragged item
            const draggedList = sourceLists.find(list => list.id === draggableId)

            console.log('sourcecLists: ', sourceLists)
            // remove list from source folder
            const remainingLists = sourceLists.filter(
                list => list.id !== draggedList.id
            )
            console.log('draggedList: ', draggedList)
            console.log('remainingLists: ', remainingLists)


            // // update moved list
            // movedList.folder_id = destFolder

            // insert into new position
            remainingLists.splice(destIndex, 0, draggedList)

            // recalculate positions
            const updatedLists = remainingLists.map((list, index) => ({
                ...list,
                position: index
            }))

            console.log('listsNotInFolder: ', listsNotInFolder)
            console.log('updatedLists: ', updatedLists)

            // merge data
            const mergeData = [
                ...listsNotInFolder,
                ...updatedLists
            ]

            console.log('mergeData', mergeData)

            // update UI immediately
            setter(mergeData)

            // save localStorage
            localStorage.setItem(table, JSON.stringify(mergeData))

            // update DB positions
            await updateData(mergeData, table)
            } else {
                 //  copy
                const data = [...getter]

                // source folder lists
                const sourceLists = data.filter( (listObj) => listObj.folder_id === sourceFolder)

                //dest List
                const destLists = data.filter ( (listObj) => listObj.folderId === destFolder) 
                // find dragged item
                const draggedList = sourceLists.find(list => list.id === draggableId)

                console.log('sourcecLists: ', sourceLists)
                // remove list from source folder
                const remainingLists = sourceLists.filter(
                    list => list.id !== draggedList.id
                )
                console.log('draggedList: ', draggedList)
                console.log('remainingLists: ', remainingLists)


                // // update moved list
                // movedList.folder_id = destFolder

                // insert into new position
                remainingLists.splice(destIndex, 0, draggedList)

                // recalculate positions
                const updatedLists = remainingLists.map((list, index) => ({
                    ...list,
                    position: index
                }))

                console.log('listsNotInFolder: ', listsNotInFolder)
                console.log('updatedLists: ', updatedLists)

                // merge data
                const mergeData = [
                    ...listsNotInFolder,
                    ...updatedLists
                ]

                console.log('mergeData', mergeData)

                // update UI immediately
                setter(mergeData)

                // save localStorage
                localStorage.setItem(table, JSON.stringify(mergeData))

                // update DB positions
                await updateData(mergeData, table)
                }

        
    }
}


