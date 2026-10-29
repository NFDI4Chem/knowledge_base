import ButtonContainer from "./ButtonContainer";
import FeatureButton from "./FeatureButton";

function Features({ featureList, index, ...props }) {
	return (
		<ButtonContainer>
			{featureList.map((feature) => (
				<FeatureButton
					key={feature.url}
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
