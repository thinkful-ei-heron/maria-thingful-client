import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TokenService from '../../services/token-service'

// props ={
  // path: '/thing/:thing_id'
  // component = ArticlePage

// }
// this private route only for logged in usersm
export default function PrivateRoute({ component, ...props }) {
  const Component = component
  
  //returns a higher order component, route that has a router inside it 
  // rendering rpute component, sending in all props to route component , and then do consition check 
  // if to
  return (
    <Route
      {...props}
      render={componentProps => (
        // check to see if user is logged in 
        TokenService.hasAuthToken()
        //if yes, send them to component 
          ? <Component {...componentProps} />
          //else redner and send to redirect them to login page see: Loginform.js
          : <Redirect
              to={{
                pathname: '/login',

                // after they log in , send them to wherre they wanted ot go in first place
                state: { from: componentProps.location }
              }}
            />
      )}
    />
  )
}
