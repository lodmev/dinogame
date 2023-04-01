import { dinosaurs, Dinosaurs } from "./dinos";
import { shuffleArray, shuffleValues } from "./common";
import "./DinoPage.css";
import classNames from "classnames";
import { syllabify } from "syllables-ru";
import {
  Image,
  Section,
  Button,
  Tile,
  Heading,
  Notification,
  Block,
} from "react-bulma-components";
import { useState, useEffect } from "react";

const DinoPage = (props: { dinoKey: keyof Dinosaurs}) => {
  const dinosaur = dinosaurs[props.dinoKey];
  const [showImage, setShowImage] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [shTogleDisabled, setTogleDisabled] = useState(true);
  const sectionClasses = classNames({
    "has-background-danger": isFail,
  });
  useEffect(()=>{
		  setShowImage(false)
		  setIsFail(false)
		  setTogleDisabled(true)
	  },[dinosaur])
  return (
    <Section className={sectionClasses}>
      <ShuffleName
        name={dinosaur.name}
        setFail={setIsFail}
        setTogleDisabled={setTogleDisabled}
      />
      <ShowToggle setShowed={setShowImage} disabled={shTogleDisabled} />
      {<DinoImage show={showImage} url={dinosaur.imageUrl} />}
    </Section>
  );
};
const DinoImage = (props: { url: string; show: Boolean }) => {
  const diClasses = classNames({ "dino-image": true, showed: props.show });
  return (
    <Block className="image-container">
      <Image className={diClasses} src={props.url} />
    </Block>
  );
};
const ShuffleName = (props: {
  name: string;
  setFail: React.Dispatch<React.SetStateAction<boolean>>;
  setTogleDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const nameArr = props.name.split("");
  const [shuffleName, setShuffleName] = useState<shuffleValues<string>[]>([]);
  const [resName, setResName] = useState("");
  const [correctPosition, setCorPos] = useState(0);
  useEffect(() => {
    setShuffleName(shuffleArray<string>(props.name.split("")));
    setResName("");
	setCorPos(0)
  }, [props.name]);
  const letterClickHandle = (position: number) => {
    if (position === correctPosition) {
      setCorPos(correctPosition + 1);
      setResName((prev) => prev + nameArr[position]);
    } else if (position === correctPosition - 1) return;
    else {
      props.setFail(true);
      setTimeout(() => props.setFail(false), 500);
    }
  };

  return (
    <>
      <Tile kind="ancestor" className="has-text-centered">
        <Tile>
          <Tile kind="parent">
            {shuffleName.map((shValue, index) => {
              return (
                <Tile
                  kind="child"
                  key={index}
                >
                  <Heading subtitle>{shValue.realId + 1}</Heading>
                  <Heading
                    className="letter-value"
                    onClick={() => {
                      letterClickHandle(shValue.realId);
                    }}
                  >
                    {shValue.val}
                  </Heading>
                </Tile>
              );
            })}
          </Tile>
        </Tile>
      </Tile>
      <ResName
        value={resName}
        finish={correctPosition === nameArr.length}
        setTogleDisabled={props.setTogleDisabled}
      />
    </>
  );
};

const ResName = (props: {
  value: string;
  finish: boolean;
  setTogleDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const onClickHandle = (e: React.MouseEvent<HTMLHeadElement, MouseEvent>) => {
    if (e.detail === 2 && props.finish) {
      props.setTogleDisabled(false);
    }
  };
  return (
    <Tile
      className="is-flex-inline is-justify-content-center"
      renderAs={Notification}
      style={{ minHeight: "70px" }}
    >
      <Heading size={2} className="has-text-centered" onClick={onClickHandle}>
        { syllabify(props.value, { separator: "-" }) }
      </Heading>
    </Tile>
  );
};
const ShowToggle = (props: {
  setShowed: React.Dispatch<React.SetStateAction<boolean>>;
  disabled: boolean;
}) => {
  return (
    <Block className="is-flex is-justify-content-center">
      <Button
        onClick={() => props.setShowed((prev) => !prev)}
        disabled={props.disabled}
      >
        Show/Hide
      </Button>
    </Block>
  );
};
export default DinoPage;
