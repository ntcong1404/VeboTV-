import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";

import styles from "./BoxMatch.module.scss";
import Button from "../Button";
import Image from "../Image";

const cx = classNames.bind(styles);

function BoxMatch({ data, large }) {
  const navigate = useNavigate();
  const handleClick = (name, id) => {
    navigate(`/match-live/${name}/${id}`);
  };

  return (
    <div className={cx("main", { large })}>
      <div className={cx("container")}>
        <div onClick={() => handleClick(data.slug, data.id)}>
          <header className={cx("header")}>
            {data.is_live && (
              <div className={cx("live")}>
                <div className={cx("live-stick")}>
                  <i className={cx("dot")}></i>
                  live
                </div>
              </div>
            )}
            <div className={cx("title")}>
              <p>{data.tournament.name}</p>
            </div>
          </header>
          <div className={cx("body")}>
            <div className={cx("team-home")}>
              <div className={cx("home-logo")}>
                <Image className={cx("logo-img")} src={data.home.logo} />
              </div>
              <div className={cx("home-name")}>{data.home.name}</div>
            </div>
            <div className={cx("info")}>
              {data.match_status === "pending" && (
                <>
                  <div className={cx("start-time-match")}>
                    {new Date(data.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <div className={cx("day")}>
                    {new Date(data.timestamp).toLocaleDateString()}
                  </div>
                </>
              )}

              {data.match_status === "live" && (
                <>
                  <div className={cx("result")}>
                    <div>
                      {data.scores.home}
                      {data.home_red_cards > 0 && (
                        <>
                          <div className={cx("home-red-card")}>
                            <div className={cx("red-card")}></div>
                          </div>
                        </>
                      )}
                    </div>
                    <div className={cx("space")}>-</div>
                    <div>
                      {data.scores.away}
                      {data.away_red_cards > 0 && (
                        <>
                          <div className={cx("away-red-card")}>
                            <div className={cx("red-card")}></div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  {/* <div className={cx("time-loaded")}>{data.time_str}</div> */}
                </>
              )}
            </div>
            <div className={cx("team-away")}>
              <div className={cx("away-logo")}>
                <Image className={cx("logo-img")} src={data.away.logo} />
              </div>
              <div className={cx("away-name")}>{data.away.name}</div>
            </div>
          </div>
          <footer className={cx("footer")}>
            {data.commentators === null ? (
              <div></div>
            ) : data.commentators.length === 0 ? (
              <div></div>
            ) : (
              <>
                <div className={cx("commentator")}>
                  <div className={cx("icon")}>
                    <FontAwesomeIcon icon={faMicrophone} />
                  </div>
                  <div className={cx("name")}>
                    {data.commentators.map((item) => (
                      <span className={cx("name-com")}>{item.name}</span>
                    ))}
                  </div>
                </div>
              </>
            )}
            <div className={cx("button")}>
              <Button to={"./register"} live small>
                Trực tiếp
              </Button>
              <Button to={"./result"} primary small>
                Đặt cược
              </Button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

BoxMatch.propTypes = {
  data: PropTypes.object.isRequired,
  large: PropTypes.bool,
};

export default BoxMatch;
