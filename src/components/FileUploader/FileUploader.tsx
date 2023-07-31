import React, { useRef } from "react";
import loadPdfButton from "./loadPdfButton.svg";
import style from "./uploader.module.scss";
import { getUploadUrl, uploadFile } from "../../api";

const FileUploader: React.FC = () => {

  const hiddenFileInput = useRef<HTMLInputElement | null>(null);

  const nameFile = null;

  // Программно вызываем событие клика на скрытом input type="file", когда пользователь
  // кликнет по кастомной кнопке
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (hiddenFileInput.current === null) return;
    hiddenFileInput.current.click();
  };

  const handleChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
    if(!hiddenFileInput.current?.files) return;

    const files = Array.from(hiddenFileInput.current.files);

    const fileNamePromises = files.map((file) => {
      return getUploadUrl(file.name);
    })

    const fileUrls = await Promise.all(fileNamePromises);
    console.log(fileUrls)
    
    const fileUrlsPromises = fileUrls.map((url, index) => {
      if (fileUrls.length > 100 && index > 100) return alert ('Максимальное количество файлов 100');
      return uploadFile(url, files[index])
    })

    Promise.all(fileUrlsPromises)

    
  }

  return (
    <div className={style.fieldLoader} onClick={handleClick} onChange={handleChange}>
      <div className={style.labelBox}>
        <input
          type="file"
          ref={hiddenFileInput}
          accept=".pdf"
          className={style.input}
        />
        <span className={style.label}>
          {nameFile ? nameFile : "Загрузка - JPG, PNG, SVG, до 10 Mb"}
        </span>
        <img src={loadPdfButton} alt="load pdf button" />
      </div>
    </div>
  );
};

export default FileUploader ;
