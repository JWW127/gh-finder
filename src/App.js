import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import User from './components/users/User'
import About from './components/pages/About'
import Home from './components/pages/Home'
import NotFound from './components/pages/NotFound'
import axios from 'axios'

import GithubState from './context/github/GithubState'
import './App.css'

const App = () => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    const [repos, setRepos] = useState([])

    return (
        <GithubState>
            <Router>
                <div className="App">
                    <Navbar />
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/about" component={About} />
                            <Route exact path="/user/:login" component={User} />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </div>
            </Router>
        </GithubState>
    )
}

export default App
