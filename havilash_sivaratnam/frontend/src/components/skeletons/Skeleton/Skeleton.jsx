import "./Skeleton.css";

export default function Skeleton({ width, height, className }) {
  return (
    <>
      <span
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
