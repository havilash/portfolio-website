import Skeleton from "src/components/skeletons/Skeleton/Skeleton";

export default function SkeletonFile({ className }) {
  return (
    <div
      className={`bg-white w-full p-[15%] pb-[10%] flex flex-col gap-4 ${className}`}
      style={{ aspectRatio: "1/1.414" }}
    >
      <Skeleton width="30%" height="5%" className="mb-[2%]" />
      <Skeleton width="90%" height="3%" />
      <Skeleton width="80%" height="3%" />
      <Skeleton width="88%" height="3%" />
      <Skeleton width="70%" height="3%" />
      <Skeleton width="90%" height="3%" />
      <Skeleton width="85%" height="3%" />
      <Skeleton width="60%" height="3%" />
    </div>
  );
}
