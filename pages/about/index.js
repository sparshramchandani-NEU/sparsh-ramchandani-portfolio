import React, { useState } from "react";

// icons
import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaWordpress,
  FaFigma,
  FaJava,
  FaPython,
  FaSwift,
  FaAngular,
  FaRust,
  FaGit,
  FaGithub,
  FaAws,
  FaMicrosoft,
  FaJenkins,
  FaGoogle,
  FaDocker,
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiFramer,
  SiAdobexd,
  SiAdobephotoshop,
  SiTerraform,
  SiOracle,
  SiMysql,
  SiMongodb,
  SiPostgresql,
} from "react-icons/si";

//  data
const aboutData = [
  {
    title: "skills",
    info: [
      {
        title: "Languages",
        icons: [<FaJava/>, <FaPython/>, <FaSwift/>, <FaAngular/>, <FaRust/>],
      },
      {
        title: "DevOps",
        icons: [<FaGithub/>, <FaAws/>, <FaJenkins/>, <FaGoogle/>, <FaDocker/>, <FaMicrosoft/>, <SiTerraform/>],
      },
      {
        title: "Web Development",
        icons: [
          <FaHtml5 />,
          <FaCss3 />,
          <FaJs />,
          <FaReact />,
          <SiNextdotjs />,
          <SiFramer />,
        ],
      },
      {
        title: "Databases",
        icons: [<SiOracle />, <SiMysql />, <SiMongodb />, <SiPostgresql/>],
      },
      {
        title: "UI/UX Design",
        icons: [<FaFigma />, <SiAdobexd />, <SiAdobephotoshop />],
      },
    ],
  },
  {
    title: "education",
    info: [
      {
        title: "Northeastern University, Boston, MA",
        stage: "September 2022 - May 2024",
      },
       {
        title: "University Of Mumbai",
        stage: "2017 - 2021",
      },
    ],
  },
  {
    title: "experience",
    info: [
      {
        title: "Software Engineer, Bright Minds Enrichment",
        stage: "September 2024 - Present",
      },
      {
        title: "Program Assistant, Northeastern University",
        stage: "September 2023 - May 2024",
      },
      {
        title: "Software Engineer, Samsung",
        stage: "October 2021 - August 2022",
      },
      {
        title: "DevOps Engineer, Ultra Instruments & Controls",
        stage: "October 2019 - October 2020",
      },
    ],
  },
  // {
  //   title: "credentials",
  //   info: [
  //     {
  //       title: "Web Development - ABC University, LA, CA",
  //       stage: "2011",
  //     },
  //     {
  //       title: "Computer Science Diploma - AV Technical Institute",
  //       stage: "2009",
  //     },
  //     {
  //       title: "Certified Graphic Designer - ABC Institute, Los Angeles, CA",
  //       stage: "2006",
  //     },
  //   ],
  // },
];

//framer motion
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";

//counter
import CountUp from "react-countup";

//components
import Avatar from "../../components/Avatar";
import Circles from "../../components/Circles";

const About = () => {
  const [index, setIndex] = useState(0);
  console.log(index);
  return (
    <div className="h-full bg-primary/30 py-32 text-center xl:text-left">
      <Circles />
      {/* avatar image  */}
      <motion.div
        variants={fadeIn("right", 0.2)}
        className="hidden xl:flex absolute bottom-0 -left-[370px]"
      >
        {/* <Avatar /> */}
      </motion.div>
      <div className="container mx-auto h-full flex flex-col items-center xl:flex-row gap-x-6">
        {/* text  */}
        <div className="flex-1 flex flex-col justify-center">
          <motion.h2
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2"
          >
            Captivating <span className="text-accent">stories</span> birth
            magnificent design
          </motion.h2>
          <motion.p
            variants={fadeIn("right", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-[500px] mx-auto xl:mx-0 mb-6 xl:mb-12 px-2 xl:px-0"
          >
            I'm a designer and developer based in Boston, MA. I have a passion
            for creating beautiful, intuitive and highly functional websites and
            apps.
          </motion.p>
          {/* counters */}
          <motion.div 
          variants={fadeIn("right", 0.6)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="hidden md:flex md:max-w-xl xl:max-w-none mx-auto xl:mx-0 mb-8"
          >
            <div className="flex flex-1 xl:gap-6">
              {/* experience */}
              <div className="relative flex-1 xl:gap-3 after:w-[1px] after:h-full after:absolute after:top-0 after:right-0">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={0} end={3} duration={5} /> +
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                  Years of experience
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        {/* info  */}
        <motion.div 
        variants={fadeIn("left", 0.4)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="flex flex-col w-full xl:max-w-[48%] h-[480px]"
        >
          <div className="flex gap-x-4 xl:gap-x-8 mx-auto xl:mx-0 mb-4">
            {aboutData.map((item, itemIndex) => {
              return (
                <div
                  key={itemIndex}
                  className={` ${
                    index === itemIndex &&
                    'text-accent after:w-[100%] after:bg-accent after:transition-all after:duration-300'
                  } cursor-pointer capitalize xl:text-lg relative after:w-8 after:h-[2px] after:bg-accent after:absolute after:-bottom-1 after:left-0`}
                  onClick={() => setIndex(itemIndex)}
                >
                  {item.title}
                </div>
              );
            })}
          </div>
          <div className="py-2 xl:py-6 flex flex-col gap-y-2 xl:gap-y-4 items-center xl:items-start">
            {aboutData[index].info.map((item, itemIndex) => {
              return (
                <div
                  key={itemIndex}
                  className="flex-1 flex flex-col md:flex-row max-w-max gap-x-2 items-center text-white/60"
                >
                  {/* title */}
                  <div className="font-light mb-2 md:mb-0">{item.title}</div>
                  <div className="hidden md:flex">-</div>
                  <div>{item.stage}</div>
                  <div className="flex gap-x-4">
                    {/* icons  */}
                    {item.icons?.map((icon, itemIndex) => {
                      return <div className="text-2xl text-white">{icon}</div>;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
