# Scripts für Dokumentations-Validierung

Dieses Verzeichnis enthält automatisierte Validierungs-Tools für die Knowledge Base.

## Verfügbare Scripts

### `validate-content.js`

Validiert alle Markdown-Dateien auf:

* Gültiges Frontmatter mit Slug
* Gültige Seitentitel
* Keine doppelten Titel

**Verwendung:**

```bash
npm run validate-content
```

## Dokumentation

* **[VALIDATION\_SETUP.md](VALIDATION_SETUP.md)** - Detaillierte Setup-Anleitung
* **[EXAMPLES.md](EXAMPLES.md)** - Beispiele für gültige und ungültige Dateien

## GitHub Actions Integration

Der automatische PR-Check ist in `.github/workflows/pr-validation.yml` definiert.

Er läuft automatisch bei Pull Requests und prüft:

1. ✅ Frontmatter & Titel-Validierung
2. ✅ Build-Success

## Lokales Testing

Vor dem Commit testen:

```bash
npm run write-translations
npm run crowdin download
npm run validate-content
npm run build
# oder alles zusammen:
npm run test:ci
```
