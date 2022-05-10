import React from "react";

export default function LoginForm(props){
    const {handleChange, handleLogin} =props;
    
    return (
        <div  className="LoginForm">
            
            <form className="needs-validation" noValidate onSubmit={handleLogin}>
                <h1 className="text-center">Owner login</h1>
                <div className="mb-3">
                    <label className="form-label" htmlFor="username">Email:</label>
                    <input className="form-control " type="email" id="username"  required onChange={handleChange}/>
                    <div className="invalid-feedback">
                        Required!
                    </div>
                </div>
                
                <div className="mb-3">
                    <label className="form-label" htmlFor="password">Password:</label>
                    <input className="form-control" type="password" id="password" required onChange={handleChange} />
                    <div className="invalid-feedback">
                        Required!
                    </div>
                </div>
                
                <button type="submit" className="btn btn-primary my-3 me-2">Login</button>
                {/* <button className="btn btn-danger my-3 me-3">Forgot Password?</button> */}
                
            </form>
        </div>
    )
}