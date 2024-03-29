import { useEffect, useState } from "react";
import Block from "src/components/Block/Block";
import data from "src/data.js";

import Popup from "src/components/popups/Popup/Popup";
import "./Skills.css";

const skills = data.skills;

export default function Skills() {
  const [isLargeDevice, setIsLargeDevice] = useState(
    !window.matchMedia("(min-width: 1024px)").matches
  );
  const [isOpen1, setIsOpen1] = useState(!isLargeDevice);
  const [isOpen2, setIsOpen2] = useState(!isLargeDevice);

  const [selectedSkill, setSelectedSkill] = useState(null);

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsLargeDevice(window.matchMedia("(min-width: 1024px)").matches);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      className="section h-screen w-full 
        flex flex-col lg:flex-row justify-center 
        items-center gap-[1rem] lg:gap-[10vw]"
    >
      <Block
        className="skills__block"
        title="Programming Languages"
        open={isOpen1}
        onIsOpenChange={(o) => {
          setIsOpen1(o);
          if (!isLargeDevice && o) setIsOpen2(false);
        }}
      >
        {skills.programmingLanguage.map((item, index) => (
          <SkillBar
            key={`SkillBar-${index}`}
            title={item.title}
            percent={item.percent}
          />
        ))}
      </Block>
      <Block
        className="skills__block"
        title="Technologies"
        subtitle="Sorted by experience"
        open={isOpen2}
        onIsOpenChange={(o) => {
          setIsOpen2(o);
          if (!isLargeDevice && o) setIsOpen1(false);
        }}
      >
        <div className="skills__technologies">
          {skills.technologies.map((item, index) => (
            <SkillBox
              key={`SkillBox-${index}`}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </div>
      </Block>
    </section>
  );
}

function SkillBar({ title, percent }) {
  return (
    <div className="mt-6 w-full flex flex-col gap-4">
      <h2 className="text-white text-xl">{title}</h2>
      <div className="w-full bg-body-color-2 h-2">
        <div
          className="h-full bg-primary-color"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function SkillBox({ title, icon, onClick }) {
  const Icon = icon;
  const fontSize =
    title.length < 8 ? "1.2rem" : title.length < 12 ? "1rem" : "0.8rem";
  return (
    <div
      onClick={onClick}
      className="transition-all duration-500 w-full h-full aspect-square border-4 border-primary-color rounded-2xl 
        flex flex-col justify-evenly items-center whitespace-nowrap"
    >
      {/* {icon} */}
      <Icon className="text-5xl" />
      <h2 className="text-white text-xl" style={{ fontSize }}>
        {title}
      </h2>
    </div>
  );
}
