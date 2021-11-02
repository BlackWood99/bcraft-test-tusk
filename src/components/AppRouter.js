import { Redirect, Route, Switch } from "react-router"
import { privateRoutes, publicRoutes } from "../routes"
import { CHANGE_PASSWORD_ROUTE, REGISTRATION_ROUTE } from "../utils/routeConsts"



const AppRouter = ({ isAuth }) => {

    return (
        isAuth ? (
            <Switch>
                {
                    privateRoutes.map(({ path, component }) => (
                        <Route path={path} component={component} exact={true} key={path} />
                    ))
                }
                <Redirect to={CHANGE_PASSWORD_ROUTE} />
            </Switch>
        ) : (
            <Switch>
                {
                    publicRoutes.map(({ path, component }) => (
                        <Route path={path} component={component} exact={true} key={path} />
                    ))
                }
                <Redirect to={REGISTRATION_ROUTE} />
            </Switch>
        )
    )
}

export default AppRouter