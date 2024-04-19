#!/bin/bash

# get the data from the eln-finder

curl -o eln-finder.json "https://eln-finder.ulb.tu-darmstadt.de/server/api/discover/search/objects?sort=dc.title,ASC&f.K03=Chemistry,equals"

# add current date and time to the json

jq ". + {date: \"$(date -u)\" }" eln-finder.json > eln-finder-dated.json
