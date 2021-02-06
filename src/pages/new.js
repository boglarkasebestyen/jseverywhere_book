import React, {useEffect} from 'react'
import {useMutation, gql} from '@apollo/client'
import NoteForm from '../components/NoteForm'
import {GET_NOTES, GET_MY_NOTES} from '../gql/query'

//our new note query
const NEW_NOTE = gql`
    mutation newNote($content: String!) {
        newNote(content: $content) {
            id
            content
            favoriteCount
            favoritedBy {
                id
                username
            }
            author {
                username
                id
            }
        }
    }
`

//within the NewNote component update the mutation
//everything else stays the same

const NewNote = props => {
    useEffect(() => {
        //update the document title
        document.title = 'New Note - Notedly'
    })

    //the mutation
    const [data, {loading, error}] = useMutation(NEW_NOTE, {
        //refetch the GET_NOTES and GET_MY_NOTES queries to update the cache
        refetchQueries: [{query: GET_MY_NOTES}, {query: GET_NOTES}],
        onCompleted: data => {
            //when complete, redirect the user to the note page
            props.history.push(`note/${data.newNote.id}`)
        }
    })

    return (
        <React.Fragment>
            {/*as the mutation is loading, display a loading message*/}
            {loading && <p>Loading...</p>}
            {/*if there is an error, display an error message*/}
            {error && <p>Error saving the note</p>}
            {/*the form component, passing the mutation data as a prop*/}
            <NoteForm action={data} />
        </React.Fragment>
    )
}

export default NewNote 
