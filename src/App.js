// This is the main entry point of our application
import React from 'react'
import ReactDOM from 'react-dom'

//import Apollo Client dependencies
import {
    ApolloClient, 
    ApolloProvider, 
    createHttpLink,
    InMemoryCache
} from '@apollo/client'
import {setContext} from 'apollo-link-context'

//import Global Styles
import GlobalStyle from '/components/GlobalStyle'
//import routes
import Pages from '/pages'

//configure our API URI & cache
const uri = process.env.API_URI
const httpLink = createHttpLink({uri})
const cache = new InMemoryCache()

//check for a token and return the headers to the context
const authLink = setContext((_, {headers}) => {
    return {
        headers: {
            ...headers,
            authorization: localStorage.getItem('token') || ''
        }
    }
})

//create the Apollo Client
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    resolvers: {},
    connectToDevTools: true
})

//check for a local token
const data = {
    isLoggedIn: !!localStorage.getItem('token')
}

//write the cache data on initial load
cache.writeData({data})
//write the cache data after cache is reset
client.onResetStore(() => cache.writeData( {data} ))


const App = () => {
    return (
        <ApolloProvider client={client}>
            <GlobalStyle /> 
            <Pages />
        </ApolloProvider>
    )
}   


ReactDOM.render(<App />, document.getElementById('root'))