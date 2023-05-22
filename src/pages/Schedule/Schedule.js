import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import * as dayjs from "dayjs";

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
      dayjs().date(),
  },
  {
    date:
      dayjs().date(dayjs().date() + 1).$D +
      "/" +
      month[dayjs().date(dayjs().date() + 1).$M],
    to:
      dayjs().date(dayjs().date()).$y +
      month[dayjs().date(dayjs().date() + 1).$M] +
      dayjs().date(dayjs().date() + 1).$D,
  },
  {
    date:
      dayjs().date(dayjs().date() + 2).$D +
      "/" +
      month[dayjs().date(dayjs().date() + 2).$M],
    to:
      dayjs().date(dayjs().date()).$y +
      month[dayjs().date(dayjs().date() + 2).$M] +
      dayjs().date(dayjs().date() + 2).$D,
  },
  {
    date:
      dayjs().date(dayjs().date() + 3).$D +
      "/" +
      month[dayjs().date(dayjs().date() + 3).$M],
    to:
      dayjs().date(dayjs().date()).$y +
      month[dayjs().date(dayjs().date() + 3).$M] +
      dayjs().date(dayjs().date() + 3).$D,
  },
];

function Schedule() {
  const [active, setActive] = useState(
    dayjs().date(dayjs().date()).$y +
      month[dayjs().date(dayjs().date()).$M] +
      dayjs().date()
  );
  const [schedulePageTo, setSchedulePageTo] = useState(active);
  const [schedule, setSchedule] = useState([]);

  const handleSchedulePageDay = ({ item }) => {
    setActive(item.to);
    setSchedulePageTo(item.to);
  };

  useEffect(() => {
    Service.SchedulePageDay({ to: schedulePageTo })
      .then((data) => {
        setSchedule(data);
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
          {schedule.map((data) => (
            <BoxLeague data={data} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Schedule;
