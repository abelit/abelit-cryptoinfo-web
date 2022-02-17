import http from "@/utils/request";

export function getAccountList() {
  return http.request({
    url: "/account/list",
    method: "get",
  });
}

export function getAccountPassword(data: any) {
  return http.request({
    url: "/account/password",
    method: "post",
    data,
  });
}
