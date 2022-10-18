import React from "react";
import useBaseUrl from '@docusaurus/useBaseUrl';


export default function IntroButton( props ) {
    return (
        <div className="col intro--col">
            <div className="text--center vertical-center">
                <a href={useBaseUrl(props.url)} className="button button--secondary button--lg feature-secondary--button" >
                    <img src={useBaseUrl(props.imgUrl)} width="120px" />
                    <br />
                    {props.text}
                </a>
            </div>
        </div>
    )
}

