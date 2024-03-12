import './App.css'
import Swal from 'sweetalert2'


function App() {
  const handleCreateUser = (event) => {
    event.preventDefault()
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const newUser = { name, email }
    //POST REQUEST
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "User has been saved",
            showConfirmButton: false,
            timer: 1500
          });
          form.reset()
        }
        else{
          console.log('Error in POST')
        }
      })
  }
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex flex-col">
          <div className="text-center lg:text-left">
            <h2 className='font-bold text-3xl underline '>User Database</h2>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleCreateUser} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" name='name' placeholder="Name" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Create User</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
