import { pushData, getData } from '../db-logic/db-logic'

export async function formSubmit(e) {
    e.preventDefault()
    const name = e.target[0].value.trim()
    if (!name) return

    try {
        let maxPos = 0
        try {
            const existing = await getData('folders')
            if (existing && existing.length > 0) {
                maxPos = Math.max(...existing.map(f => f.position ?? 0))
            }
        } catch (_) {}

        await pushData({ name, position: maxPos + 1 }, 'folders')
        e.target.reset()
    } catch (err) {
        console.error(err)
    }
}


export { formSubmit }