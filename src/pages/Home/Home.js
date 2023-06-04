import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";
import {
  faFacebook,
  faInstagram,
  faLine,
  faLinkedin,
  faPinterest,
  faTelegram,
  faTumblr,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faArrowDown,
  faPlus,
  faQuoteRight,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Markup } from "interweave";

import styles from "./Home.module.scss";
import images from "../../assets/images";
import Image from "../../components/Image";

import BoxMatch from "../../components/BoxMatch";
import * as Service from "../../apiService/Service";

import LiveSchedule from "./LiveSchedule";
import Bookmaker from "../../components/Bookmaker";

const cx = classNames.bind(styles);

const socialInset = [
  {
    title: "Linkedin",
    icon: <FontAwesomeIcon icon={faLinkedin} />,
  },
  {
    title: "Line",
    icon: <FontAwesomeIcon icon={faLine} />,
  },
  {
    title: "Tumblr",
    icon: <FontAwesomeIcon icon={faTumblr} />,
  },
  {
    title: "Pinterest",
    icon: <FontAwesomeIcon icon={faPinterest} />,
  },
  {
    title: "Youtube",
    icon: <FontAwesomeIcon icon={faYoutube} />,
  },
];

function Home() {
  const [matchFeatured, setMatchFeatured] = useState([]);
  const [news, setNews] = useState([]);
  const [about, setAbout] = useState([]);

  useEffect(() => {
    // const fetchApi = async () => {
    //   const matches = await Service.MatchFeatured();
    //   setMatchFeatured(matches);
    // };
    // fetchApi();
    Service.MatchFeatured()
      .then((data) => {
        setMatchFeatured(data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    Service.News()
      .then((data) => {
        setNews(data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    Service.About()
      .then((data) => {
        setAbout(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const renderSocialList = (attrs) => (
    <div className={cx("social-list-inset")} tabIndex="-1" {...attrs}>
      {socialInset.map((item, index) => (
        <div key={index} className={cx("social-item-inset")}>
          <div className={cx("inset-icon")}>{item.icon}</div>
          <p>{item.title}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className={cx("body")}>
      <div className={cx("introduce")}>
        <div className={cx("container")}>
          <div className={cx("intro-content")}>
            <h1 className={cx("headline")}>
              <span className={cx("hightline")}>VEBOTV</span> : XEM
              <span className={cx("hightline")}> TRỰC TIẾP BÓNG ĐÁ </span>
              MIỄN PHÍ NHANH NHẤT
            </h1>
            <div className={cx("description")}>
              <p>
                VeBoTV là kênh cập nhật link xem trực tiếp bóng đá cho Fan hâm
                mộ Việt Nam và Quốc tế qua kết nối Internet. Xem bóng đá trực
                tuyến với trên VeBo TV đường truyền tốc độ cao, không giật lag
                tất cả các trận đấu lớn nhỏ trên toàn cầu.
              </p>
            </div>
          </div>
          <div className={cx("intro-img")}>
            <Image
              className={cx("image")}
              loading="lazy"
              src={images.backgroundImage}
            />
          </div>
        </div>
      </div>
      <div className={cx("match-trending")}>
        <div className={cx("box-header")}>
          <div className={cx("title")}>
            <h2>TRẬN CẦU TÂM ĐIỂM</h2>
          </div>
          <div className={cx("social")}>
            <div className={cx("social-list")}>
              <div className={cx("social-item")}>
                <FontAwesomeIcon icon={faFacebook} />
              </div>
              <div className={cx("social-item")}>
                <FontAwesomeIcon icon={faInstagram} />
              </div>
              <div className={cx("social-item")}>
                <FontAwesomeIcon icon={faTwitter} />
              </div>
              <div className={cx("social-item")}>
                <FontAwesomeIcon icon={faTelegram} />
              </div>
              <div>
                <Tippy
                  interactive
                  offset={[12, 8]}
                  placement="bottom-end"
                  render={renderSocialList}
                >
                  <div className={cx("social-item")}>
                    <FontAwesomeIcon icon={faPlus} />
                  </div>
                </Tippy>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("box-content")}>
          {matchFeatured?.map((match) => (
            <BoxMatch key={match.id} data={match} />
          ))}
        </div>
      </div>
      <div className={cx("main")}>
        <div className={cx("live-schedule")}>
          <div className={cx("box-header")}>
            <div className={cx("title")}>
              <h2>LỊCH TRỰC TIẾP</h2>
            </div>
          </div>
          <LiveSchedule />
        </div>
        <div className={cx("bookmaker")}>
          <div className={cx("box-header")}>
            <div className={cx("title")}>
              <h2>NHÀ CÁI UY TÍN</h2>
            </div>
          </div>
          <div className={cx("bookmaker-list")}>
            <Bookmaker />
          </div>
        </div>
      </div>
      <div className={cx("news")}>
        <div className={cx("box-header")}>
          <div className={cx("title")}>
            <h2>TIN TỨC BÓNG ĐÁ HÔM NAY</h2>
          </div>
        </div>
        <div className={cx("news-content")}>
          <div className={cx("news-list")}>
            {news?.map((item) => (
              <div key={item.id} className={cx("news-item")}>
                <div className={cx("news-image")}>
                  <Image
                    loading="lazy"
                    src={item.feature_image}
                    className={cx("news-img")}
                  />
                </div>
                <FontAwesomeIcon
                  className={cx("news-icon")}
                  icon={faQuoteRight}
                />
                <div className={cx("news-title")}>{item.name}</div>
              </div>
            ))}
          </div>
        </div>
        <NavLink to={"/news"} className={cx("load-more")}>
          <FontAwesomeIcon icon={faArrowDown} className={cx("load-icon")} />
          Xem thêm
        </NavLink>
      </div>
      <div className={cx("about")}>
        <div className={cx("about-content")}>
          <Markup content={about.data} />
        </div>
      </div>
    </div>
  );
}
export default Home;
