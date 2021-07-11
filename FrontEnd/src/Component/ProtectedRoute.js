import React from 'react'
import {Route, Redirect } from 'react-router-dom'
const ProtectedRoute = ({component : Component,...rest}) =>(
    <Route
       {...rest}
        component = {(props) => (
            localStorage.getItem("token") ? (
            <Component {...props}/>
            ) :
            <Redirect to={{ pathname: '/' }} />
        )}
    />
)

export default ProtectedRoute;