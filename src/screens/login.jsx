import React from 'react'

export const Login=(props)=>{
    const onLogin = () => props.history.push({pathname:'/dashboard',authenticated:true});
    const onCancel = () => props.history.push({pathname:'/dashboard',authenticated:false});
    return (
      <div>
        <h2>Task Engine</h2>
        <div>
          <input placeholder="name" type="name" />
          <input placeholder="email" type="email" />
          <button onClick={onLogin}>Login</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    )
}

