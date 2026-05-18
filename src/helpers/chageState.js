// export async function hydrateState(
//     key,
//     fetcher,
//     setter
// ) {

//     const local = localStorage.getItem(key)

//     if (local) {
//         setter(JSON.parse(local))
//         return
//     }

//     const data = await fetcher()

//     setter(data)

//     localStorage.setItem(
//         key,
//         JSON.stringify(data)
//     )
// }

// useEffect(() => {
//     hydrateState(
//         'folders',
//         () => getData('folders'),
//         setFolders
//     )
// }, [])