

export default function AddFolder() {
  function formSubmit (e) {
    e.preventDefault()
    console.log('we loggin bruh')
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