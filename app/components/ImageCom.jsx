import Image from "next/image";
import React from "react";

const ImageCom = ({ src, alt, children, width, height }) => {
  return (
    <>
      <div
        className={`relative  bg-gray-900 rounded-lg overflow-hidden`}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 760px) 100vw, 50vw"
        />
        <div className="absolute">{children}</div>
      </div>
    </>
  );
};

export default ImageCom;
