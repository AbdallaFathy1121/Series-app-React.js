import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

////////////////////////////////////////

import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import ShowPage from './pages/ShowPage'
import Header from "./components/layout/Header"

import {ShowState} from './context/ShowContext'
import {AlertState} from './context/AlertContext'


function App() {


  return (
    <ShowState>
      <AlertState>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/search" exact component={SearchPage} />
            <Route path="/shows/:id" exact component={ShowPage} />
          </Switch>
        </BrowserRouter>
      </AlertState>
    </ShowState>
  );
}

export default App;
