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

    if (destination.droppableId === source.droppableId && destination.index === source.index) return
    
    // shallow copy data
    const data = [...getter]
    

    if (type === 'folder') {
        
        const [moved] = data.splice(source.index, 1)

        data.splice(destination.index, 0, moved)

        setter(data) 
        
        await updateData(data, table)
    }



    if (type === "list") {

        const sourceFolder = source.droppableId.replace('lists-', '')
        const destFolder = destination.droppableId.replace('lists-', '')
        const destIndex = destination.index
        

        if (sourceFolder === destFolder) {

            // find lists not in folder
            const listsNotInFolder = data.filter( (listObj) => listObj.folder_id !== sourceFolder)

            // source folder lists
            const sourceLists = data.filter( (listObj) => listObj.folder_id === sourceFolder)

            // find dragged item
            const draggedList = sourceLists.find(list => list.id === draggableId)

            // remove list from source folder
            const remainingLists = sourceLists.filter(
                list => list.id !== draggedList.id
            )

            // update moved list
            // movedList.folder_id = destFolder

            // insert into new position
            remainingLists.splice(destIndex, 0, draggedList)

            // recalculate positions
            const updatedLists = remainingLists.map((list, index) => ({
                ...list,
                position: index
            }))

            // merge data
            const mergeData = [
                ...listsNotInFolder,
                ...updatedLists
            ]

            // update UI immediately
            setter(mergeData)

            // save localStorage
            localStorage.setItem(table, JSON.stringify(mergeData))

            // update DB positions
            await updateData(mergeData, table)
            } else {

                // source folder lists
                const sourceLists = data.filter( (listObj) => listObj.folder_id === sourceFolder)

                //dest folder Lists
                const destLists = data.filter ( (listObj) => listObj.folder_id === destFolder) 

                //find rest of list data
                const rest = data.filter( (listObj) => listObj.folder_id !== sourceFolder && listObj.folder_id !== destFolder)
               
                // find dragged item
                const draggedList = sourceLists.find(list => list.id === draggableId)

                // console.log('sourcecLists: ', sourceLists)
                // remove list from source folder
                const remainingLists = sourceLists.filter(
                    list => list.id !== draggedList.id
                )
                // console.log('draggedList: ', draggedList)
                // console.log('remainingLists: ', remainingLists)


                // update dragged list
                const movedList = {
                    ...draggedList,
                    folder_id: destFolder
                }

                // insert into dest Folder 
                const newDestLists = [...destLists]
                newDestLists.splice(destIndex, 0, movedList)

                // recalculate positions on source folder
                const updatedSource = remainingLists.map((list, index) => ({
                    ...list,
                    position: index
                }))

                // recalculate positions on dest folder
                const updatedDest = newDestLists.map((list, index) => ({
                    ...list,
                    position: index
                }))

                // console.log('listsNotInFolder: ', listsNotInFolder)
                // console.log('updatedLists: ', updatedLists)

                // merge data
                const mergeData = [
                    ...rest,
                    ...updatedSource,
                    ...updatedDest
                ]

                setter(mergeData)

                // update UI immediately
                // setter(mergeData)

                // save localStorage
                localStorage.setItem(table, JSON.stringify(mergeData))

                // update DB positions
                await updateData(mergeData, table)
                }

        
    }

    if (type === 'todo') {
        // source List
        const sourceList = source.droppableId.replace('todos-', '')
        // destList
        const destList = source.droppableId.replace('todos-', '')
        //dest Index
        const destIndex = destination.index
        // find todo 
        const dragged = data.find( (todoObj) => todoObj.id === draggableId)
        console.log(dragged)
        
        // if list is same 
        if (sourceList === destList) {
            //remove dragged from source list
            const newListTodos = data.filter( (todoObj) => todoObj !== dragged )
            //fix position on each todo
            newListTodos.map( (todoObj, index) => {
                todoObj.postion = index;
                return todoObj;
            })
            //add dragged to correct index
            newListTodos.splice(destIndex, 0, dragged)

            //fix position on each todo
            newListTodos.map( (todoObj, index) => {
                todoObj.position = index;
                return todoObj;
            })
            // update ui
            setter(newListTodos)

            // update supabase
            await updateData(newListTodos, table)
        }
    }
}


