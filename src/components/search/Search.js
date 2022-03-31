import React, { useState, useContext, useEffect } from 'react'
import { withRouter } from "react-router-dom"

import homeBg from "../../assets/images/home-bg.jpg"
import Alert from "../Alert"

import {ShowContext} from "../../context/ShowContext"
import {AlertContext} from "../../context/AlertContext"

const Search = (props) => {

    const [searchTerm, setSearchTerm] = useState("");
    const {loading, searchShows } = useContext(ShowContext);
    const {alert, setAlert} = useContext(AlertContext);

    useEffect(() => {
        if (props.location.search && props.location.search.includes("key=")) {
            console.log(props.location.search)
            let key = props.location.search.split("key=")[1];
            console.log(key)
            if (key && key.includes("&")) {
                key = key.split("&")[0];
            }
            if (key) {
                setSearchTerm(key);
                searchShows(key);
            }
        }
    }, []);

    const handleSearchForm = (e) => {
        
        e.preventDefault();

        if (searchTerm.trim()) {
            props.history.replace(`/search?key=${searchTerm}`);
            searchShows(searchTerm);
        } else {
            setAlert("Search Bar is empty !", "danger");
        }
    };

    const styleClasses = 
        props.size === "large" 
        ? "col-2-4 search-content mx-auto mh-100" 
        : "col-2-4 search-content mx-auto pt-6 pb-2"
    ;

    return (
        <section className="search" style={{ background: `url(${homeBg})` }}>
            <div className="container">
                <div className="row">
                    <div className={styleClasses}>
                        { props.size === "large"
                            ? 
                            <div>
                                <h1>Find your next show</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            </div>
                            : 
                            <div></div>
                        }
                        <form className="search-form" onSubmit={handleSearchForm}>
                            <input type="search" placeholder="search fot tv show" value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)} />
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? "Loading ..." : "Search"}
                            </button>
                        </form>

                        {alert && (
                            <Alert type={alert.type} message={alert.message} />
                        )}

                    </div>
                </div>
            </div>
        </section>
    );
}

export default withRouter(Search)
