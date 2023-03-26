import {getKeyValue} from "./storage.service.js";

const NO_AUTH_ROUTES = [
    '/user/login',
    '/help',
];

const isAuth = (req) => {
    const token = req.headers.token;
    const isNoAuthRoute = NO_AUTH_ROUTES.includes(req.path);

    return isNoAuthRoute || token === getKeyValue('token')
}

export { isAuth };
