import React, { useState } from 'react'

function Login() {

    const [user, setUser] = useState({
        email: "", 
        password: ""
    })

    const handleSubmit = () =>{
       if(!user.email || !user.password){
        console.log("invalid")
       }
    }

  return (
    <div
      style={{
        width: 300,
        border : '0.5px solid #000',
        padding: '20px',
        height : "350px",
        position: "absolute",
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h2 style={{textAlign:"center"}}>Login</h2>
        <br/>
        Email/Username
        <input
          style={{ margin: "10px 0 25px", height: "30px" }}
          type="text"
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
          value={user.email}
        />
        Password
        <input
          style={{ margin: "10px 0 25px", height: "30px" }}
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
          value={user.email}
        />
        <button style={{height:"30px", margin : "20px 0"}} type="button" onClick={handleSubmit}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login