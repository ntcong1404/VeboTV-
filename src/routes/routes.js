import config from "../config";

import Home from "../pages/Home";
import News from "../pages/News";
import Profile from "../pages/Profile";
import Result from "../pages/Result";
import Schedule from "../pages/Schedule";
import Register from "../pages/Register";
import Match from "../pages/Match";
import League from "../pages/League";

const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.news, component: News },
  { path: config.routes.profile, component: Profile },
  { path: config.routes.result, component: Result },
  { path: config.routes.schedule, component: Schedule },
  { path: config.routes.match, component: Match },
  { path: config.routes.league, component: League },
  { path: config.routes.register, component: Register, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
