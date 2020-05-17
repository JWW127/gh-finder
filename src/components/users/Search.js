import React, { useState, useContext } from 'react'
import GithubContext from '../../context/github/githubContext'

const Search = () => {
    const githubContext = useContext(GithubContext)

    const [text, setText] = useState('')

    const onChangeHandler = e => {
        setText(e.target.value)
    }

    const onSubmit = e => {
        e.preventDefault()
        githubContext.searchUsers(text)
        setText('')
    }

    return (
        <div>
            <form onSubmit={onSubmit} className="form">
                <input
                    type="text"
                    name="text"
                    placeholder="Enter Username"
                    value={text}
                    onChange={onChangeHandler}
                />
                <input
                    type="submit"
                    value="Search"
                    className="btn btn-dark btn-block"
                />
            </form>
        </div>
    )
}

export default Search
