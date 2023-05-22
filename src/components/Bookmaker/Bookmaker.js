import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import * as Service from "../../apiService/Service";
import { Markup } from "interweave";

import styles from "./Bookmaker.module.scss";
import Image from "../Image";
import Button from "../Button";

const cx = classNames.bind(styles);

function Bookmaker({ small }) {
  const [sidebarAds, setSidebarAds] = useState([]);

  useEffect(() => {
    Service.SidebarAds()
      .then((data) => {
        setSidebarAds(data);
      })
      .catch((error) => console.log(error));
  }, []);
  return sidebarAds.map((data) => (
    <>
      <div className={cx("bookmaker-item", { small })}>
        <div className={cx("info-bookmaker")}>
          <a href={data.href}>
            <Image className={cx("bookmaker-img")} src={data.src} />
          </a>
          <div className={cx("title")}>
            <h3 className={cx("name")}>{data.name}</h3>
            {small ? (
              <></>
            ) : (
              <>
                <p className={cx("decs")}>
                  {<Markup content={data.content} />}
                </p>
              </>
            )}
          </div>
        </div>
        <Button bet large to={""} className={cx("bookmaker-btn")}>
          Cược ngay
        </Button>
      </div>
    </>
  ));
}

export default Bookmaker;
