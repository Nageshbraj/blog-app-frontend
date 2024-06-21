import { useAuth } from "../context/AuthContext"
import { useState } from "react"
import axios from '../config/axios'

export default function Account() {
    const { user,dispatch } = useAuth() 
    const [image, setImage] = useState(null);


    const submitImage = async (e) => {
      e.preventDefault();
      try{
        const formData = new FormData();
        formData.append("profilePicture", image);
    
        const result = await axios.post("/api/users/upload-profile-picture",formData,
          {
            headers: { Authorization: localStorage.getItem('token') ,
              "Content-Type": "multipart/form-data" },
          }        
        );
        dispatch({type:'LOGIN', payload:{account:result.data.user}});
        setImage(null)
      }catch(err){
        console.error(err)
      }
      
    };
  
    const onInputChange = (e) => {
      console.log(e.target.files[0]);
      setImage(e.target.files[0]);
    };
    

    
    return (
        <div>
          
            <h2>Account Info</h2>
            {user.isLoggedIn ? (
        <> 
          {user.account?.profilePicture && <img
                src={`http://localhost:5000/${user.account.profilePicture}`}
                height={200}
                width={200}
              />}
               <form onSubmit={submitImage}>
                  <input type="file" accept="image/*" onChange={onInputChange}></input>
                  <button type="submit">Submit</button>
              </form>
          <p>Username - {user.account.username}</p>
          <p>email - {user.account.email}</p>
          
          
        </>
      ):(<p>Loading...</p>)}
      
        </div>
    )
}