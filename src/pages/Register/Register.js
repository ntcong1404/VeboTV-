import classNames from "classnames/bind";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "./Register.module.scss";
import Image from "../../components/Image";
import Button from "../../components/Button";
import images from "../../assets/images";
import config from "../../config";
import { UserAuth } from "../../context/AuthContext";

const cx = classNames.bind(styles);

const schema = yup
  .object({
    Name: yup.string().required(),
    Email: yup.string().email().required(),
    Password: yup.string().min(6).max(20).required(),
    ConfirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("Password")], "Passwords do not match"),
  })
  .required();

function Register() {
  const navigate = useNavigate();
  const { createUser } = UserAuth();

  const [showPass, setShowPass] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const registerUser = async (e) => {
    try {
      await createUser(email, pass)
        .then(() =>
          setInterval(() => {
            navigate("/");
          }, 500)
        )
        .catch((err) => setErrorMessage(err.code));
    } catch (err) {
      console.log(err);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    registerUser();
  };

  return (
    <div className={cx("container")}>
      <div className={cx("photo")}>
        <Image
          src={images.register}
          alt={images.noImage}
          className={cx("image")}
        />
      </div>
      <div className={cx("main")}>
        <Link to={config.routes.home}>
          <Image
            src={images.logo}
            alt={images.noImage}
            className={cx("logo")}
          />
        </Link>
        <div className={cx("description")}>
          Mời bạn tham gia Vebotv. Hãy chia sẻ những trải nghiệm của bạn để
          Vebotv hoàn thiện hơn.
        </div>
        <div className={cx("noti-err")}>
          {errorMessage === "auth/email-already-in-use" ? (
            <p className={cx("err-message")}>Email đã được sử dụng</p>
          ) : (
            <></>
          )}
        </div>
        <form className={cx("register-form")} onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="Tên hiển thị"
            {...register("Name")}
            onChange={(e) => setName(e.target.value)}
          />
          <p>{errors.Name?.message}</p>
          <input
            placeholder="Email"
            {...register("Email")}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p>{errors.Email?.message}</p>
          <input
            type={showPass ? "text" : "password"}
            placeholder="Mật khẩu"
            {...register("Password")}
            onChange={(e) => setPass(e.target.value)}
          />
          <p>{errors.Password?.message}</p>
          <input
            type={showPass ? "text" : "password"}
            placeholder="Nhập lại mật khẩu"
            {...register("ConfirmPassword")}
          />
          <p>{errors.ConfirmPassword?.message}</p>
          <div className={cx("togglePass")}>
            <input
              type="checkbox"
              onClick={(e) => setShowPass(e.target.checked)}
            />
            <label>{!showPass ? "Hiện mật khẩu" : "Ẩn mật khẩu"}</label>
          </div>
          <Button type="submit" primary className={cx("btn")}>
            Đăng ký mới
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Register;
