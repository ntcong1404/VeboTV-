import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import Header from "./Header";
import Background from "./Background";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 1000) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className={cx("wrapper")}>
      <div>
        <Header />
      </div>
      <div className={cx("container")}>
        <Background />
        <div className={cx("content")}>
          {children}
          {isVisible ? (
            <button onClick={scrollToTop} className={cx("btn-totop")}>
              <FontAwesomeIcon className={cx("icon-totop")} icon={faArrowUp} />
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
