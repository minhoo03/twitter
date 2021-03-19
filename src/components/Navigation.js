// Link Nav
import React from 'react'
import { Link } from 'react-router-dom'

import { faUser, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navigation = ({userObj}) => (
    <nav>
        <ul>   
            <li>
                <Link to="/">
                    <FontAwesomeIcon style={{color:'#73a0e4', fontSize:'24px'}} icon={faHome} />
                </Link>
            </li>
            <li>
                <Link to="/profile">
                    <FontAwesomeIcon style={{color:'#73a0e4', fontSize:'24px'}} icon={faUser} />
                </Link>
            </li>
        </ul>
    </nav>
)

export default Navigation