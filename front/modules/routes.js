import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Home from './Home'
import Posts from './Posts'

module.exports = (
    <Route path="/api/posts" component={Home}>
        <Route path="/api/posts/:id" component={Home}/>
    </Route>
)