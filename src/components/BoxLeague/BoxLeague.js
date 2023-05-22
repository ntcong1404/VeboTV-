import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./BoxLeague.module.scss";
import Button from "../Button";
import Image from "../Image";

const cx = classNames.bind(styles);
function BoxLeague({ data }) {
  const navigate = useNavigate();
  const handleClick = (name, id) => {
    navigate(`/match-live/${name}/${id}`);
  };
  const handleClickLeague = (slug, id) => {
    navigate(`/league/${slug}/${id}`);
  };

  return (
    <div className={cx("match-box")}>
      <div
        className={cx("mb-league")}
        onClick={() =>
          handleClickLeague(
            data.tournament.unique_tournament.slug,
            data.tournament.unique_tournament.id
          )
        }
      >
        <div className={cx("league-icon")}>
          <Image className={cx("league-img")} src={data.tournament.logo} />
        </div>
        <div className={cx("league-name")}>{data.tournament.name}</div>
      </div>
      <div className={cx("match-list")}>
        <div
          onClick={() => handleClick(data.slug, data.id)}
          className={cx("match-item")}
        >
          <div className={cx("item-info")}>
            {data.match_status === "pending" && (
              <>
                <div className={cx("status")}>
                  {new Date(data.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div className={cx("detail")}>
                  {new Date(data.timestamp).toLocaleDateString()}
                </div>
              </>
            )}
            {data.match_status === "canceled" && (
              <>
                <div className={cx("canceled")}>Đã hủy</div>
                <div className={cx("status")}>
                  {new Date(data.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div className={cx("detail")}>
                  {new Date(data.timestamp).toLocaleDateString()}
                </div>
              </>
            )}
            {data.match_status === "interrupted" && (
              <>
                <div className={cx("interrupted")}>Gián đoạn</div>
                <div className={cx("detail")}>
                  {new Date(data.timestamp).toLocaleDateString()}
                </div>
              </>
            )}
            {data.match_status === "delay" && (
              <>
                <div className={cx("delay")}>Hoãn lại</div>
                <div className={cx("status")}>
                  {new Date(data.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div className={cx("detail")}>
                  {new Date(data.timestamp).toLocaleDateString()}
                </div>
              </>
            )}
            {data.match_status === "finished" && (
              <>
                <div className={cx("finished")}>Hết giờ</div>
                <div className={cx("status")}>
                  {new Date(data.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div className={cx("detail")}>
                  {new Date(data.timestamp).toLocaleDateString()}
                </div>
              </>
            )}

            {data.match_status === "live" && (
              <>
                <div className={cx("live")}>
                  <div className={cx("live-stick")}>
                    <i className={cx("dot")}></i>
                    live
                  </div>
                </div>
                <div className={cx("time-loaded")}>{data.time_str}</div>
              </>
            )}
          </div>
          <div className={cx("item-team")}>
            <div className={cx("team-home")}>
              <div className={cx("team-logo")}>
                <Image className={cx("team-img")} src={data.home.logo} />
              </div>
              <div className={cx("team-name")}>{data.home.name}</div>
            </div>
            <div className={cx("team-away")}>
              <div className={cx("team-logo")}>
                <Image className={cx("team-img")} src={data.away.logo} />
              </div>
              <div className={cx("team-name")}>{data.away.name}</div>
            </div>
          </div>
          <div className={cx("item-result")}>
            <div className={cx("result")}>
              {data.match_status === "live" ||
              data.match_status === "finished" ? (
                <>
                  <div className={cx("result-home")}>
                    {data.scores.home}
                    {data.home_red_cards > 0 && (
                      <div className={cx("red-card")}></div>
                    )}
                  </div>
                  <div className={cx("result-away")}>
                    {data.scores.away}
                    {data.away_red_cards > 0 && (
                      <div className={cx("red-card")}></div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div>-</div>
                  <div>-</div>
                </>
              )}
            </div>
          </div>
          <div className={cx("item-button")}>
            <Button className={cx("btn")} to={"#"} live small>
              Trực tiếp
            </Button>

            <Button className={cx("btn")} to={"#"} primary small>
              Đặt cược
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoxLeague;
