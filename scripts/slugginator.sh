#!/bin/bash

## Script to automatically add slug to frontmatter for permalinking

regex='[0-9]+\_([a-zA-Z0-9_-]*).mdx'

for i in "$@"
do
    echo "$i"
    if [[ $i =~ $regex ]]; then
        slug="slug: \"/docs/${BASH_REMATCH[1]}\""
        echo $slug
        sed -i '/slug:.*/d' $i                                          # Remove existing slug
        sed -i ':a;N;$!ba; s,---,'"$slug"'\n---,2' $i
    fi
 done

