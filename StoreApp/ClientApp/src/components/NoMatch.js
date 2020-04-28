import React from 'react'
import NavBar from './NavBar'

const NoMatch = () => {
    return (
        <div>
            <NavBar />
            <div className="notFound__message text">Sorry, the page you are looking for doesn't exist</div>
        </div>
    )

}

export default NoMatch