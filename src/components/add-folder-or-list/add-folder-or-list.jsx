import { pushData, maxPosition } from '../db-logic/db-logic'
import {useState} from 'react'

export default function Add () {
    const [ input, setInput ] = useState('')
    const [ type, setType ] = useState('folders')
    const [ pos, setPos ] = useState(0)

    const inputChange = (data) => {
        setInput(data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let newPos = await maxPosition(type)
        console.log(newPos)

        pushData(input, type)

        setInput('')

    }
    const optionChange = (value) => {
        setType(value)
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                < input 
                type='text' 
                name='name' 
                value={input}
                onChange={(e)=> inputChange(e.target.value)}
                />
                <select id='type'
                    value={type}
                    onChange = { (e) => optionChange(e.target.value)}>
                    <option value='folders'>Folder</option>
                    <option value='lists'>List</option>
                    <option value='todos'>Todo</option>
                </select>
                
                < input type='submit' value='Submit'/>
            </form>
        </>
    )
}