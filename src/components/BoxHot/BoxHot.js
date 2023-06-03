import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";

import styles from "./BoxHot.module.scss";
import Image from "../Image";

const cx = classNames.bind(styles);

function BoxHot({ status, data }) {
  const navigate = useNavigate();

  const handleClick = (slug, id) => {
    navigate(`/${status}/${slug}/${id}`);
    window.location.reload();
  };

  return data?.map((item, index) => (
    <>
      <div key={index} className={cx("boxhot-item")}>
        <div className={cx("content")}>
          <div className={cx("boxhot-image")}>
            <Image
              onClick={() => handleClick(item.slug, item.id)}
              className={cx("img")}
              src={item.feature_image}
            />
          </div>
          <div className={cx("desc")}>
            <p onClick={() => handleClick(item.slug, item.id)}>{item.name}</p>
          </div>
        </div>
      </div>
    </>
  ));
}

export default BoxHot;
