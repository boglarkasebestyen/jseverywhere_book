//import React and routing dependencies
import React from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import NewNote from './new'
import EditNote from './edit'

import {useQuery, gql} from '@apollo/client'

//import shared layout component
import Layout from '../components/Layout'

import SignUp from './signup'
import SignIn from './signin'

//import routes
import Home from './home'
import MyNotes from './mynotes'
import Favorites from './favorites'
import NotePage from './note'
import { Component } from 'react'

//adding the isLoggedIn Query
const IS_LOGGED_IN = gql`
    {
        isLoggedIn @client
    }
`
    

//definte routes
const Pages = () => {
    return (
        <Router>
            {/* Wrap our routes within the Layout component  */}
            <Layout>
                <Route exact path="/" component={Home} />
                <PrivateRoute path="/mynotes" component={MyNotes} />
                <PrivateRoute path="/favorites" component={Favorites} />
                <Route path="/note/:id" component={NotePage} />
                <Route path="/signup" component={SignUp} />
                <Route path="/signin" component={SignIn} />
                {/* adding a private route*/}
                <PrivateRoute path="/new" component={NewNote} />
                {/*adding a new private route that accepts an :id parameter*/}
                <PrivateRoute path="/edit/:id" component={EditNote} />
            </Layout>
        </Router>
    )
}

const PrivateRoute = ({ component: Component, ...rest}) => {
    const {loading, error, data} = useQuery(IS_LOGGED_IN)
    //if the data is loading, display a loading message
    if (loading) return <p>Loading...</p>
    //if there is an error fetching the data, display an error message
    if (error) return <p>Error!</p>
        // if the user is logged in, route them to the requested component
        // else redirect them to the sign-in page
    return (
        <Route
            {...rest}
            render={props =>
                data.isLoggedIn === true ? (
                    <Component {...props} />
              ) : (
                <Redirect 
                    to={{
                        pathname: '/signin',
                        state: {from: props.location}
                    }}
                />
              )
            }

        />
    )

}   
export default Pages