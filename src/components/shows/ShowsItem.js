import React from 'react'
import { Link } from 'react-router-dom'

import noImg from "../../assets/images/no-img.png"

const ShowsItem = ({show}) => {
    return (
        <Link to={`/shows/${show.id}`} className="show-item" >
            <div className="show-item_img">
                <img 
                    src={ show.image && show.image.medium ? show.image.medium : noImg }  
                    alt={ show.name ? show.name : "Show Img" } 
                />
                <div className="show-item_img-hover">

                    { show.rating && show.rating.average ? (
                        <div className="rating">
                            <span>⭐</span> { show.rating.average }
                        </div>
                    ) : (<div className="rating"></div>) }

                    <h3 className="title"> { show.name ? show.name : "..." } </h3>
                </div>
            </div>
        </Link>
    )
}

export default ShowsItem
