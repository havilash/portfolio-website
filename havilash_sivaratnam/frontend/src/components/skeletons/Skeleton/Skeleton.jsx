import { useEffect, useRef, useState } from "react";
import "./Skeleton.css";

export default function Skeleton({ width, height, className }) {
  const [skeletonWidth, setSkeletonWidth] = useState(0);
  const skeletonRef = useRef(null);

  useEffect(() => {
    if (skeletonRef.current) {
      setSkeletonWidth(skeletonRef.current.offsetWidth);
    }
  }, []);

  return (
    <>
      <span
        ref={skeletonRef}
        className={`skeleton ${className}`}
        style={{
          width: width || "100%",
          height: height,
        }}
      >
        &nbsp;
      </span>
    </>
  );
}
