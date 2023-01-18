import React, { useState, useEffect, useRef } from "react";
import { Button, Upload, message } from "antd";
import "./styles.css";
import "antd/dist/antd.css";

import CropDemo from "./CropDemo";
import { RcFile } from "antd/lib/upload";
import config from './utils';

export default function App() {
  console.log(config);

  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<RcFile[]>([]);
  const [cropImgUrl, setCropImgUrl] = useState('');
  const [previewImg, setPreviewImg] = useState<string>('');

  const cropRef = useRef<any>(null!);

  const beforeUpload = (file: RcFile) => {
    setFiles([file]);
    // 这里不会立即更新state
    // console.log('上传之后更新文件列表', files);
    return false;
  };

  const handleGetCropBlob = async () => {
    try {
      const imgBlob = await cropRef.current.getCropImgBlob();
      setPreviewImg(URL.createObjectURL(imgBlob));
      // console.log('截取图片', imgBlob);
    } catch (err) {
      message.warning(`获取截图失败 ${err.message}`);
    }
  };

  useEffect(() => {
    if (files.length) {
      setCropImgUrl(URL.createObjectURL(files[0]));
    }
  }, [files]);

  return (
    <div className="App">
      <Upload fileList={files} beforeUpload={beforeUpload}>
        <Button>上传文件</Button>
      </Upload>
      <CropDemo src={cropImgUrl} onChange={handleGetCropBlob} ref={cropRef} />
      <div>
        <Button onClick={handleGetCropBlob}>完成并上传</Button>
      </div>
      <div>
        {previewImg && <img src={previewImg} alt=""/>}
      </div>
    </div>
  );
}
