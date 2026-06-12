const APP_NAME = "CricBuzz App";
const APP = "cric-buzz-app";
const DEVELOPER_NAME = "praful"
export { APP, APP_NAME , DEVELOPER_NAME};


export const app_config = {
    cookie : {
        cookieAccessOptions  : {
            httpOnly : false ,
            secure : false,
            sameSite : 'lax',
            maxAge : 60 * 60 * 1000
        },
        cookieRefreshOptions : {
            httpOnly : true,
            secure : false ,
            sameSite : 'lax',
            maxAge : 30 * 24 * 60 * 60 * 1000
        }
    }
}