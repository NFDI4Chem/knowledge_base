#!/usr/bin/env bash
# Scans a Docusaurus build log for warnings and broken links/anchors.
# Usage: check-build-log.sh <path-to-build.log>

set -o pipefail

BUILD_LOG="${1:?Usage: check-build-log.sh <path-to-build.log>}"

WARNINGS=$(grep -Ei "^\[WARNING\]|^Warning:" "$BUILD_LOG" || true)

if [ -n "$WARNINGS" ]; then
	WARNING_DETAILS=$(awk '
      BEGIN {capture=0; printed=0}
      /^\[WARNING\]|^Warning:/ {
        capture=1
        if (printed++) print ""
        print
        next
      }
      capture && /^\[[^]]+\]/ {
        capture=0
        next
      }
      capture {print}
    ' "$BUILD_LOG")

	echo "## Build warnings" >>"$GITHUB_STEP_SUMMARY"
	echo "Detected build warnings and related output:" >>"$GITHUB_STEP_SUMMARY"
	echo '```text' >>"$GITHUB_STEP_SUMMARY"
	echo "$WARNING_DETAILS" >>"$GITHUB_STEP_SUMMARY"
	echo '```' >>"$GITHUB_STEP_SUMMARY"

	while IFS= read -r line; do
		echo "::warning title=Build warning::$line"
	done <<<"$WARNINGS"
fi

BROKEN_REFERENCES=$(grep -Ei "Docusaurus found broken (links|anchors)" "$BUILD_LOG" || true)

if [ -n "$BROKEN_REFERENCES" ]; then
	echo "::error title=Broken references detected::Docusaurus reported broken links or anchors during build."
	echo "## Broken references policy" >>"$GITHUB_STEP_SUMMARY"
	echo "Build failed because broken links or broken anchors were detected." >>"$GITHUB_STEP_SUMMARY"
	exit 1
fi
