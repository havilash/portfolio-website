import { useCallback, useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";

export default function Popup({
  children,
  open,
  onClose,
  onOpen,
  className,
  position,
}) {
  const popupRef = useRef();

  const handleClick = useCallback(
    (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [handleClick]);

  useEffect(() => {
    if (open) {
      onOpen?.();
    }
  }, [open, onOpen]);

  return (
    <div
      ref={popupRef}
      className={`bg-block-color-alt shadow-md
        flex flex-col justify-center items-center rounded-md 
        fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        overflow-hidden transition-all duration-300 z-40 
        ${
          open
            ? "min-w-[75%] xs:min-w-[50%] md:min-w-0 w-auto h-auto max-w-[90vw] max-h-[90vh] p-4 md:px-16"
            : "min-w-0 min-h-0 max-w-0 max-h-0 p-0"
        } ${className}`}
      style={{
        top: position?.[0] || "50%",
        left: position?.[1] || "50%",
        transform: position ? "" : "translate(-50%, -50%)",
      }}
    >
      <button className="absolute top-0 right-0 m-4" onClick={onClose}>
        <MdClose className="font-extrabold" size={24} />
      </button>
      {children}
    </div>
  );
}
