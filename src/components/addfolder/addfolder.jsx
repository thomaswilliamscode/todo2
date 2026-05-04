import { formSubmit } from './helpers'

export default function AddFolder() {

  function formSubmit(e) {
    e.preventDefault()
    console.log('tessssssssssssst')
  }
    return (
        <div>
            <form onSubmit={formSubmit}>
                <input type='text' placeholder='Folder Name'/>
                <input type='submit' value='Submit'/>
            </form>
        </div>
    )
}