import useBaseUrl from "@docusaurus/useBaseUrl";

function ChemotionIcon({url, alt}) {
	return (
		<img
			alt={alt}
			src={useBaseUrl(url)}
			width="200"
			style={{
				width: "min(120px, 50%)",
				float: "right",
				margin: "0px 0px 0px 40px",
			}}
		/>
	);
}
export default ChemotionIcon;
