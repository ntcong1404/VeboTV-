import config from "../config";

import Home from "../pages/Home";
import Result from "../pages/Result";
import Schedule from "../pages/Schedule";
import News from "../pages/News";
import Highlight from "../pages/Highlight";
import Scrutiny from "../pages/Scrutiny";
import Replay from "../pages/Replay";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import Match from "../pages/Match";
import League from "../pages/League";
import RecordMatch from "../pages/RecordMatch";

const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.news, component: News },
  { path: config.routes.result, component: Result },
  { path: config.routes.schedule, component: Schedule },
  { path: config.routes.highlight, component: Highlight },
  { path: config.routes.scrutiny, component: Scrutiny },
  { path: config.routes.replay, component: Replay },
  { path: config.routes.profile, component: Profile },
  { path: config.routes.match, component: Match },
  { path: config.routes.recordMatch, component: RecordMatch },
  { path: config.routes.league, component: League },
  { path: config.routes.register, component: Register, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
