import React, { useState, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import About from './components/pages/About'
import axios from 'axios'
import './App.css'

const App = () => {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})
    const [repos, setRepos] = useState([])
    const [loading, setLoad] = useState(false)

    const searchUsers = async text => {
        setLoad(true)

        const res = await axios.get(
            `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_Id}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        )

        setLoad(false)
        setUsers(res.data.items)
    }

    //get single user
    const getUser = async username => {
        setLoad(true)

        const res = await axios.get(
            `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_Id}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        )

        setLoad(false)
        setUser(res.data)
    }

    //get user's repos
    const getUserRepos = async username => {
        setLoad(true)

        const res = await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_Id}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        )

        setLoad(false)
        setRepos(res.data)
    }

    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="container">
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={props => (
                                <Fragment>
                                    <Search searchUsers={searchUsers} />
                                    <Users loading={loading} users={users} />
                                </Fragment>
                            )}
                        />
                        <Route exact path="/about" component={About} />
                        <Route
                            exact
                            path="/user/:login"
                            render={props => (
                                <User
                                    {...props}
                                    getUser={getUser}
                                    getUserRepos={getUserRepos}
                                    user={user}
                                    repos={repos}
                                    loading={loading}
                                />
                            )}
                        />
                    </Switch>
                </div>
            </div>
        </Router>
    )
}

export default App
