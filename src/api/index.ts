

const YANDEX_TOKEN = "y0_AgAAAABVl_UmAApEwQAAAADpHPL2MjcxYoweTHOouY0ujUYLEiz-dqI";

interface IProps {
  url: string;
  method: string;
  data?: unknown;
}

const request = async ({ url, method, data }: IProps) => {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `OAuth ${YANDEX_TOKEN}`,
      Accept: "application/json",
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const res = await fetch(url, options);
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
};
// обернуть в try catch
export const getUploadUrl = async (fileName: string) => {
  const url = `https://cloud-api.yandex.net/v1/disk/resources/upload?path=${fileName}`;

  const { href } = await request({ url, method: "GET" });
  return href;
};

export const uploadFile = async (url: string, file: File) => {
  return request({ url, method: "PUT", data: file });
};
