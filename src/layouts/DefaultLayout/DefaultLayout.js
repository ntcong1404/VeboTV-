import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import Header from "./Header";
import Background from "./Background";
import Footer from "./Footer";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
      <div>
        <Header />
      </div>
      <div className={cx("container")}>
        <Background />
        <div className={cx("content")}>{children}</div>
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
