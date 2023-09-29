import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import PuffLoader from "react-spinners/PuffLoader";

import * as Service from "../../apiService/Service";
import styles from "./Highlight.module.scss";
import Bookmaker from "../../components/Bookmaker";
import BoxRecord from "../../components/BoxRecord";

const cx = classNames.bind(styles);
function Highlight() {
  const [highlight, setHighlight] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const handlePageClick = (data) => {
    setPage(data.selected + 1);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [page]);

  useEffect(() => {
    setLoading(true);
    Service.HighLight({ page: page })
      .then((data) => {
        setHighlight(data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [page]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("title")}>
          <h2>TỔNG HỢP HIGHLIGHT BÓNG ĐÁ 90PHUT TV</h2>
        </div>
      </div>

      <div className={cx("main")}>
        {loading ? (
          <div className={cx("loading")}>
            <PuffLoader color="gray" size={60} speedMultiplier={1.5} />
          </div>
        ) : (
          <>
            <BoxRecord status="highlight" data={highlight} />
            <div className={cx("bookmaker")}>
              <Bookmaker small />
            </div>
          </>
        )}
      </div>
      <div>
        <ReactPaginate
          previousLabel={<FontAwesomeIcon icon={faArrowLeft} />}
          nextLabel={<FontAwesomeIcon icon={faArrowRight} />}
          pageCount={Math.ceil(highlight.total / highlight.limit)}
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

export default Highlight;
