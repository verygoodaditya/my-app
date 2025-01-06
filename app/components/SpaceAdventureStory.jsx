import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ImageCom from "./ImageCom";

function SpaceAdventureStory({ previousScene }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [path, setPath] = useState("");
  const [secondaryPath, setSecondaryPath] = useState("");
  const [ending, setEnding] = useState(null);

  const storySteps = {
    intro: [
      {
        text: "In the year 2157, humanity's first interstellar ship, the Stellar Horizon, picks up a mysterious signal from deep space.",
        image: "/space/Spaceship.jpg",
      },
      {
        text: "As the ship's lead explorer, you're awakened from cryo-sleep. The signal appears to be coming from an uncharted region.",
        image: "/space/cryosleep.jpg",
      },
      {
        text: "The ship's AI presents two possible sources of the signal: a massive derelict space station or an unexplored alien planet.",
        image: "/space/split.jpg",
      },
      {
        text: "Your oxygen reserves are limited. This decision could mean the difference between a groundbreaking discovery and being lost in the void forever.",
        image: "/space/limitedO2.jpg",
      },
    ],
    initialChoice: {
      text: "Where will you investigate the signal?",
      image: "/space/split.jpg",
      choices: [
        {
          text: "Dock with Space Station",
          nextPath: "spaceStation",
          image: "/space-station.jpeg",
        },
        {
          text: "Land on the Alien Planet",
          nextPath: "alienPlanet",
          image: "/alien-planet.jpeg",
        },
      ],
    },
    spaceStation: {
      text: "The abandoned station looms before you, its architecture unlike anything humanity has created.",
      image: "/space/alienarc.jpg",
      choices: [
        {
          text: "Enter through the Main Airlock",
          nextPath: "mainAirlock",
          image: "/main-airlock.jpeg",
        },
        {
          text: "Use the Emergency Hatch",
          nextPath: "emergencyHatch",
          image: "/emergency-hatch.jpeg",
        },
      ],
    },
    alienPlanet: {
      text: "The planet's surface is covered in bioluminescent flora and strange crystalline formations.",
      image: "/space/floura.jpg",
      choices: [
        {
          text: "Follow the Crystal Formations",
          nextPath: "crystalPath",
          image: "/crystal-path.jpeg",
        },
        {
          text: "Investigate the Alien Structure",
          nextPath: "alienStructure",
          image: "/alien-structure.jpeg",
        },
      ],
    },
    // Secondary paths
    mainAirlock: {
      text: "The station's main chamber contains advanced technology beyond human understanding.",
      image: "/space/station.jpg",
      choices: [
        {
          text: "Access the Central Computer",
          ending: "goodEnding1",
          image: "/central-computer.jpeg",
        },
        {
          text: "Power Up the Teleporter",
          ending: "deathEnding1",
          image: "/teleporter.jpeg",
        },
      ],
    },
    emergencyHatch: {
      text: "You find yourself in what appears to be a research lab with strange containment pods.",
      image: "/space/hatch.jpg",
      choices: [
        {
          text: "Examine the Specimens",
          ending: "badEnding1",
          image: "/specimens.jpeg",
        },
        {
          text: "Download Research Data",
          ending: "goodEnding2",
          image: "/research-data.jpeg",
        },
      ],
    },
    crystalPath: {
      text: "The crystals lead to an ancient alien observatory.",
      image: "/space/obj.jpg",
      choices: [
        {
          text: "Activate the Star Map",
          ending: "goodEnding3",
          image: "/star-map.jpeg",
        },
        {
          text: "Study the Crystal Interface",
          ending: "badEnding2",
          image: "/crystal-interface.jpeg",
        },
      ],
    },
    alienStructure: {
      text: "Inside, you discover what appears to be a dormant alien AI system.",
      image: "/space/alienai.jpg",
      choices: [
        {
          text: "Attempt Communication",
          ending: "neutralEnding1",
          image: "/communication.jpeg",
        },
        {
          text: "Extract the AI Core",
          ending: "deathEnding2",
          image: "/ai-core.jpeg",
        },
      ],
    },
    endings: {
      goodEnding1: {
        text: "The central computer contains the coordinates of hundreds of habitable worlds. You've just changed the course of human history. You return home a hero, carrying humanity's future among the stars.",
        image: "/space/coordinates.jpg",
      },
      goodEnding2: {
        text: "The research data reveals peaceful alien civilizations waiting to make contact. Your discovery ushers in a new age of interstellar diplomacy and cooperation.",
        image: "/space/yeyyy.jpg",
      },
      goodEnding3: {
        text: "The star map activates, revealing a network of ancient alien gates. You've discovered humanity's pathway to the entire galaxy.",
        image: "/space/map.jpg",
      },
      neutralEnding1: {
        text: "The AI acknowledges you but isn't ready for full contact. It sends you home with a warning: humanity must prove itself worthy first.",
        image: "/space/aguy.jpg",
      },
      badEnding1: {
        text: "The specimens break containment. You're trapped in the station, sending warning signals to keep others away.",
        image: "/space/badending.jpg",
      },
      badEnding2: {
        text: "The crystal interface merges with your mind. You gain incredible knowledge but can never return to human society.",
        image: "/space/poop.jpg",
      },
      deathEnding1: {
        text: "The teleporter malfunctions, scattering your atoms across space. Your final discovery becomes your eternal tomb.",
        image: "/space/death1.jpg",
      },
      deathEnding2: {
        text: "The AI's defense systems activate. Your last view is a brilliant flash of energy. Game Over.",
        image: "/space/aidefence.jpeg",
      },
    },
  };

  const handleChoice = (choice) => {
    if (choice.ending) {
      setEnding(choice.ending);
    } else if (choice.nextPath) {
      setPath(choice.nextPath);
      setCurrentStep(0);
    }
  };

  const getCurrentContent = () => {
    if (ending) {
      return storySteps.endings[ending];
    }

    if (!path) {
      return currentStep < storySteps.intro.length
        ? storySteps.intro[currentStep]
        : storySteps.initialChoice;
    }

    return storySteps[path];
  };

  const content = getCurrentContent();

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="m-2 font-bold font-mono text-3xl absolute bg-black bg-opacity-50">
        Journey to the Stars
      </h2>

      <ImageCom src={content.image} alt="Story Scene" width="900" height="500">
        <div className="w-[100%] h-full">
          <h1 className="text-3xl font-bold p-4 mt-2 ml-3 rounded w-[800px] bg-black/70">
            {path || "Journey to the Stars"}
          </h1>
        </div>
      </ImageCom>

      <div className="absolute bottom-[70px] left-2 mb-3 right-2 bg-black bg-opacity-70 text-white p-4 rounded">
        <p className="text-lg font-mono">{content.text}</p>
      </div>

      <div className="flex justify-between mt-4 absolute bottom-4 left-0 right-0 px-4">
        {!ending && currentStep === 0 && (
          <button
            className="text-sm hover:underline-offset-2 hover:underline p-2 rounded-md text-white bg-black/60 font-extrabold px-3"
            onClick={previousScene}
          >
            Back to Stories
          </button>
        )}

        {!ending && content.choices ? (
          <div className="flex gap-4 justify-center w-full">
            {content.choices.map((choice, index) => (
              <button
                key={index}
                className="text-lg hover:underline-offset-2 hover:underline p-2 rounded-md text-white bg-black/60 font-extrabold px-3"
                onClick={() => handleChoice(choice)}
              >
                {choice.text}
              </button>
            ))}
          </div>
        ) : !ending ? (
          <button
            className="text-lg hover:underline-offset-2 hover:underline p-2 rounded-md text-white bg-black/60 font-extrabold px-3"
            onClick={() => setCurrentStep((prev) => prev + 1)}
          >
            Next
          </button>
        ) : (
          <button
            className="text-lg hover:underline-offset-2 hover:underline p-2 rounded-md text-white bg-black/60 font-extrabold px-3"
            onClick={previousScene}
          >
            Return to Stories
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default SpaceAdventureStory;
