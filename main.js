import React from 'react'
import Header from './public/scripts/views/shared/header.js'
import WatchList from './public/scripts/views/watch_list/watchList.js'

React.render((
    <div className="container">
        <Header />
        <div className="content container">
            <WatchList />
        </div>
    </div>
), document.getElementById('main'))