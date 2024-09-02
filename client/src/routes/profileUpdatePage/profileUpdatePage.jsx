import { Link } from "react-router-dom";
import "./profileUpdatePage.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

function ProfileUpdatePage() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [ error, setError ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);

    try {
      const res = apiRequest.put(`/users/update/${currentUser.id}`, {
        username,
        email,
        password
      })

      updateUser(res.data);
    } catch (error) {
      console.log(error)
      setError(error.response.data.message);
    }
  }
  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
            <h1>Update Profile</h1>
         
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
          { error && <span>{error} </span>}
        </form>
      </div>
      <div className="sideContainer">
        <img src={ currentUser.avatar || "/noavatar.jpeg"} alt="" className="avatar" />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
