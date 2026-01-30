#!/usr/bin/env node

/**
 * Content Validation Script
 * 
 * Validates:
 * 1. Frontmatter present and valid YAML with at least one slug
 * 2. Valid page titles (h1 or title in frontmatter)
 * 3. No identical h1 and title values
 */

const fs = require('fs');
const path = require('path');

// Try to load glob, otherwise exit
let glob;
try {
    glob = require('glob');
} catch (e) {
    console.error('❌ Error: glob package not installed!');
    console.error('Please run: npm install');
    process.exit(1);
}

// Try to load gray-matter, otherwise exit
let matter;
try {
    matter = require('gray-matter');
} catch (e) {
    console.error('❌ Error: gray-matter package not installed!');
    console.error('Please run: npm install');
    process.exit(1);
}

const DOCS_DIR = path.join(__dirname, '../docs');
const ERRORS = [];
const WARNINGS = [];

// Check if docs directory exists
if (!fs.existsSync(DOCS_DIR)) {
    console.error(`❌ Error: Directory not found: ${DOCS_DIR}`);
    process.exit(1);
}

/**
 * Finds all md/mdx files recursively
 */
function findContentFiles() {
    try {
        return glob.sync('**/*.{md,mdx}', { cwd: DOCS_DIR });
    } catch (error) {
        console.error(`❌ Error searching for files: ${error.message}`);
        process.exit(1);
    }
}

/**
 * Validates frontmatter of a file
 */
function validateFrontmatter(filePath, content) {
    const errors = [];
    const warnings = [];

    try {
        const { data, matter: frontmatterContent } = matter(content);

        // Check if frontmatter is empty
        if (Object.keys(data).length === 0) {
            errors.push(`No frontmatter present`);
            return { hasErrors: true, errors, warnings };
        }

        // Check for slug
        if (!data.slug) {
            errors.push(`Slug missing in frontmatter`);
        } else if (typeof data.slug !== 'string' || data.slug.trim() === '') {
            errors.push(`Slug must be a non-empty string (received: ${JSON.stringify(data.slug)})`);
        } else {
            // Validate slug format (URL best practices)
            const slug = data.slug;

            // Check for uppercase letters (warning, but allowed)
            if (slug !== slug.toLowerCase()) {
                warnings.push(`Slug contains uppercase letters. The use of case-sensitive slugs is allowed but not recommended: "${slug}"`);
            }

            // Check for spaces
            if (/\s/.test(slug)) {
                errors.push(`Slug contains spaces. Use hyphens (-) or underscores (_): "${slug}"`);
            }

            // Check for invalid characters (allowed: a-z, A-Z, 0-9, /, -, _)
            const validSlugPattern = /^[a-zA-Z0-9/_-]+$/;
            if (!validSlugPattern.test(slug)) {
                errors.push(`Slug contains invalid characters. Only allowed: a-z, A-Z, 0-9, /, -, _: "${slug}"`);
            }
        }

        return {
            hasErrors: errors.length > 0,
            errors,
            warnings,
            frontmatter: data,
            content: content.split('---').slice(2).join('---').trim()
        };
    } catch (error) {
        return {
            hasErrors: true,
            errors: [`Error parsing frontmatter: ${error.message}`],
            warnings: []
        };
    }
}

/**
 * Validates page title
 */
function validateTitle(filePath, frontmatter, content) {
    const errors = [];
    const warnings = [];

    const h1Match = content.match(/^# (.+)$/m);
    const h1Title = h1Match ? h1Match[1].trim() : null;
    const fmTitle = frontmatter.title || null;

    // Check for at least one title
    if (!h1Title && !fmTitle) {
        errors.push(`No valid title found (neither h1 nor title in frontmatter)`);
    }

    // If both present, they must not be identical
    if (h1Title && fmTitle) {
        if (h1Title === fmTitle) {
            warnings.push(`h1 and frontmatter title are identical ("${h1Title}"). Should be different`);
        }
    }

    return { hasErrors: errors.length > 0, errors, warnings };
}

/**
 * Validates a single file
 */
function validateFile(relPath) {
    const filePath = path.join(DOCS_DIR, relPath);

    let content;
    try {
        content = fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
        return {
            file: relPath,
            errors: [`Error reading file: ${error.message}`],
            warnings: []
        };
    }

    const fileErrors = { file: relPath, errors: [], warnings: [] };

    // Step 1: Validate frontmatter
    const fmValidation = validateFrontmatter(relPath, content);
    fileErrors.errors.push(...fmValidation.errors);
    fileErrors.warnings.push(...fmValidation.warnings);

    if (!fmValidation.hasErrors && fmValidation.frontmatter) {
        // Step 2: Validate title
        const titleValidation = validateTitle(relPath, fmValidation.frontmatter, fmValidation.content);
        fileErrors.errors.push(...titleValidation.errors);
        fileErrors.warnings.push(...titleValidation.warnings);
    }

    return fileErrors;
}

/**
 * Main function
 */
function main() {
    console.log('🔍 Validating documents...\n');

    const files = findContentFiles();
    console.log(`📁 Files found: ${files.length}\n`);

    let fileCount = 0;
    let errorCount = 0;
    let warningCount = 0;

    files.forEach(file => {
        const validation = validateFile(file);

        if (validation.errors.length > 0 || validation.warnings.length > 0) {
            console.log(`📄 ${validation.file}`);

            if (validation.errors.length > 0) {
                console.log('  ❌ Errors:');
                validation.errors.forEach(err => {
                    console.log(`     - ${err}`);
                    errorCount++;
                });
            }

            if (validation.warnings.length > 0) {
                console.log('  ⚠️  Warnings:');
                validation.warnings.forEach(warn => {
                    console.log(`     - ${warn}`);
                    warningCount++;
                });
            }

            console.log('');
        }

        fileCount++;
    });

    // Summary
    console.log('\n📊 Summary:');
    console.log(`   Files checked: ${fileCount}`);
    console.log(`   Errors: ${errorCount}`);
    console.log(`   Warnings: ${warningCount}`);

    if (errorCount > 0) {
        console.log('\n❌ Validation failed!');
        process.exit(1);
    } else {
        console.log('\n✅ Validation successful!');
        process.exit(0);
    }
}

main();
