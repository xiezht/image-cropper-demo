import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
export default function CropDemo(props: { src: string }) {
  const [crop, setCrop] = useState<ReactCrop.Crop>({
    width: 250,
    height: 250,
  });
  const { src } = props;

  const handleCropChange = (newCrop: any) => {
    console.log(newCrop);
    setCrop(newCrop);
  };
  return <ReactCrop src={src} crop={crop} onChange={handleCropChange} locked/>;
}
