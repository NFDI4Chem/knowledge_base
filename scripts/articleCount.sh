#!/bin/bash

# This script counts the number of articles (MD or MDX files) in the 'docs' directory
# and assembles a table of contents with their titles, slugs, and number of words.

DOCS_DIR="../docs"
OUTPUT_FILE="article_count.md"

echo "# Article Count" > $OUTPUT_FILE
echo "" >> $OUTPUT_FILE
echo "| Title | Slug | MD/MDX file path |Word Count |" >> $OUTPUT_FILE
echo "|-------|------|------------|" >> $OUTPUT_FILE

for file in $(find $DOCS_DIR -name "*.mdx" -o -name "*.md"); do
    # Extract title from the first line (assuming it's in the format: # Title)
    # If no # header is given, try to find the title from frontmatter
    title=$(grep -m 1 '^# ' "$file" | sed 's/^# //')
    if [ -z "$title" ]; then
        title=$(grep -m 1 'title:' "$file" | sed 's/title: "//;s/"//')
    fi
    
    # Extract slug from frontmatter
    slug=$(grep -m 1 'slug:' "$file" | sed 's/slug: "//;s/"//')
    
    # Relative file path
    relative_path=${file#"$DOCS_DIR/"}

    # Count words in the file
    word_count=$(wc -w < "$file")

    # Remove linebreaks

    title=$(echo $title | tr -d '\n' | tr -s ' ')
    slug=$(echo $slug | tr -d '\n' | tr -s ' ')
    relative_path=$(echo $relative_path | tr -d '\n' | tr -s ' ')
    word_count=$(echo $word_count | tr -d '\n' | tr -s ' ')
    
    # Append to output file
    echo "| $title | $slug | $relative_path | $word_count |" >> $OUTPUT_FILE
done
