import { shuffleArray, shuffleValues } from "./common";
import { dinosaurs } from "./dinos";
import { Heading, Block, Image } from "react-bulma-components";
import DinoPage from "./DinoPage";
import jurassicworldlogo from "./img/jurassicworldlogo.png";
import { useEffect, useState } from "react";

export const App = () => {
  const [shuffleIDs, setShuffleID] = useState<shuffleValues<string>[]>([]);
  const [currentID, setCurrentID] = useState(0);
  const [dinoID, setDinoID] = useState<number | string>(1);
  useEffect(() => {
    if (shuffleIDs[currentID]) {
      setDinoID(shuffleIDs[currentID].val);
    } else {
      setShuffleID(() => shuffleArray<string>(Object.keys(dinosaurs)));
      setCurrentID(0);
    }
  }, [currentID, shuffleIDs]);
  return (
    <>
      <Heading
        className="has-text-centered"
        size={1}
        style={{ cursor: "pointer" }}
        onClick={() => {
          setCurrentID((prev) => prev + 1);
        }}
      >
        Динозавры
      </Heading>
      <Block className="image-container">
        <Image src={jurassicworldlogo}/>
      </Block>
      <DinoPage dinoKey={dinoID} />
    </>
  );
};
