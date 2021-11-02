import React, { useEffect, useState } from "react"
import "./App.css"
import { BrowserRouter} from "react-router-dom"
import { connect } from "react-redux";
import AppRouter from "./components/AppRouter"
import Header from "./components/Header"


function App({ info }) {

  const [isAuth, setIsAuth] = useState(info.isAuth)
  const [error, setError] = useState(info.error)
  const [serverMess, setServerMess] = useState(info.serverMess)

  useEffect(() => {
    setIsAuth(info.isAuth)
    setError(info.error)
    setServerMess(info.serverMess)
  }, [info])

  return (
    <BrowserRouter>
      <div className="App">
        
        <Header isAuth={isAuth} />

        {
          error || serverMess ?
            (
              <div className="info">
                <div className="info__error">{error}</div>
                <div className="info__mess">{serverMess}</div>
              </div>
            ) : null
        }

        <AppRouter isAuth={isAuth} />

      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => ({
  info: state.auth,
})

export default connect(mapStateToProps, null)(App);
