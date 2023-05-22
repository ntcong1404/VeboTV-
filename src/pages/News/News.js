import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Image from "../../components/Image";
import Bookmaker from "../../components/Bookmaker";
import styles from "./News.module.scss";
import * as Service from "../../apiService/Service";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function News() {
  const [news, setNews] = useState([]);
  const [changePage, setChangePage] = useState(1);

  const handlePageClick = (data) => {
    setChangePage(data.selected + 1);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [changePage]);

  useEffect(() => {
    Service.NewsPage({ page: changePage })
      .then((data) => {
        setNews(data);
      })
      .catch((error) => console.log(error));
  }, [changePage]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("title")}>
          <h2>TIN TỨC</h2>
        </div>
      </div>
      <div className={cx("main")}>
        <div className={cx("content")}>
          {news.page === 1 && (
            <>
              <div className={cx("news-highlight")}>
                <div className={cx("highlight-img")}>
                  <Image
                    className={cx("hl-image")}
                    src={news.highlight.feature_image}
                  />
                </div>
                <div className={cx("highlight-content")}>
                  <div className={cx("highlight-name")}>
                    {news.highlight.name}
                  </div>
                  <div className={cx("highlight-desc")}>
                    {news.highlight.description}
                  </div>
                </div>
              </div>
            </>
          )}
          <div className={cx("news-list")}>
            {news.list?.map((item) => (
              <>
                <div className={cx("news-item")} key={item.id}>
                  <div className={cx("item-img")}>
                    <Image
                      className={cx("it-image")}
                      src={item.feature_image}
                    />
                  </div>
                  <div className={cx("highlight-name")}>{item.name}</div>
                </div>
              </>
            ))}
          </div>
        </div>
        <div className={cx("bookmaker")}>
          <Bookmaker small />
        </div>
      </div>
      <div>
        <ReactPaginate
          previousLabel={<FontAwesomeIcon icon={faArrowLeft} />}
          nextLabel={<FontAwesomeIcon icon={faArrowRight} />}
          pageCount={news.total}
          marginPagesDisplayed={0}
          pageRangeDisplayed={6}
          onPageChange={handlePageClick}
          containerClassName={cx("pagination")}
          pageClassName={cx("page-item")}
          pageLinkClassName={cx("page-link")}
          previousClassName={cx("page-item")}
          previousLinkClassName={cx("page-link")}
          breakClassName={cx("break-item")}
          nextClassName={cx("page-item")}
          nextLinkClassName={cx("page-link")}
          activeClassName={cx("active")}
          disabledClassName={cx("disabled")}
        />
      </div>
    </div>
  );
}

export default News;
