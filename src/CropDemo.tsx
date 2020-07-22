import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
export default function CropDemo(props: { src: string }) {
  const [crop, setCrop] = useState({
    width: 200,
    height: 200,
    disabled: true,
    locked: true
  });
  const { src } = props;

  const handleCropChange = (newCrop: any) => {
    console.log(newCrop);
    setCrop(newCrop);
  };
  return <ReactCrop src={src} crop={crop} onChange={handleCropChange} />;
}
