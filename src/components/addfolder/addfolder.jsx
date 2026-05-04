import { formSubmit } from './helpers'

export default function AddFolder() {

  function formSubmit(e) {
    e.preventDefault()
  }
    return (
        <div>
            <form onSubmit={(e) => formSubmit}>
                <input type='text' placeholder='Folder Name'/>
                <input type='submit' value='Submit'/>
            </form>
        </div>
    )
}