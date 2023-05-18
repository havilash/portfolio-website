import React, { useCallback, useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";

export default function Modal({
  children,
  open,
  onClose,
  onOpen,
  className,
}) {
  const modalRef = useRef();

  const handleClick = useCallback(
    (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
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
      ref={modalRef}
      className={`bg-block-color-alt shadow-md 
        flex flex-col justify-center items-center rounded-md 
        fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        overflow-hidden transition-all duration-300
        min-w-[75%] xs:min-w-[50%] md:min-w-0 w-auto h-auto z-40 p-4 md:px-16
        ${open
            ? "max-w-[90vw] max-h-[90vh]"
            : "min-w-0 min-h-0 max-w-0 max-h-0 p-0"
        } ${className}`}
    >
      <button className="absolute top-0 right-0 m-4" onClick={onClose}>
        <MdClose className="font-extrabold" size={24} />
      </button>
      {children}
    </div>
  );
}
