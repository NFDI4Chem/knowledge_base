import React from "react";
import useBaseUrl from '@docusaurus/useBaseUrl';


export default function IntroButton( props ) {
    return (
        <div className="col intro__col">
            <div>
                <a href={useBaseUrl(props.url)} className="button button--secondary feature__button--secondary" >
                    <div><img src={useBaseUrl(props.imgUrl)} width="120px" /></div>
                    <div>{props.text}</div>
                </a>
            </div>
        </div>
    )
}

