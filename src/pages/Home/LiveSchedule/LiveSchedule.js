import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import * as dayjs from "dayjs";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

import Update from "../../../hooks";
import styles from "./LiveSchedule.module.scss";
import Button from "../../../components/Button";
import * as Service from "../../../apiService/Service";
import BoxLeague from "../../../components/BoxLeague";
import { format } from "prettier";

const cx = classNames.bind(styles);

const day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const month = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
const date = [
  {
    date: dayjs()
      .date(dayjs().date() - 1)
      .format("DD"),
    day: day[dayjs().date(dayjs().date() - 1).$W],
    to:
      dayjs().date(dayjs().date()).$y +
      month[dayjs().date(dayjs().date() - 1).$M] +
      dayjs()
        .date(dayjs().date() - 1)
        .format("DD"),
  },
  {
    date: dayjs().date(dayjs().date()).format("DD"),
    day: "Hôm nay",
    to:
      dayjs().date(dayjs().date()).$y +
      month[dayjs().date(dayjs().date()).$M] +
      dayjs().date(dayjs().date()).format("DD"),
  },
  {
    date: dayjs()
      .date(dayjs().date() + 1)
      .format("DD"),
    day: day[dayjs().date(dayjs().date() + 1).$W],
    to:
      dayjs().date(dayjs().date()).$y +
      month[dayjs().date(dayjs().date() + 1).$M] +
      dayjs()
        .date(dayjs().date() + 1)
        .format("DD"),
  },
  {
    date: dayjs()
      .date(dayjs().date() + 2)
      .format("DD"),
    day: day[dayjs().date(dayjs().date() + 2).$W],
    to:
      dayjs().date(dayjs().date()).$y +
      month[dayjs().date(dayjs().date() + 2).$M] +
      dayjs()
        .date(dayjs().date() + 2)
        .format("DD"),
  },
  {
    date: dayjs()
      .date(dayjs().date() + 3)
      .format("DD"),
    day: day[dayjs().date(dayjs().date() + 3).$W],
    to:
      dayjs().date(dayjs().date()).$y +
      month[dayjs().date(dayjs().date() + 3).$M] +
      dayjs()
        .date(dayjs().date() + 3)
        .format("DD"),
  },
];

function LiveSchedule() {
  console.log(dayjs().date(dayjs().date()).format("DD"));

  const [active, setActive] = useState(
    dayjs().date(dayjs().date()).$y +
      month[dayjs().date(dayjs().date()).$M] +
      dayjs().date(dayjs().date()).format("DD")
  );
  const [liveScheduleTo, setLiveScheduleTo] = useState(active);
  const [liveScheduleResult, setLiveScheduleResult] = useState([]);
  const [live, setLive] = useState([]);

  const handleLive = () => {
    setActive();
    setLiveScheduleResult(live);
  };

  const handleLiveSchedule = ({ item }) => {
    setActive(item.to);
    setLiveScheduleTo(item.to);
  };

  useEffect(() => {
    Service.LiveScheduleAllDay()
      .then((data) => {
        const resultLive = data.data.filter(
          (match) => match.match_status === "live"
        );
        setLive(resultLive);
      })

      .catch((error) => console.log(error));
  }, [Update()]);

  useEffect(() => {
    Service.LiveScheduleDay({ to: liveScheduleTo })
      .then((data) => {
        const res = data.sort(
          (a, b) => b.tournament.priority - a.tournament.priority
        );
        setLiveScheduleResult(res);
      })
      .catch((error) => console.log(error));
  }, [liveScheduleTo]);

  return (
    <div className={cx("container")}>
      <div className={cx("match-date")}>
        <div className={cx("live")}>
          <Button user xsmall onClick={handleLive} className={cx("btn-live")}>
            LIVE
          </Button>
          <div className={cx("badg")}>{live.length}</div>
        </div>
        <div className={cx("date-list")}>
          {date.map((item, index) => (
            <div
              key={index}
              onClick={() => handleLiveSchedule({ item, index })}
              className={cx("date-item", {
                active: active === item.to ? "active" : "",
              })}
            >
              <div className={cx("day")}>{item.date}</div>
              <div className={cx("week")}>{item.day}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        {liveScheduleResult.map((league) => (
          <BoxLeague key={league.id} data={league} />
        ))}
      </div>
      <NavLink to={"/schedule"} className={cx("load-more")}>
        <FontAwesomeIcon icon={faArrowDown} className={cx("load-icon")} />
        Xem thêm
      </NavLink>
    </div>
  );
}

export default LiveSchedule;
