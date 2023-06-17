import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faDivide,
  faFutbolBall,
  faMicrophone,
  faMobilePhone,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

import * as Service from "../../apiService/Service";
import styles from "./Match.module.scss";
import Image from "../../components/Image";
import Button from "../../components/Button";
import Bookmaker from "../../components/Bookmaker";
import BoxChat from "./BoxChat";

const cx = classNames.bind(styles);
function Match() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [match, setMatch] = useState();
  const [meta, setMeta] = useState();
  const [link, setLink] = useState("");
  console.log(link);
  const [simulation, setSimulation] = useState("");

  const handleClick = (slug, id) => {
    navigate(`/league/${slug}/${id}`);
  };

  const handleClickButton = () => {
    setSimulation(match?.live_tracker);
  };

  useEffect(() => {
    Service.MatchLive({ id })
      .then((data) => {
        setMatch(data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  useEffect(() => {
    Service.MatchLiveMeta({ id })
      .then((data) => {
        setMeta(data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <div key={match?.id} className={cx("container")}>
      <div className={cx("header")}>
        <div className={cx("title")}>
          <h2>{match?.name}</h2>
        </div>
      </div>
      <div className={cx("main")}>
        <div className={cx("detail")}>
          <div className={cx("item")}>
            <div className={cx("team-home")}>
              <div className={cx("team-logo")}>
                <Image className={cx("image")} src={match?.home.logo} />
              </div>
              <div className={cx("team-name")}>{match?.home.name}</div>
            </div>
            <div className={cx("info")}>
              <div className={cx("league")}>
                <div className={cx("image-league")}>
                  <Image
                    className={cx("img-league")}
                    src={match?.tournament.logo}
                  />
                </div>
                <div className={cx("league-name")}>
                  {match?.tournament.name}
                </div>
              </div>
              <div className={cx("result")}>
                <div>{match?.scores.home}</div>
                <div>-</div>
                <div>{match?.scores.away}</div>
              </div>
              <div className={cx("time-loaded")}>{/* {match.time_str} */}</div>
            </div>
            <div className={cx("team-away")}>
              <div className={cx("team-logo")}>
                <Image className={cx("image")} src={match?.away.logo} />
              </div>
              <div className={cx("team-name")}>{match?.away.name}</div>
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
                    onClick={handleClickButton}
                  >
                    Mô phỏng
                  </Button>

                  {meta?.play_urls?.map((link, index) => (
                    <Button
                      disabled
                      key={index}
                      className={cx("button")}
                      bet
                      small
                      leftIcon={<FontAwesomeIcon icon={faArrowRight} />}
                      onClick={() => setLink(link.url)}
                    >
                      {link.name}
                    </Button>
                  ))}
                </div>
                <div className={cx("screen")}>
                  <ReactPlayer
                    url={link}
                    controls={true}
                    width="100%"
                    height="100%"
                  />
                  {simulation && (
                    <div>
                      <iframe
                        src={simulation}
                        className={cx("simulation")}
                        title="simulation"
                      ></iframe>
                    </div>
                  )}
                </div>
              </div>
              <BoxChat />
            </div>
            <div className={cx("lf-bottom")}>
              {meta?.commentators?.length === 0 ? (
                <></>
              ) : meta?.commentators === null ? (
                <></>
              ) : (
                <div className={cx("commentators")}>
                  {meta?.commentators?.map((item, index) => (
                    <div key={index} className={cx("ct-item")}>
                      <div className={cx("ct-image")}>
                        <Image className={cx("ct-img")} src={item.avatar} />
                      </div>
                      <div className={cx("ct-title")}>
                        <span>Bình luận viên</span>
                        <div className={cx("ct-name")}>{item.name}</div>
                      </div>
                      <FontAwesomeIcon
                        className={cx("ct-icon")}
                        icon={faMicrophone}
                      />
                    </div>
                  ))}
                </div>
              )}
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
              <div className={cx("sbi-item")}>Thời gian diễn ra :</div>
              <div className={cx("sbi-item")}>
                Giải đấu :
                <div
                  className={cx("sbi-tour")}
                  onClick={() =>
                    handleClick(
                      match?.tournament.unique_tournament.slug,
                      match?.tournament.unique_tournament.id
                    )
                  }
                >
                  {match?.tournament.name}
                </div>
              </div>
            </div>
            <div className={cx("sidebar-logo-match")}>
              <Image className={cx("sideber-img")} src={match?.home.logo} />
              <div>VS</div>
              <Image className={cx("sideber-img")} src={match?.away.logo} />
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
  );
}

export default Match;
