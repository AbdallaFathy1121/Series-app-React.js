import React, { useContext, useEffect, useState } from 'react'
import { ShowContext } from "../../context/ShowContext"
import { withRouter } from "react-router-dom"

import noImg from "../../assets/images/no-img.png"

const Show = (props) => {

    const {getActiveShow , activeShow, loading} = useContext(ShowContext);
    
    const [ showImg, setShowImg ] = useState(noImg);

    useEffect(() => {
        if (props.match.params.id) {
            getActiveShow(props.match.params.id);
        }
    }, [props.match.params.id]);

    useEffect(() => {
        if (activeShow && activeShow.image) {
            if (activeShow.image.original) {
                setShowImg(activeShow.image.original);
            } else if (activeShow.image.medium) {
                setShowImg(activeShow.image.medium);
            }
        } else {
            setShowImg(noImg);
        }
    }, [activeShow]);

    const bgStyle = {
        backgroundImage: `url(${showImg})`,
    }

    return (
        <section className="show" style={bgStyle}>
            <div className="container">

                {loading && (
                    <div className="row">
                        <div className="col-full">
                            <div className="not-found"> Loading ... </div>
                        </div>
                    </div>
                )}

                {!loading && !activeShow && (
                    <div className="row">
                        <div className="col-full">
                            <div className="not-found"> Show Not Found </div>
                        </div>
                    </div>
                )}

                {!loading && activeShow && (
                    <div className="row">
                        <div className="col-1-4">
                            <div className="show-img" >
                                <img src={showImg} alt="Shpw Title" />
                            </div>
                        </div>
                        <div className="col-3-4">
                            <div className="show-info">

                                <h1 className="mb-2">{activeShow.name ? activeShow.name : "..."}</h1>

                                { activeShow.genres && activeShow.genres.length > 0 && (
                                    <div className="show-info_type mb-2">
                                        {activeShow.genres.map((el) => (
                                            <span className="badge" key={el}>{el}</span>
                                        ))}
                                    </div>
                                )}
                                <div className="sow-info_status mb-1">
                                    <strong>Status : </strong> { activeShow.status ? activeShow.status : "..."}
                                </div>

                                <div className="show-info_rating mb-1">
                                    <strong>Rating : </strong> { activeShow.rating && activeShow.rating.average ? activeShow.rating.average : "..."}
                                </div>

                                <div className="show-info_site mb-1">
                                    <a href={activeShow.officialSite ? activeShow.officialSite : "#"} target="_blank" rel="noreferrer">
                                        <strong> Official Site </strong>
                                    </a>
                                </div>

                                { activeShow.summary && (            
                                    <div className="sow-info_about flex ">
                                        <strong>Store : </strong>
                                        <span dangerouslySetInnerHTML={{
                                            __html: activeShow.summary
                                        }}></span>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default withRouter(Show);
