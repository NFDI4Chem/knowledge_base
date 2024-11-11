import Link from "@docusaurus/Link";

function ElnStatus({ relativeDate }) {
    return (
        <p>
            <em>
                Data kindly provided by{" "}
                <Link to="https://eln-finder.ulb.tu-darmstadt.de/">
                    ELN Finder
                </Link>{" "}
                (
                {relativeDate !== "Invalid date"
                    ? "last updated " + relativeDate
                    : "last update unknown"}
                ).
            </em>
        </p>
    );
}

export default ElnStatus;
