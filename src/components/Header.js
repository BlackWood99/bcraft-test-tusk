import React from "react"
import { NavLink } from "react-router-dom"
import { privateRoutes, publicRoutes } from "../routes"

const Header = ({ isAuth }) => {

  return (
    <header>
      {
        isAuth ? (
          privateRoutes.map(route => (
            <NavLink to={route.path} key={route.linkTitle}>{route.linkTitle}</NavLink>
          ))
        ) : (
          publicRoutes.map(route => (
            <NavLink to={route.path} key={route.linkTitle}>{route.linkTitle}</NavLink>
          ))
        )
      }
    </header>
  )
}

export default Header