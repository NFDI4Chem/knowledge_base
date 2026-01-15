import ButtonContainer from "./ButtonContainer";
import FeatureButton from "./FeatureButton";

function Features({ featureList, classes, index }) {
  return (
    <ButtonContainer>
      {featureList.map((feature, idx) => (
        <FeatureButton
          key={idx}
          url={feature.url}
          imgUrl={feature.imgUrl}
          text={feature.text}
          classes={classes}
          index={index}
        />
      ))}
    </ButtonContainer>
  );
}

export default Features;
