import React, { useState, forwardRef, useImperativeHandle, Ref, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

function generateImageDOMEle(imgStr: string): Promise<HTMLImageElement> {
  const img = new Image();
  img.src = imgStr;
  return new Promise((resolve, reject) => {
    img.onload = () => {
      resolve(img);
    }
    img.onerror = () => {
      reject('生成图片DOM失败');
    }
  })
}

/**
 * @param {HTMLImageElement} image - Image File Object
 * @param {Object} crop - crop Object
 * @param {String} fileName - Name of the returned file in Promise
 */
async function getCroppedImg(imgStr: string, crop: ReactCrop.Crop): Promise<Blob | null> {
  console.log('CROP', crop);
  const image = await generateImageDOMEle(imgStr);
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width || 100;
  canvas.height = crop.height || 100;
  const ctx = canvas.getContext('2d');

  ctx?.drawImage(
    image,
    Number(crop.x) * scaleX,
    Number(crop.y) * scaleY,
    Number(crop.width) * scaleX,
    Number(crop.height) * scaleY,
    0,
    0,
    Number(crop.width),
    Number(crop.height),
  );

  // As Base64 string
  // const base64Image = canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob: Blob | null) => {
      resolve(blob);
    }, 'image/jpeg', 1);
  });
}

function CropDemo(props: {
  src: string,
  onChange?: () => void
}, ref: any) {
  const [crop, setCrop] = useState<ReactCrop.Crop>({
    width: 250,
    height: 250,
  });
  const { src } = props;

  const handleCropChange = (newCrop: any) => {
    setCrop(newCrop);
  };

  useImperativeHandle(ref, () => {
    return {
      getCropImgBlob: async () => {
        const imgBlob = await getCroppedImg(src, crop);
        return imgBlob;
      }
    }
  });

  useEffect(() => {
    props.onChange && props.onChange();
  }, [crop]);

  return <ReactCrop src={src} crop={crop} onChange={handleCropChange} locked/>;
}

export default forwardRef(CropDemo);