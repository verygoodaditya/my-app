"use client"; // App Router requires this for client-side components
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ImageCom from "./ImageCom";
import DragonPearlStory from "./DragonPearlStory";
import SpaceAdventureStory from "./SpaceAdventureStory";

export default function StoryApp() {
  const [currentScene, setCurrentScene] = useState(0); // Start at intro screen
  const [selectedStory, setSelectedStory] = useState(null);

  // Function to handle scene changes
  const nextScene = () => setCurrentScene((prev) => prev + 1);
  const previousScene = () => setCurrentScene((prev) => Math.max(0, prev - 1));

  const selectStory = (index) => {
    setSelectedStory(index);
    nextScene();
  };

  return (
    <div className="story-container">
      {currentScene === 0 && <IntroScreen nextScene={nextScene} />}
      {currentScene === 1 && <Scene1 nextScene={nextScene} />}
      {currentScene === 2 && (
        <Scene2
          nextScene={nextScene}
          previousScene={previousScene}
          selectStory={selectStory}
        />
      )}
      {currentScene === 3 && selectedStory === 0 && (
        <DragonPearlStory previousScene={() => setCurrentScene(2)} />
      )}
      {/* {currentScene === 3 && selectedStory !== 0 && (
        <ComingSoonStory previousScene={() => setCurrentScene(2)} />
      )} */}
      {currentScene === 3 && selectedStory === 1 && (
        <SpaceAdventureStory previousScene={() => setCurrentScene(2)} />
      )}
    </div>
  );
}

// Intro Screen Component

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1, // Stagger delay based on index
    },
  }),
};

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger each child by 0.1s
    },
  },
};

function IntroScreen({ nextScene }) {
  const text = "Welcome to the World of Stories";

  return (
    <motion.div
      className="intro-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative">
        <Image
          src="/th.jpeg" // Replace with your intro image
          alt="Game Introduction"
          layout="fill"
          objectFit="cover"
          className="z-[-1]"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-7xl font-extrabold text-white mb-6"
          >
            {text.split(" ").map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={textVariants}
                className="inline-block mx-2 font-"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
          <button
            className="text-lg font-mono bg-orange-400 p-3 rounded-md text-black font-extrabold px-6"
            onClick={() => {
              const audio = new Audio("/music.mp3");
              audio.play();
              // audio.volume = 0.3;
              nextScene();
            }}
          >
            Play
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function Scene1({ nextScene }) {
  const [currentStep, setCurrentStep] = useState(0);

  const expositionSteps = [
    {
      text: "Once upon a time, there was a young man named Ethan.",
      image: "/library.jpeg", // Replace with the image for this step
    },
    {
      text: "Ethan was a curious soul, always lost in the pages of old books.",
      image: "/guy-book.jpeg", // Replace with the image for this step
    },
    {
      text: "One fateful evening, while reading in the library, he stumbled upon a peculiar book.",
      image: "/th.jpeg", // Replace with the image for this step
    },
    {
      text: "The book began to glow with a mystical light, filling the room with an otherworldly aura.",
      image: "/th.jpeg", // Replace with the image for this step
    },
    {
      text: "Before he could react, Ethan was offered a chance to dive into the stories he loved so dearly...",
      image: "/th.jpeg", // Replace with the image for this step
    },
  ];

  const goToNextStep = () => {
    if (currentStep < expositionSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      nextScene(); // Go to the next scene when it's the last step
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="m-2 font-bold font-mono text-3xl absolute bg-black bg-opacity-50">
        Scene 1: The Throne Hall
      </h2>

      {/* Dynamic Image based on the current step */}
      <ImageCom
        src={expositionSteps[currentStep]?.image}
        alt="Exposition Scene"
        width="900"
        height="500"
      >
        <div className="w-[100%] h-full">
          <h1 className="text-3xl font-bold p-4 mt-2 ml-3 rounded w-[800px] bg-black/70">
            The world of stories
          </h1>
        </div>
      </ImageCom>

      {/* Exposition text */}
      <div className="absolute bottom-[70px] left-2 right-2 bg-black bg-opacity-70 text-white p-4 rounded">
        <p className="text-lg font-mono">
          {expositionSteps[currentStep]?.text}
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4 absolute bottom-4 left-0 right-0 px-4">
        <button
          className={`text-lg hover:underline-offset-2 hover:underline p-2 rounded-md text-white bg-black/60 font-extrabold px-3 ${
            currentStep === 0 ? "invisible" : "visible"
          }`}
          onClick={goToPreviousStep}
        >
          Back
        </button>
        <button
          className="text-lg hover:underline-offset-2 hover:underline p-2 rounded-md text-white bg-black/60 font-extrabold px-3"
          onClick={goToNextStep}
        >
          {currentStep === expositionSteps.length - 1 ? "Next Scene" : "Next"}
        </button>
      </div>
    </motion.div>
  );
}
// Keep Scene2 and Scene3 as you have them
function Scene2({ nextScene, previousScene, selectStory }) {
  const storyOptions = [
    {
      text: "The Dragon's Pearl",
      image: "/stoneMagical.jpeg",
      music: "/Flute-for-story-1.mp3",
    },
    { text: "Journey to the Stars", image: "/space.jpeg" },
  ];

  const handleStorySelect = (index) => {
    if (index === 0) {
      // If it's the Dragon's Pearl story
      const audio = new Audio(storyOptions[0].music);
      audio.volume = 1; // Set volume to 30%
      audio.loop = true; // Make the music loop

      // Store the audio element in sessionStorage so we can control it later
      window.storyAudio = audio;

      audio.play().catch((error) => {
        console.log("Audio playback failed:", error);
      });
    }
    selectStory(index);
  };

  // Cleanup function to stop music when leaving the story
  useEffect(() => {
    return () => {
      if (window.storyAudio) {
        window.storyAudio.pause();
        window.storyAudio = null;
      }
    };
  }, []);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="m-4 text-2xl font-bold text-center text-white">
        Choose Your Portal
      </h2>

      <div className="grid grid-cols-2 gap-6 p-4">
        {storyOptions.map((story, index) => (
          <div
            key={index}
            className="relative group cursor-pointer rounded-full border-4 border-orange-400 bg-orange-300 p-2"
            onClick={() => handleStorySelect(index)}
          >
            <div className="portal-container relative rounded-full overflow-hidden">
              <Image
                src={story.image}
                alt={story.text}
                width="300"
                height="300"
                className="rounded-full transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-lg font-bold text-center p-2">
                  {story.text}
                </p>
              </div>
            </div>
            <div className="portal-glow absolute inset-0 rounded-full"></div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          className="text-lg hover:underline-offset-2 hover:underline p-2 rounded-md text-white font-extrabold px-4"
          onClick={previousScene}
        >
          Back
        </button>
      </div>
    </motion.div>
  );
}

function Scene3({ previousScene }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ImageCom src="/cat.png" alt="Magic Book" width="900" height="500">
        "The book glows with a mystical light"
      </ImageCom>
      <p>You confront the Shadow Warden in a moonlit forest...</p>
      <button onClick={previousScene}>Back</button>
    </motion.div>
  );
}
