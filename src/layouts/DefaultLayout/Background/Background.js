import classNames from "classnames/bind";
import styles from "./Background.module.scss";
import images from "../../../assets/images";

const cx = classNames.bind(styles);

function Background() {
  return (
    <div className={cx("background")}>
      <img
        className={cx("background-image")}
        src={images.background}
        alt={images.noImageBackground}
      />
    </div>
  );
}

export default Background;
