import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";

import styles from "./BoxRecord.module.scss";
import Image from "../../components/Image";

const cx = classNames.bind(styles);

function BoxRecord({ status, data }) {
  const navigate = useNavigate();

  const handleClick = (slug, id) => {
    navigate(`/${status}/${slug}/${id}`);
  };

  return (
    <div className={cx("content")}>
      {data.page === 1 && (
        <>
          <div className={cx("replay-highlight")}>
            <div className={cx("highlight-img")}>
              <Image
                className={cx("hl-image")}
                src={data.highlight.feature_image}
                onClick={() =>
                  handleClick(data.highlight?.slug, data.highlight?.id)
                }
              />
            </div>
            <div className={cx("highlight-content")}>
              <div
                className={cx("highlight-name")}
                onClick={() =>
                  handleClick(data.highlight?.slug, data.highlight?.id)
                }
              >
                {data.highlight?.name}
              </div>
              <div className={cx("highlight-desc")}>
                {data.highlight?.description}
              </div>
            </div>
          </div>
        </>
      )}
      <div className={cx("replay-list")}>
        {data.list?.map((item) => (
          <div className={cx("replay-item")} key={item.id}>
            <div className={cx("item-img")}>
              <Image
                className={cx("it-image")}
                src={item.feature_image}
                onClick={() => handleClick(item.slug, item.id)}
              />
            </div>
            <div
              className={cx("replay-name")}
              onClick={() => handleClick(item.slug, item.id)}
            >
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

BoxRecord.propTypes = {
  status: PropTypes.string,
};

export default BoxRecord;
