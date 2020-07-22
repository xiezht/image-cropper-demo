import React, { useState } from "react";
import { Button, Upload } from "antd";
import "./styles.css";
import "antd/dist/antd.css";

import CropDemo from "./CropDemo";
import { RcFile } from "antd/lib/upload";

export default function App() {
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<RcFile[]>([]);

  const beforeUpload = (file: RcFile) => {
    setFiles((oldFiles: RcFile[]) => {
      return [...oldFiles, file];
    });
    return false;
  };

  return (
    <div className="App">
      <Upload fileList={files} beforeUpload={beforeUpload}>
        <Button>上传文件</Button>
      </Upload>
      <CropDemo src="https://g0.market.mi-img.com/download/webp/GlobalGameBooster/0efd394e2a36c42ab3ea31cbf6609a56841097746/a.png" />
      <div>
        <Button>完成并上传</Button>
      </div>
    </div>
  );
}
