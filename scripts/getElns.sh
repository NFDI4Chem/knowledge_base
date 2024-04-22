#!/bin/bash

targetDir="/git/n4c-kb_jl/build/assets"

# get the data from the eln-finder

curl -o eln-finder.json "https://eln-finder.ulb.tu-darmstadt.de/server/api/discover/search/objects?sort=dc.title,ASC&f.K03=Chemistry,equals"

# add current date and time to the json

jq ". + {date: \"$(date -u)\" }" eln-finder.json > $targetDir/elnData.json
