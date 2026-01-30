import ButtonContainer from "./ButtonContainer";
import FeatureButton from "./FeatureButton";

function Features({ featureList, index, ...props }) {
  return (
    <ButtonContainer>
      {featureList.map((feature, idx) => (
        <FeatureButton
          key={idx}
          url={feature.url}
          imgUrl={feature.imgUrl}
          text={feature.text}
          alt={feature.alt}
          index={index}
          {...props}
        />
      ))}
    </ButtonContainer>
  );
}

export default Features;
