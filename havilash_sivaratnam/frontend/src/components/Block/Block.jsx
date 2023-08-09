import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";

export default function Block({
  children,
  className,
  title,
  subtitle,
  open,
  onIsOpenChange,
}) {
  function toggleIsOpen() {
    onIsOpenChange && onIsOpenChange(!open);
  }

  return (
    <div
      className={`bg-block-color transition-all rounded-lg w-1/3 h-fit ${className}`}
    >
      <div
        onClick={toggleIsOpen}
        className="shadow-lg p-4 flex flex-row items-center justify-between relative "
      >
        <h1 className="text-[5.5vw] xs:text-3xl text-white xs:mr-4 whitespace-nowrap overflow-hidden">
          {title}
        </h1>
        <p className="absolute bottom-[0.35rem] text-xs opacity-75">
          {subtitle}
        </p>
        <FaAngleDown
          size="2.5rem"
          className={`transition-all delay-50 duration-200 cursor-pointer ${
            open && "rotate-180"
          }`}
        />
      </div>
      <div
        className={`overflow-y-scroll px-4 transition-all duration-200 ${
          open ? "h-[50vh] py-4" : "py-0 h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
