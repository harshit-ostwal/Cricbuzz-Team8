import  passport  from "passport";

import googleStrategy from "../strategies/google.stratergy.js";
import githubStrategy from "../strategies/github.strategy.js";

export const passportInit = () => {
  passport.use("google", googleStrategy);
  passport.use("github", githubStrategy);
};

export default passport;