import React from "react";
import { FaCircle } from "react-icons/fa";
import "./Career.css";
import data from "src/data";

export default function Career() {
  function renderTimelineItems(items) {
    return items.map((item, i) => (
      <tr
        key={`timeline-${i}`}
        className="relative h-full grid gap-x-4 gap-y-0 sm:flex sm:flex-row"
        style={{ gridTemplateColumns: "0.2rem auto" }}
      >
        <td
          className="text-xl opacity-50 sm:opacity-100 text-left sm:text-right 
        w-auto sm:min-w-[40vw] order-2 sm:order-1 ml-4 sm:ml-0"
        >
          {item.date}
        </td>
        <td
          className={`bg-body-color-2 w-2 relative z-10 order-1 sm:order-2 row-span-2 ${
            i === 0 ? "rounded-t-full" : ""
          }`}
        >
          <FaCircle
            className="absolute left-1/2 transform -translate-x-1/2"
            size={"1.2rem"}
          />
        </td>
        <td className="text-xl ml-4 max-w-sm order-3 pb-24">
          {item.description}
        </td>
      </tr>
    ));
  }

  return (
    <section className="section">
      <div className="relative min-h-screen h-auto mix-blend-difference mt-28 sm:mt-40 flex justify-center">
        <table className="relative mt-5 text-left w-full">
          <tbody>
            {renderTimelineItems(data.career)}
            <tr
              className="absolute h-full grid gap-x-4 gap-y-0 sm:flex sm:flex-row"
              style={{ gridTemplateColumns: "0.2rem auto" }}
            >
              <td className="w-auto sm:min-w-[40vw] order-2 sm:order-1 ml-4 sm:ml-0"></td>
              <td className="bg-body-color-2 w-2 relative z-10 order-1 sm:order-2 row-span-2"></td>
              <td className="text-xl ml-4 max-w-sm order-3"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
