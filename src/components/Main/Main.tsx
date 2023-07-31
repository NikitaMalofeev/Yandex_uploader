import React, {FC} from 'react'
import style from './main.module.scss'
import FileUploader from '../FileUploader/FileUploader'

const Main:FC = () => {
  return (
    <div className={style.main}>
        <FileUploader/>
    </div>
  )
}

export default Main