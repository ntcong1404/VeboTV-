import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import * as dayjs from "dayjs";
import PuffLoader from "react-spinners/PuffLoader";

import styles from "./Schedule.module.scss";
import * as Service from "../../apiService/Service";
import BoxLeague from "../../components/BoxLeague";

const cx = classNames.bind(styles);

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
    date: "Hôm nay",
    to:
      dayjs().date(dayjs().date()).$y +
      month[dayjs().date(dayjs().date()).$M] +
      dayjs().date(dayjs().date()).format("DD"),
  },
  {
    date:
      dayjs()
        .date(dayjs().date() + 1)
        .format("DD") +
      "/" +
      month[dayjs().date(dayjs().date() + 1).$M],
    to:
      dayjs().date(dayjs().date()).$y +
      month[dayjs().date(dayjs().date() + 1).$M] +
      dayjs()
        .date(dayjs().date() + 1)
        .format("DD"),
  },
  {
    date:
      dayjs()
        .date(dayjs().date() + 2)
        .format("DD") +
      "/" +
      month[dayjs().date(dayjs().date() + 2).$M],
    to:
      dayjs().date(dayjs().date()).$y +
      month[dayjs().date(dayjs().date() + 2).$M] +
      dayjs()
        .date(dayjs().date() + 2)
        .format("DD"),
  },
  {
    date:
      dayjs()
        .date(dayjs().date() + 3)
        .format("DD") +
      "/" +
      month[dayjs().date(dayjs().date() + 3).$M],
    to:
      dayjs().date(dayjs().date()).$y +
      month[dayjs().date(dayjs().date() + 3).$M] +
      dayjs()
        .date(dayjs().date() + 3)
        .format("DD"),
  },
];

function Schedule() {
  const [active, setActive] = useState(
    dayjs().date(dayjs().date()).$y +
      month[dayjs().date(dayjs().date()).$M] +
      dayjs().date(dayjs().date()).format("DD")
  );
  const [schedulePageTo, setSchedulePageTo] = useState(active);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSchedulePageDay = ({ item }) => {
    setActive(item.to);
    setSchedulePageTo(item.to);
  };

  useEffect(() => {
    setLoading(true);
    Service.SchedulePageDay({ to: schedulePageTo })
      .then((data) => {
        const res = data.sort(
          (a, b) => b.tournament.priority - a.tournament.priority
        );
        setSchedule(res);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [schedulePageTo]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("title")}>
          <h2>LỊCH TRỰC TIẾP BÓNG ĐÁ CẬP NHẬT NHANH NHẤT</h2>
        </div>
        <div className={cx("desc")}>
          Lịch trực tiếp bóng đá mới nhất sẽ được cập nhật liên tục 24h. Cứ khi
          nào có bóng đá thì BXH cũng sẽ được cập nhật ngay trong giờ đấu đang
          diễn ra. Các fan hâm mộ có thể theo dõi nhiều hơn nữa BXH các giải nhỏ
          cho tới giải to trên toàn thế giới tại VeBo.tv.
        </div>
      </div>
      <div className={cx("main")}>
        <div className={cx("date")}>
          <div className={cx("date-list")}>
            {date.map((item, index) => (
              <div
                key={index}
                onClick={() => handleSchedulePageDay({ item, index })}
                className={cx("date-item", {
                  active: active === item.to ? "active" : "",
                })}
              >
                <div className={cx("day")}>{item.date}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={cx("match-list")}>
          {loading ? (
            <div className={cx("loading")}>
              <PuffLoader color="gray" size={60} speedMultiplier={1.5} />
            </div>
          ) : (
            <div>
              {schedule.map((data, index) => (
                <BoxLeague key={index} data={data} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Schedule;
