import * as React from "react";
import { Button, Upload } from "antd";
import "./styles.css";
import "antd/dist/antd.css";

import CropDemo from "./CropDemo";

export default function App() {
  return (
    <div className="App">
      <Upload>
        <Button>上传文件</Button>
      </Upload>
      <CropDemo src="https://g0.market.mi-img.com/download/webp/GlobalGameBooster/0efd394e2a36c42ab3ea31cbf6609a56841097746/a.png" />
      <Button>完成并上传</Button>
    </div>
  );
}
