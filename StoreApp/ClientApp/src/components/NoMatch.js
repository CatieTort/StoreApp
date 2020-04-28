import React from 'react'
import NavBar from './NavBar'

const NoMatch = () => {
    return (
        <div>
            <NavBar />
            <p className="notFound___message text">Sorry, the page you are looking for doesn't exist</p>
        </div>
    )

}

export default NoMatch