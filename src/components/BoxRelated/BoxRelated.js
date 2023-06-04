import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./BoxRelated.module.scss";
import Image from "../Image";
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function BoxRelated({ status, data }) {
  const navigate = useNavigate();

  const handleClick = (slug, id) => {
    navigate(`/${status}/${slug}/${id}`);
    window.location.reload();
  };

  return (
    <div className={cx("related-list")}>
      {data?.map((item, index) => (
        <div key={index} className={cx("related-item")}>
          <div className={cx("ri-image")}>
            <Image
              onClick={() => handleClick(item.slug, item.id)}
              className={cx("ri-img")}
              src={item.feature_image}
            />
          </div>
          <FontAwesomeIcon className={cx("ri-icon")} icon={faQuoteRight} />
          <div
            onClick={() => handleClick(item.slug, item.id)}
            className={cx("ri-desc")}
          >
            {item.name}
          </div>
        </div>
      ))}
    </div>
  );
}

BoxRelated.propTypes = {
  status: PropTypes.string,
};

export default BoxRelated;
