/**
 * Advanced Configuration für Content Validation
 * 
 * Diese Datei zeigt erweiterte Validierungs-Optionen,
 * die in validate-content.js implementiert werden können.
 */

module.exports = {
    // Pfade zu validierenden Dateien
    validation: {
        // Verzeichnis mit Dokumenten
        docsDir: 'docs',

        // Datei-Pattern
        filePatterns: ['**/*.md', '**/*.mdx'],

        // Verzeichnisse zu ignorieren
        ignore: ['node_modules', 'build', 'dist'],
    },

    // Frontmatter-Regeln
    frontmatter: {
        // Erforderliche Felder
        required: {
            slug: {
                type: 'string',
                pattern: /^\/[\w\-\/]*\/$/, // Muss mit / beginnen und enden
                message: 'Slug muss Format /my-slug/ haben',
            },
        },

        // Optionale Felder
        optional: {
            title: {
                type: 'string',
                minLength: 5,
                maxLength: 100,
                message: 'Title sollte 5-100 Zeichen sein',
            },
            description: {
                type: 'string',
                maxLength: 160,
                message: 'Description sollte max. 160 Zeichen sein (für SEO)',
            },
            sidebar_position: {
                type: 'number',
            },
            keywords: {
                type: 'array',
                items: { type: 'string' },
            },
        },
    },

    // Titel-Regeln
    title: {
        // h1 erforderlich oder title erforderlich (mindestens eines)
        requireEitherH1OrTitle: true,

        // Wenn beide vorhanden, dürfen sie nicht identisch sein
        mustDifferIfBothPresent: true,

        // Empfohlene h1-Länge für SEO
        h1MaxLength: 70,
    },

    // Content-Regeln
    content: {
        // Minimale Wort-Anzahl
        minWords: 10,

        // Maximum Länge für SEO
        maxWordsPerParagraph: 200,
    },

    // Link-Validierung (zukünftig)
    links: {
        // Validiere interne Links
        validateInternal: false,

        // Validiere externe Links (langsam!)
        validateExternal: false,
    },

    // Image-Validierung (zukünftig)
    images: {
        // Prüfe ob Dateien existieren
        validateExists: false,

        // Prüfe auf Alt-Text
        requireAlt: false,
    },

    // Spellcheck (zukünftig)
    spellcheck: {
        enabled: false,
        language: 'de',
        ignoreWords: ['Docusaurus', 'JavaScript'],
    },

    // Output-Optionen
    output: {
        // Verbose logging
        verbose: false,

        // Nur Errors zeigen (nicht Warnings)
        errorOnly: false,

        // JSON-Output für CI/CD
        json: false,
    },

    // Schweregrad einstellen
    severity: {
        // Welche Probleme als Error zählen (Exit Code 1)
        errors: [
            'MISSING_SLUG',
            'MISSING_TITLE',
            'DUPLICATE_TITLE',
            'INVALID_FRONTMATTER',
        ],

        // Welche Probleme nur Warnings sind
        warnings: [
            'MISSING_DESCRIPTION',
            'SHORT_TITLE',
            'LONG_DESCRIPTION',
        ],
    },

    // Exclude-Regeln (wie .gitignore)
    exclude: {
        paths: [
            'docs/_*',      // Verzeichnisse mit underscore
            'docs/[0-9]{2}_draft', // Draft-Verzeichnisse
            'docs/**/README.md',  // README.md Dateien
        ],
    },
};

/**
 * BEISPIEL ERWEITERUNGEN:
 * 
 * 1. SEO-Validierung:
 *    - Meta description prüfen
 *    - Keywords prüfen
 *    - Title length prüfen
 * 
 * 2. Link-Validierung:
 *    - Interne Links auf Existenz prüfen
 *    - External links auf Erreichbarkeit prüfen
 * 
 * 3. Image-Validierung:
 *    - Bilder auf Existenz prüfen
 *    - Alt-Text prüfen
 *    - Bildgröße prüfen
 * 
 * 4. Spellcheck:
 *    - Deutsche Rechtschreibung prüfen
 *    - Technische Begriffe in ignore-list
 * 
 * 5. Performance-Checks:
 *    - Dokumentenlänge prüfen
 *    - Abhängigkeiten prüfen
 * 
 * 6. Compliance:
 *    - Gültige Lizenz-Header
 *    - Required sections
 *    - Versioning-Info
 */
