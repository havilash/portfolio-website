import React, { useEffect, useRef, useState } from 'react'
import Block from 'src/components/Block/Block'
import { SiGit, SiDocker, SiAmazonaws, SiReact, SiNodedotjs, SiMongodb, SiMysql, SiPostgresql, SiRedis, SiNginx, SiApache, SiTerraform, SiKubernetes } from 'react-icons/si';
import './Skills.css'

const skillsData = {
  programmingLanguage: [
    {title: 'Python', percent: 80},
    {title: 'JavaScript', percent: 65},
    {title: 'HTML / CSS', percent: 85},
    {title: 'PHP', percent: 45},
    {title: 'C', percent: 35},
    {title: 'C#', percent: 45},
    {title: 'Java', percent: 45},
    {title: 'Lua', percent: 55},
  ],
  technologies: [
    {title: 'Git', icon: <SiGit />},
    {title: 'Docker', icon: <SiDocker />},
    {title: 'AWS', icon: <SiAmazonaws />},
    {title: 'React', icon: <SiReact />},
    {title: 'Node.js', icon: <SiNodedotjs />},
    {title: 'MongoDB', icon: <SiMongodb />},
    {title: 'MySQL', icon: <SiMysql />},
    {title: 'PostgreSQL', icon: <SiPostgresql />},
    {title: 'Redis', icon: <SiRedis />},
    {title: 'Nginx', icon: <SiNginx />},
    {title: 'Apache', icon: <SiApache />},
    {title: 'Terraform', icon: <SiTerraform />},
    {title: 'Kubernetes', icon: <SiKubernetes />},
  ],
}

export default function Skills() {
  const [isLargeDevice, setIsLargeDevice] = useState(!window.matchMedia("(min-width: 1024px)").matches);
  const [isOpen1, setIsOpen1] = useState(!isLargeDevice)
  const [isOpen2, setIsOpen2] = useState(!isLargeDevice)
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current) {
      const columnWidth = getComputedStyle(gridRef.current).gridTemplateColumns.split(' ')[0];
      gridRef.current.style.gridAutoRows = columnWidth;
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeDevice(window.matchMedia("(min-width: 1024px)").matches);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  

  return (
    <section 
      className='section h-screen w-full 
      flex flex-col lg:flex-row justify-center items-center gap-[1rem] lg:gap-[10vw]'>
        <Block 
          className='skills__block' 
          title="Programming Languages"
          open={isOpen1}
          onIsOpenChange={(o) => {
            if (isLargeDevice) return
            setIsOpen1(o)
            o && setIsOpen2(false)
          }}>
            {
              skillsData.programmingLanguage
                .map((item, index) => (
                    <SkillBar key={`SkillBar-${index}`} title={item.title} percent={item.percent} />
                ))
            }
        </Block>
        <Block 
          className='skills__block' 
          title="Technologies" 
          subtitle="Sorted by experience"
          open={isOpen2}
          onIsOpenChange={(o) => {
            if (isLargeDevice) return
            setIsOpen2(o)
            o && setIsOpen1(false)
          }}>
          <div className='skills__technologies'>
            {
              skillsData.technologies
                .map((item, index) => (
                  <SkillBox key={`SkillBox-${index}`} title={item.title} icon={item.icon}/>
                ))
            }
          </div>
        </Block>
    </section>
  )
}


function SkillBar({title, percent}) {
  return (
    <div className='mt-6 w-full flex flex-col gap-4'>
      <h2 className='text-white'>{title}</h2>
      <div className='w-full bg-body-color-2 h-2'>
        <div className='h-full bg-primary-color' style={{width: `${percent}%`}} />
      </div>
    </div>
  )
}

function SkillBox({title, icon}) {
  const Icon = icon.type;
  const fontSize = title.length > 8 ? '1rem' : '1.2rem';
  return (
    <div 
      className='w-28 h-28 border-4 border-primary-color rounded-2xl 
      flex flex-col justify-center items-center'>
      {/* {icon} */}
      <Icon className='text-6xl' />
      <h2 className='text-white text-2xl' style={{fontSize}}>{title}</h2>
    </div>
  )
}