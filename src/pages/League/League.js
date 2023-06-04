import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as Service from "../../apiService/Service";
import styles from "./League.module.scss";
import Image from "../../components/Image";
import BoxMatch from "../../components/BoxMatch";
import Bookmaker from "../../components/Bookmaker";
import BoxLeague from "../../components/BoxLeague";
import {
  faCalendar,
  faList,
  faSoccerBall,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function League() {
  const { id } = useParams();

  const [title, setTitle] = useState("featured");
  const [league, setLeague] = useState([]);
  const [leagueFeatured, setLeagueFeatured] = useState([]);

  useEffect(() => {
    Service.League({ id })
      .then((res) => {
        setLeague(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  useEffect(() => {
    Service.LeagueFeatured({ title, id })
      .then((res) => {
        setLeagueFeatured(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [title, id]);

  const handlefeatured = () => {
    setTitle("featured");
  };
  const handleResult = () => {
    setTitle("result");
  };
  const handleSchedule = () => {
    setTitle("fixture");
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("header")}>
          <div className={cx("title")}>
            <h2>TRỰC TIẾP GIẢI ĐẤU {league.name}</h2>
          </div>
        </div>
        <div className={cx("sidebar")}>
          <div className={cx("banner")}>
            <div className={cx("banner-logo")}>
              <Image className={cx("logo-img")} src={league.logo} />
            </div>
            <div className={cx("banner-text")}>
              <span className={cx("country")}>
                {league.country !== undefined && league.country.name}
              </span>
              <span className={cx("name")}>{league.name}</span>
            </div>
            <div className={cx("cover")}>
              <div className={cx("cover-img")}></div>
            </div>
          </div>
          <div className={cx("nav-list")}>
            <NavLink
              onClick={handlefeatured}
              to={`/league/${league.slug}/${id}`}
              className={(nav) => cx("nav-item", { active: nav.isActive })}
            >
              TỔNG QUAN
            </NavLink>
            <NavLink
              onClick={handleResult}
              to={`/league/ket-qua-${league.slug}/${id}`}
              className={(nav) => cx("nav-item", { active: nav.isActive })}
            >
              KẾT QUẢ
            </NavLink>
            <NavLink
              onClick={handleSchedule}
              to={`/league/lich-thi-dau-${league.slug}/${id}`}
              className={(nav) => cx("nav-item", { active: nav.isActive })}
            >
              LỊCH THI ĐẤU
            </NavLink>
          </div>
        </div>
        <div className={cx("content")}>
          <div className={cx("match-featured")}>
            <div className={cx("mf-header")}>
              {title === "featured" ? (
                <>
                  <FontAwesomeIcon
                    className={cx("mfh-icon")}
                    icon={faSoccerBall}
                  />
                  TRẬN CẦU TÂM ĐIỂM
                </>
              ) : title === "result" ? (
                <>
                  <FontAwesomeIcon className={cx("mfh-icon")} icon={faList} />
                  KẾT QUẢ
                </>
              ) : title === "fixture" ? (
                <>
                  <FontAwesomeIcon
                    className={cx("mfh-icon")}
                    icon={faCalendar}
                  />
                  LỊCH THI ĐẤU
                </>
              ) : (
                ""
              )}
            </div>
            <div className={cx("mf-content")}>
              {title === "featured"
                ? leagueFeatured?.map((data) => (
                    <BoxMatch large key={data.id} data={data} />
                  ))
                : leagueFeatured?.map((data) => (
                    <BoxLeague large key={data.id} data={data} />
                  ))}
            </div>
          </div>
          <div className={cx("ads")}>
            <Bookmaker small />
          </div>
        </div>
      </div>
    </div>
  );
}

export default League;
