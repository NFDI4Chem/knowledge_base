import React from 'react';
import { TagCloud } from 'react-tagcloud';

function RandCount( min,max ) {
    return Math.floor(Math.random() * (max - min) + min);
}

function KbTagCloud( {cloudTags, min, max, shuffle} ) {

    const tags = cloudTags.map(item => ({value: item, count: RandCount(min,max)}))

    return(
        <TagCloud
            minSize={min}
            maxSize={max}
            colorOptions={{ luminosity: "dark" }}
            tags={tags}
            shuffle={shuffle}
        />
    )
}

export default KbTagCloud;