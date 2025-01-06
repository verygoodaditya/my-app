"use client";

import Spline from "@splinetool/react-spline";

export default function SplineBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Spline scene="https://prod.spline.design/mLkFgGVNTfqMI95P/scene.splinecode" />
      <div className="absolute inset-0 bg-black opacity-70 pointer-events-none"></div>
    </div>
  );
}
