import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import Search from './components/users/Search'
import About from './components/pages/About'
import axios from 'axios'
import './App.css'

class App extends Component {
    state = {
        users: [],
        loading: false,
    }

    searchUsers = async text => {
        this.setState({
            loading: true,
        })

        const res = await axios.get(
            `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_Id}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        )

        this.setState({ users: res.data.items, loading: false })
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Navbar />
                    <div className="container">
                        <Route
                            exact
                            path="/"
                            render={props => (
                                <Fragment>
                                    <Search searchUsers={this.searchUsers} />
                                    <Users
                                        loading={this.state.loading}
                                        users={this.state.users}
                                    />
                                </Fragment>
                            )}
                        />
                        <Route exact path="/about" component={About} />
                    </div>
                </div>
            </Router>
        )
    }
}

export default App
