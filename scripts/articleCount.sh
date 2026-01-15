#!/bin/bash

# This script counts the number of articles (MDX files) in the 'docs' directory
# and assembles a table of contents with their titles, slugs, and number of words.

DOCS_DIR="../docs"
OUTPUT_FILE="article_count.md"

echo "# Article Count" > $OUTPUT_FILE
echo "" >> $OUTPUT_FILE
echo "| Title | Slug | Word Count |" >> $OUTPUT_FILE
echo "|-------|------|------------|" >> $OUTPUT_FILE

for file in $(find $DOCS_DIR -name "*.mdx"); do
    # Extract title from the first line (assuming it's in the format: # Title)
    title=$(grep -m 1 '^# ' "$file" | sed 's/^# //')
    
    # Extract slug from frontmatter
    slug=$(grep -m 1 'slug:' "$file" | sed 's/slug: "//;s/"//')
    
    # Count words in the file
    word_count=$(wc -w < "$file")
    
    # Append to output file
    echo "| $title | $slug | $word_count |" >> $OUTPUT_FILE
done
