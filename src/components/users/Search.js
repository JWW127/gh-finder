import React, {  useState } from 'react'

const Search = ({ searchUsers }) => {
    const [text, setText] = useState('')

    const onChangeHandler = e => {
        setText(e.target.value)
    }

    const onSubmit = e => {
        e.preventDefault()
        searchUsers(text)
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
