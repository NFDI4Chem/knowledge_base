import useBaseUrl from "@docusaurus/useBaseUrl";

function ChemotionIcon({url, alt, ...props}) {
	return (
		<img
			alt={alt}
			src={useBaseUrl(url)}
			style={{
				width: props.width ?? "min(120px, 50%)",
				float: props.float ?? "right",
				margin: props.margin ?? "0px 20px 0px 20px",
			}}
		/>
	);
}
export default ChemotionIcon;
