import React from 'react';
import Skeleton from 'src/components/skeletons/Skeleton/Skeleton';

export default function SkeletonFile({className}) {
  return (
    <div className={`bg-white w-full p-[2.5cm] pb-[2cm] flex flex-col gap-4 ${className}`} style={{ aspectRatio: '1/1.414' }}>
      <Skeleton width="30%" height="3rem" className="mb-4" />
      <Skeleton width="90%" height="2rem" />
      <Skeleton width="80%" height="2rem" />
      <Skeleton width="88%" height="2rem" />
      <Skeleton width="70%" height="2rem" />
      <Skeleton width="90%" height="2rem" />
      <Skeleton width="85%" height="2rem" />
      <Skeleton width="60%" height="2rem" />

    </div>
  );
}