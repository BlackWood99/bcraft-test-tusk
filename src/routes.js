import ChangePassword from "./pages/ChangePassword";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { CHANGE_PASSWORD_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "./utils/routeConsts";


export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        component: Login,
        linkTitle: "login",
    },
    {
        path: REGISTRATION_ROUTE,
        component: Registration,
        linkTitle: "registration",
    },
];

export const privateRoutes = [
    {
        path: CHANGE_PASSWORD_ROUTE,
        component: ChangePassword,
        linkTitle: "change password",
    },
];