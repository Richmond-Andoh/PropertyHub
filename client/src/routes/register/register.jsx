import "./register.scss";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {

  const handleSubmit = async(e) => {
    const formData =  new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

      try {
        const res = await axios.post("http://localhost:8700/api/auth/register", {
          username, email, password
        })

        console.log(res.data);
        
      } catch (error) {
        console.log(error.message);
        
      }
  }
  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button >Register</button>
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
