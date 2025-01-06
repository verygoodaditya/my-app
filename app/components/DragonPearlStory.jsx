import { useState } from "react";
import ImageCom from "./ImageCom";
import { motion } from "framer-motion";

function DragonPearlStory({ nextScene, previousScene }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [path, setPath] = useState("");
  const [secondaryPath, setSecondaryPath] = useState("");
  const [ending, setEnding] = useState(null);

  // Story structure with all possible paths
  const storySteps = {
    intro: [
      {
        text: "The ancient marketplace bustles with life, incense smoke swirling through the air.",
        image: "/market.jpeg",
      },
      {
        text: "An old merchant approaches you, his eyes filled with desperation.",
        image: "/merchant.jpeg",
      },
      {
        text: '"You! You\'re not from here, are you? Please, you must help. The Dragon Pearl was stolen from our temple."',
        image: "/merchant.jpeg",
      },
      {
        text: '"Without it, our village will lose its protection from the mountain spirits. The thief was seen heading in two directions..."',
        image: "/pearl.jpeg",
      },
    ],
    initialChoice: {
      text: "Which path will you take?",
      image: "/forest-mountain.jpeg",
      choices: [
        {
          text: "Investigate the Forest",
          nextPath: "bambooForest",
          image: "/th.jpeg",
        },
        {
          text: "Climb Cloud Mountain",
          nextPath: "cloudMountain",
          image: "/pearl.jpeg",
        },
      ],
    },
    bambooForest: {
      text: "The forest is dense, with bamboo stalks stretching endlessly. You discover two sets of tracks.",
      image: "/forest-bamboo.jpeg",
      choices: [
        {
          text: "Follow tracks to the abandoned temple",
          nextPath: "abandonedTemple",
          image: "/temple-exterior.jpeg",
        },
        {
          text: "Investigate the cave",
          nextPath: "mysteriousCave",
          image: "/cave-entrance.jpeg",
        },
      ],
    },
    cloudMountain: {
      text: "The climb is treacherous. Halfway up, you spot two possible locations.",
      image: "/rockyMountain.jpeg",
      choices: [
        {
          text: "Check the meditation pavilion",
          nextPath: "meditationPavilion",
          image: "/pavilion.jpeg",
        },
        {
          text: "Explore the mountain shrine",
          nextPath: "mountainShrine",
          image: "/shrine.jpeg",
        },
      ],
    },
    // Secondary choices
    abandonedTemple: {
      text: "The temple is eerily silent. You find evidence of recent activity.",
      image: "/templeStairs.jpeg",
      choices: [
        {
          text: "Search the upper floor",
          ending: "goodEnding1",
          image: "/temple-upper.jpeg",
        },
        {
          text: "Follow the secret passage below",
          ending: "badEnding1",
          image: "/temple-passage.jpeg",
        },
      ],
    },
    mysteriousCave: {
      text: "The cave opens into a crystal-lined chamber. Two tunnels lie ahead.",
      image: "/CrystalCave.jpeg",
      choices: [
        {
          text: "Take the crystal-lined path",
          ending: "badEnding2",
          image: "/crystal-tunnel.jpeg",
        },
        {
          text: "Choose the torch-lit tunnel",
          ending: "neutralEnding1",
          image: "/torch-tunnel.jpeg",
        },
      ],
    },
    meditationPavilion: {
      text: "A figure sits in meditation, something glowing nearby.",
      image: "/MeditationPav.jpg",
      choices: [
        {
          text: "Confront the meditating figure",
          ending: "goodEnding2",
          image: "/confrontation.jpeg",
        },
        {
          text: "Try to steal the pearl while they meditate",
          ending: "deathEnding1",
          image: "/stealth-attempt.jpeg",
        },
      ],
    },
    mountainShrine: {
      text: "The shrine glows with ancient power. You must make a choice.",
      image: "/Shrine.jpg",
      choices: [
        {
          text: "Place an offering at the shrine",
          ending: "goodEnding3",
          image: "/shrine-offering.jpeg",
        },
        {
          text: "Search for secret compartments",
          ending: "deathEnding2",
          image: "/shrine-search.jpeg",
        },
      ],
    },
    // Endings
    endings: {
      goodEnding1: {
        text: "You find the thief unconscious, the pearl glowing beside them. As you grab it, the book's magic swirls around you. You awaken in your world, the pearl in your hand, its soft light a reminder of your adventure.",
        image: "/GuyHolding.jpg",
      },
      goodEnding2: {
        text: "The guardian, impressed by your honesty, hands you the pearl. You return home with both the artifact and a valuable lesson.",
        image: "/EthanStoneHome.jpg",
      },
      goodEnding3: {
        text: "The spirits, moved by your respect, materialize and present you with the pearl. You return home with a deeper understanding of honor and tradition.",
        image: "/EthSpirit.jpg",
      },
      neutralEnding1: {
        text: "You barely escape the cave as it collapses. The book's magic pulls you home. You're alive but empty-handed.",
        image: "/CaveCollapsing.jpg",
      },
      badEnding1: {
        text: "The passage seals behind you. The book's magic can't reach this deep. You become another spirit haunting the temple's halls.",
        image: "/BecomingGhost.jpg",
      },
      badEnding2: {
        text: "The crystal maze shifts constantly. You wander forever, the pearl's glow always just around the next corner.",
        image: "/CrystalMaze.jpg",
      },
      deathEnding1: {
        text: "The meditation master's eyes open, glowing with power. You feel your limbs stiffen as you transform into a stone statue.",
        image: "/Transformed.jpeg",
      },
      deathEnding2: {
        text: "Ancient arrows fly from the shrine's walls. The book's magic fades as your consciousness does the same. Game Over.",
        image: "/arrows.jpg",
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
        The Dragon's Pearl
      </h2>

      <ImageCom src={content.image} alt="Story Scene" width="900" height="500">
        <div className="w-[100%] h-full">
          <h1 className="text-3xl font-bold p-4 mt-2 ml-3 rounded w-[800px] bg-black/70">
            {path || "The Dragon's Pearl"}
          </h1>
        </div>
      </ImageCom>

      {/* Story text */}
      <div className="absolute bottom-[70px] mb-3 left-2 right-2 bg-black bg-opacity-70 text-white p-4 rounded">
        <p className="text-lg font-mono">{content.text}</p>
      </div>

      {/* Choices or Navigation */}
      <div className="flex justify-between mt-4 absolute bottom-4 left-0 right-0 px-4">
        {!ending && currentStep === 0 && (
          <button
            className="text-sm hover:underline-offset-2 hover:underline p-2 rounded-md text-white bg-black/60 font-extrabold px-2"
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

export default DragonPearlStory;
