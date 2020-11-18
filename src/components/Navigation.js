// Link Nav
import React from 'react'
import { Link } from 'react-router-dom'

import { faUser, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navigation = ({userObj}) => (
    <nav>
        <ul>   
            <li><Link to="/">
                <FontAwesomeIcon icon={faHome} />
            </Link></li>
            <li><Link to="/profile">
                <FontAwesomeIcon icon={faUser} />
                {userObj.displayName ? userObj.displayName : userObj.displayName = "Your"} Profile
            </Link></li>
        </ul>
    </nav>
)

export default Navigation