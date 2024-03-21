import * as request from "../utils/request";
import axios from "axios";

// thiếu: mỗi n giây sẽ  update lại component(xử lí trong component)

export const Leagues = async () => {
  try {
    const res = await request.get("tournament/menu");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const League = async ({ id }) => {
  try {
    const res = await request.get(`tournament/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const LeagueFeatured = async ({ title, id }) => {
  try {
    const res = await request.get(`tournament/${title}/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const MatchFeatured = async () => {
  try {
    const res = await request.get("match/featured");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const LiveScheduleDay = async ({ to }) => {
  try {
    const res = await request.get(`match/fixture/home/${to}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const SchedulePageDay = async ({ to }) => {
  try {
    const res = await request.get(`match/fixture/${to}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const LiveScheduleAllDay = async () => {
  try {
    const res = await axios
      .create({
        baseURL: "https://live.vebo.xyz/api/match/live",
      })
      .get();
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const News = async () => {
  try {
    const res = await request.get("news/vebotv/home");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const SidebarAds = async () => {
  try {
    const res = await request.get("a/vebotv/bh");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const About = async () => {
  try {
    const res = await request.get("news/vebotv/about");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const NewsPage = async ({ page }) => {
  try {
    const res = await request.get(`news/vebotv/list/news/${page}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const HighLight = async ({ page }) => {
  try {
    const res = await request.get(`news/vebotv/list/highlight/${page}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const SearchHighLight = async ({ q }) => {
  try {
    const res = await request.get(`news/vebotv/search/highlight/${q}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const SearchReplay = async ({ q }) => {
  try {
    const res = await request.get(`news/vebotv/search/xemlai/${q}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const Replay = async ({ page }) => {
  try {
    const res = await request.get(`news/vebotv/list/xemlai/${page}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const Scrutiny = async ({ page }) => {
  try {
    const res = await request.get(`news/vebotv/list/soikeo/${page}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const MatchLive = async ({ id }) => {
  try {
    const res = await request.get(`match/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const MatchLiveMeta = async ({ id }) => {
  try {
    const res = await request.get(`match/${id}/meta`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const RecordMatch = async ({ id }) => {
  try {
    const res = await request.get(`news/vebotv/detail/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
