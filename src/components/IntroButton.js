import React from "react";
import useBaseUrl from '@docusaurus/useBaseUrl';


export default function IntroButton( props ) {
    return (
        <div className="col intro__col">
            <div>
                <a href={useBaseUrl(props.url)} className="button button--secondary button--lg feature__button--secondary" >
                    <img src={useBaseUrl(props.imgUrl)} width="120px" />
                    <br />
                    {props.text}
                </a>
            </div>
        </div>
    )
}

