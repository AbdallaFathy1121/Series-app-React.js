import axios from 'axios';
import React , { useReducer } from 'react'

const ShowContext = React.createContext();

const ShowState = (props) => {

    const initialState = {
        shows: [],
        activeShow: {},
        loading: false,
    };

    const [state , dispatch] = useReducer(showReducer , initialState);

    const searchShows = async (searchTerm) => {

        dispatch({ type: "SET_LOADING" });

        const {data} = await axios.get(
            `http://api.tvmaze.com/search/shows?q=${searchTerm}`
        );

        dispatch({ type: "SEARCH_SHOWS", payload: data });

    };

    const getActiveShow = async (id) => {
        dispatch({ type: "SET_LOADING" });
        const {data} = await axios.get(`http://api.tvmaze.com/shows/${id}`);
        console.log(data);
        dispatch({ type: "SET_ACTIVE_SHOW", payload: data });
    };

    return (
        <ShowContext.Provider value={{
            shows: state.shows,
            loading: state.loading,
            activeShow: state.activeShow,

            searchShows,
            getActiveShow,
        }}>
            {props.children}
        </ShowContext.Provider>
    );
};

const showReducer = (state, action) => {
    switch (action.type) {
        case "SET_LOADING":
            return { ...state, loading: true };
        case "SEARCH_SHOWS":
            return { ...state, shows: action.payload, loading: false };
        case "SET_ACTIVE_SHOW":
            return { ...state, activeShow: action.payload ? action.payload : {} , loading: false };
        default:
            return state;
    }
};


export  {ShowContext , ShowState};