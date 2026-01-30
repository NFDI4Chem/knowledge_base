#!/usr/bin/env node

/**
 * Content Validation Script
 * 
 * Validiert:
 * 1. Frontmatter vorhanden und gültig YAML mit mindestens einem Slug
 * 2. Gültige Seitentitel (h1 oder title im Frontmatter)
 * 3. Keine identischen h1 und title Werte
 */

const fs = require('fs');
const path = require('path');

// Versuche glob zu laden, sonst fallback
let glob;
try {
    glob = require('glob');
} catch (e) {
    console.error('❌ Fehler: glob-Paket nicht installiert!');
    console.error('Bitte führe aus: npm install');
    process.exit(1);
}

// Versuche gray-matter zu laden, sonst fallback
let matter;
try {
    matter = require('gray-matter');
} catch (e) {
    console.error('❌ Fehler: gray-matter-Paket nicht installiert!');
    console.error('Bitte führe aus: npm install');
    process.exit(1);
}

const DOCS_DIR = path.join(__dirname, '../docs');
const ERRORS = [];
const WARNINGS = [];

// Prüfe ob docs-Verzeichnis existiert
if (!fs.existsSync(DOCS_DIR)) {
    console.error(`❌ Fehler: Verzeichnis nicht gefunden: ${DOCS_DIR}`);
    process.exit(1);
}

/**
 * Sucht alle md/mdx Dateien rekursiv
 */
function findContentFiles() {
    try {
        return glob.sync('**/*.{md,mdx}', { cwd: DOCS_DIR });
    } catch (error) {
        console.error(`❌ Fehler beim Suchen von Dateien: ${error.message}`);
        process.exit(1);
    }
}

/**
 * Validiert Frontmatter einer Datei
 */
function validateFrontmatter(filePath, content) {
    const errors = [];
    const warnings = [];

    try {
        const { data, matter: frontmatterContent } = matter(content);

        // Prüfe, ob Frontmatter leer ist
        if (Object.keys(data).length === 0) {
            errors.push(`Kein Frontmatter vorhanden`);
            return { hasErrors: true, errors, warnings };
        }

        // Prüfe auf Slug
        if (!data.slug) {
            errors.push(`Slug im Frontmatter fehlt`);
        } else if (typeof data.slug !== 'string' || data.slug.trim() === '') {
            errors.push(`Slug muss ein nicht-leerer String sein (erhalten: ${JSON.stringify(data.slug)})`);
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
            errors: [`Fehler beim Parsen des Frontmatters: ${error.message}`],
            warnings: []
        };
    }
}

/**
 * Validiert den Seitentitel
 */
function validateTitle(filePath, frontmatter, content) {
    const errors = [];
    const warnings = [];

    const h1Match = content.match(/^# (.+)$/m);
    const h1Title = h1Match ? h1Match[1].trim() : null;
    const fmTitle = frontmatter.title || null;

    // Prüfe mindestens einen Titel
    if (!h1Title && !fmTitle) {
        errors.push(`Kein gültiger Titel gefunden (weder h1 noch title im Frontmatter)`);
    }

    // Wenn beide vorhanden, dürfen sie nicht identisch sein
    if (h1Title && fmTitle) {
        if (h1Title === fmTitle) {
            warnings.push(`h1 und Frontmatter-title sind identisch ("${h1Title}"). Sollten unterschiedlich sein`);
        }
    }

    return { hasErrors: errors.length > 0, errors, warnings };
}

/**
 * Validiert eine einzelne Datei
 */
function validateFile(relPath) {
    const filePath = path.join(DOCS_DIR, relPath);

    let content;
    try {
        content = fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
        return {
            file: relPath,
            errors: [`Fehler beim Lesen der Datei: ${error.message}`],
            warnings: []
        };
    }

    const fileErrors = { file: relPath, errors: [], warnings: [] };

    // Schritt 1: Frontmatter validieren
    const fmValidation = validateFrontmatter(relPath, content);
    fileErrors.errors.push(...fmValidation.errors);
    fileErrors.warnings.push(...fmValidation.warnings);

    if (!fmValidation.hasErrors && fmValidation.frontmatter) {
        // Schritt 2: Titel validieren
        const titleValidation = validateTitle(relPath, fmValidation.frontmatter, fmValidation.content);
        fileErrors.errors.push(...titleValidation.errors);
        fileErrors.warnings.push(...titleValidation.warnings);
    }

    return fileErrors;
}

/**
 * Hauptfunktion
 */
function main() {
    console.log('🔍 Validiere Dokumente...\n');

    const files = findContentFiles();
    console.log(`📁 Gefundene Dateien: ${files.length}\n`);

    let fileCount = 0;
    let errorCount = 0;
    let warningCount = 0;

    files.forEach(file => {
        const validation = validateFile(file);

        if (validation.errors.length > 0 || validation.warnings.length > 0) {
            console.log(`📄 ${validation.file}`);

            if (validation.errors.length > 0) {
                console.log('  ❌ Fehler:');
                validation.errors.forEach(err => {
                    console.log(`     - ${err}`);
                    errorCount++;
                });
            }

            if (validation.warnings.length > 0) {
                console.log('  ⚠️  Warnungen:');
                validation.warnings.forEach(warn => {
                    console.log(`     - ${warn}`);
                    warningCount++;
                });
            }

            console.log('');
        }

        fileCount++;
    });

    // Zusammenfassung
    console.log('\n📊 Zusammenfassung:');
    console.log(`   Dateien geprüft: ${fileCount}`);
    console.log(`   Fehler: ${errorCount}`);
    console.log(`   Warnungen: ${warningCount}`);

    if (errorCount > 0) {
        console.log('\n❌ Validierung fehlgeschlagen!');
        process.exit(1);
    } else {
        console.log('\n✅ Validierung erfolgreich!');
        process.exit(0);
    }
}

main();
