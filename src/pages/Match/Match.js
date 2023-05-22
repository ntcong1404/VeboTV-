import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faDivide,
  faFutbolBall,
  faMobilePhone,
  faPhone,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";

import * as Service from "../../apiService/Service";
import styles from "./Match.module.scss";
import Image from "../../components/Image";
import Button from "../../components/Button";
import Bookmaker from "../../components/Bookmaker";

const cx = classNames.bind(styles);
function Match() {
  const { id } = useParams();
  console.log(id);

  const [match, setMatch] = useState();

  useEffect(() => {
    Service.MatchLive({ id })
      .then((data) => {
        console.log(data.home.name);
        setMatch([data]);
      })
      .catch((error) => console.log(error));
  }, [id]);

  return match?.map((match) => (
    <>
      <div className={cx("container")}>
        <div className={cx("header")}>
          <div className={cx("title")}>
            <h2>{match.name}</h2>
          </div>
        </div>
        <div className={cx("main")}>
          <div className={cx("detail")}>
            <div className={cx("item")}>
              <div className={cx("team-home")}>
                <div className={cx("team-logo")}>
                  <Image className={cx("image")} src={match.home.logo} />
                </div>
                <div className={cx("team-name")}>{match.home.name}</div>
              </div>
              <div className={cx("info")}>
                <div className={cx("league")}>
                  <div className={cx("image-league")}>
                    <Image
                      className={cx("img-league")}
                      src={match.tournament.logo}
                    />
                  </div>
                  <div className={cx("league-name")}>
                    {match.tournament.name}
                  </div>
                </div>
                <div className={cx("result")}>
                  <div>{match.scores.home}</div>
                  <div>-</div>
                  <div>{match.scores.away}</div>
                </div>
                <div className={cx("time-loaded")}>
                  {/* {match.time_str} */}
                </div>
              </div>
              <div className={cx("team-away")}>
                <div className={cx("team-logo")}>
                  <Image className={cx("image")} src={match.away.logo} />
                </div>
                <div className={cx("team-name")}>{match.away.name}</div>
              </div>
            </div>
          </div>
          <div className={cx("content")}>
            <div className={cx("content-wrap")}>
              <div className={cx("live-full")}>
                <div className={cx("lf-left")}>
                  <div className={cx("btn-links")}>
                    <Button
                      className={cx("button")}
                      bet
                      small
                      leftIcon={<FontAwesomeIcon icon={faArrowRight} />}
                    >
                      Mô phỏng
                    </Button>
                  </div>
                  <div className={cx("screen")}></div>
                </div>
                <div className={cx("lf-right")}>
                  <div className={cx("btn-chat")}>
                    <Button live small>
                      Mở chat
                    </Button>
                  </div>
                  <div className={cx("chat-box")}>
                    <div className={cx("cb-header")}>
                      <div className={cx("top-chat")}></div>
                      <div className={cx("menu-chat")}></div>
                    </div>
                    <div className={cx("cb-content")}></div>
                    <div className={cx("cb-comment")}>
                      <div className={cx("cm-avatar")}></div>
                      <div className={cx("cm-name")}></div>
                      <div className={cx("cm-input")}></div>
                      <div className={cx("cm-icon")}></div>
                      <div className={cx("cm-sent")}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={cx("lf-bottom")}>
                <Button
                  primary
                  large
                  leftIcon={<FontAwesomeIcon icon={faFutbolBall} />}
                >
                  Đặt cược trận này
                </Button>
                <div className={cx("bottom-btn")}>
                  <div className={cx("btb-btn")}>
                    <div className={cx("icon-phone")}>
                      <FontAwesomeIcon icon={faMobilePhone} />
                    </div>
                    Trực tiếp trên điện thoại
                  </div>
                  <div className={cx("btb-btn")}>
                    <div className={cx("icon-ratio")}>
                      <FontAwesomeIcon icon={faDivide} />
                    </div>
                    Tỷ lệ trận này
                  </div>
                  <div className={cx("btb-btn")}>
                    <div className={cx("icon-scrutiny")}>
                      <FontAwesomeIcon icon={faSearch} />
                    </div>
                    Soi kèo trận này
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("sidebar")}>
            <div className={cx("sidebar-wrap")}>
              <div className={cx("sidebar-info")}>
                <div>Thời gian diễn ra :</div>
                <div>Giải đấu :</div>
              </div>
              <div className={cx("sidebar-logo-match")}>
                <Image className={cx("sideber-img")} src={match.home.logo} />
                <div>VS</div>
                <Image className={cx("sideber-img")} src={match.away.logo} />
              </div>
            </div>
            <div className={cx("bookmaker")}>
              <div className={cx("title")}>
                <h2>NHÀ CÁI UY TÍN</h2>
              </div>
              <Bookmaker />
            </div>
          </div>
        </div>
      </div>
    </>
  ));
}

export default Match;
