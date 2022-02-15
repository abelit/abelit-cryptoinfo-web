import http from "@/utils/request";

export function login(data: any) {
  return http.request({
    url: "/account/login",
    method: "post",
    data,
  });
}

export function register(data: any) {
  return http.request({
    url: "/account/register",
    method: "post",
    data,
  });
}
