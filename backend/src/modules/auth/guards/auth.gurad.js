import passport from "../config/passport.config.js";

export const authGuard = (provider) => {
    return passport.authenticate(provider , {
        session :false,
        scope: provider === "google"? ['profile' , 'email'] : ["user:email"]
    })
}

export const callbackGuard = (provider) => {
  return passport.authenticate(provider, {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
  });
};