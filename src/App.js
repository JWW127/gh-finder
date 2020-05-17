import React, { useState, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import About from './components/pages/About'
import axios from 'axios'

import GithubState from './context/github/GithubState'
import './App.css'

const App = () => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    const [repos, setRepos] = useState([])

    //get single user

    //get user's repos
    const getUserRepos = async username => {
        const res = await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_Id}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        )

        setRepos(res.data)
    }

    return (
        <GithubState>
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
                                        <Search />
                                        <Users />
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
                                        getUserRepos={getUserRepos}
                                        repos={repos}
                                    />
                                )}
                            />
                        </Switch>
                    </div>
                </div>
            </Router>
        </GithubState>
    )
}

export default App
