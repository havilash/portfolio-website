import React from "react";
import Skeleton from "src/components/skeletons/Skeleton/Skeleton";

export default function SkeletonFile({ className }) {
  return (
    <div
      className={`bg-white w-full p-[2.5cm] pb-[2cm] flex flex-col gap-4 ${className}`}
      style={{ aspectRatio: "1/1.414" }}
    >
      <Skeleton width="30%" height="2em" className="mb-4" />
      <Skeleton width="90%" />
      <Skeleton width="80%" />
      <Skeleton width="88%" />
      <Skeleton width="70%" />
      <Skeleton width="90%" />
      <Skeleton width="85%" />
      <Skeleton width="60%" />
    </div>
  );
}
