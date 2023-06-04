import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import { Markup } from "interweave";

import * as Service from "../../apiService/Service";
import styles from "./RecordMatch.module.scss";
import Bookmaker from "../../components/Bookmaker";
import BoxHot from "../../components/BoxHot";
import BoxRelated from "../../components/BoxRelated";

const cx = classNames.bind(styles);

function RecordMatch() {
  const { status, id } = useParams();
  const [data, setData] = useState([]);
  const [dataRelated, setDataRelated] = useState([]);
  const [dataHot, setDataHot] = useState([]);
  useEffect(() => {
    Service.RecordMatch({ id })
      .then((res) => {
        setData(res.data);
        setDataRelated(res.data_related);
        setDataHot(res.data_hot);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("main-left")}>
          <div className={cx("main-part")}>
            <div className={cx("header")}>
              <h2>{data.h1}</h2>
            </div>
            <div className={cx("screen")}>
              <div className={cx("info")}>
                {new Date(data.created_at).toLocaleTimeString() +
                  " ngày " +
                  new Date(data.created_at).toLocaleDateString("DD")}
              </div>
              <div>
                {status === "highlight" ? (
                  <ReactPlayer
                    className={cx("display-screen")}
                    url={data.video_url}
                    controls
                    width="100%"
                    height="100%"
                  />
                ) : status === "replay" ? (
                  <ReactPlayer
                    className={cx("display-screen")}
                    url={data.video_url}
                    controls
                    width="100%"
                    height="100%"
                  />
                ) : status === "scrutiny" ? (
                  <div className={cx("content")}>
                    {<Markup content={data.content} />}
                  </div>
                ) : status === "news" ? (
                  <div className={cx("content")}>
                    {<Markup content={data.content} />}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <div className={cx("desc")}>{data.name}</div>
            </div>
          </div>
          <div className={cx("related")}>
            <div className={cx("header")}>
              <h2>TIN TỨC LIÊN QUAN</h2>
            </div>
            <BoxRelated status={status} data={dataRelated} />
          </div>
        </div>
        <div className={cx("main-right")}>
          <div className={cx("hot")}>
            <div className={cx("header")}>
              <h2>BÀI VIẾT NỔI BẬT</h2>
            </div>
            <BoxHot status={status} data={dataHot} />
          </div>
          <Bookmaker small />
        </div>
      </div>
    </div>
  );
}

export default RecordMatch;
