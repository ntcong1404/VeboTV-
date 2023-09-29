import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import * as dayjs from "dayjs";
import PuffLoader from "react-spinners/PuffLoader";

import styles from "./Result.module.scss";
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
    date:
      dayjs()
        .date(dayjs().date() - 3)
        .format("DD") +
      "-" +
      month[dayjs().date(dayjs().date() - 3).$M],
    to:
      dayjs().date(dayjs().date()).$y +
      month[dayjs().date(dayjs().date() - 3).$M] +
      dayjs()
        .date(dayjs().date() - 3)
        .format("DD"),
  },
  {
    date:
      dayjs()
        .date(dayjs().date() - 2)
        .format("DD") +
      "-" +
      month[dayjs().date(dayjs().date() - 2).$M],
    to:
      dayjs().date(dayjs().date()).$y +
      month[dayjs().date(dayjs().date() - 2).$M] +
      dayjs()
        .date(dayjs().date() - 2)
        .format("DD"),
  },
  {
    date:
      dayjs()
        .date(dayjs().date() - 1)
        .format("DD") +
      "-" +
      month[dayjs().date(dayjs().date() - 1).$M],
    to:
      dayjs().date(dayjs().date()).$y +
      month[dayjs().date(dayjs().date() - 1).$M] +
      dayjs()
        .date(dayjs().date() - 1)
        .format("DD"),
  },
  {
    date: "Hôm nay",
    to:
      dayjs().date(dayjs().date()).$y +
      month[dayjs().date(dayjs().date()).$M] +
      dayjs().date(dayjs().date()).format("DD"),
  },
];

function Result() {
  const [active, setActive] = useState(
    dayjs().date(dayjs().date()).$y +
      month[dayjs().date(dayjs().date()).$M] +
      dayjs().date(dayjs().date()).format("DD")
  );

  const [resultPageTo, setResultPageTo] = useState(active);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSchedulePageDay = ({ item }) => {
    setActive(item.to);
    setResultPageTo(item.to);
  };

  useEffect(() => {
    setLoading(true);
    Service.SchedulePageDay({ to: resultPageTo })
      .then((data) => {
        const res = data.sort(
          (a, b) => b.tournament.priority - a.tournament.priority
        );
        setResult(res);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [resultPageTo]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("title")}>
          <h2>
            KẾT QUẢ BÓNG ĐÁ{" "}
            {dayjs().date() + "-" + month[dayjs().date(dayjs().date()).$M]} MỚI
            NHẤT
          </h2>
        </div>
        <div className={cx("desc")}>
          Kết quả bóng đá mới nhất sẽ được cập nhật liên tục 24h
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
              {result.map((data, index) => (
                <BoxLeague key={index} data={data} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Result;
