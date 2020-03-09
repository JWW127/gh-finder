import React, { Component } from 'react'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import axios from 'axios'
import './App.css'

class App extends Component {
    state = {
        users: [],
        loading: false,
    }

    async componentDidMount() {
        this.setState({
            loading: true,
        })

        /*  const res = await axios.get(
            `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_Id}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}`) 
        */

        //use the above code if you have an api key and .env.local file, github only allows 50pulls per 24hrs

        const res = await axios.get(
            `https://api.github.com/users?`
        )

        this.setState({ users: res.data, loading: false })
        console.log(res.data)
    }

    render() {
        return (
            <div className="App">
                <Navbar />
                <div className="container">
                    <Users
                        loading={this.state.loading}
                        users={this.state.users}
                    />
                </div>
            </div>
        )
    }
}

export default App
