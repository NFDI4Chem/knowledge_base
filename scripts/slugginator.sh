#!/bin/bash

## Bash script to automatically add slug to frontmatter for permalinking
## Usage example: slugginator.sh *.mdx to "slug" all mdx files in present directory

# Regex for matching file name without number and ending

regex='[0-9]+\_([a-zA-Z0-9_-]*).mdx'

for i in "$@"
do
    echo "$i"

    # check if filename fits the pattern

    if [[ $i =~ $regex ]]; then

        #compose slug string from filename
        slug="slug: \"/docs/${BASH_REMATCH[1]}\""

        echo "File $i: Slug is added to frontmatter:"
        echo "$slug"
        
        # Remove existing slug
        sed -i '/slug:.*/d' $i
        sed -i ':a;N;$!ba; s,---,'"$slug"'\n---,2' $i
    fi
 done

