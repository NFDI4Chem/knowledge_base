# PR Validation Setup

Dieses Dokument erklärt den automatischen Test-Setup für Pull Requests.

## Überblick

Das System validiert bei jedem PR automatisch:

1. **Frontmatter-Validierung** (`scripts/validate-content.js`)
    - Alle md/mdx-Dateien müssen gültiges YAML-Frontmatter haben
    - Mindestens ein `slug` muss im Frontmatter vorhanden sein
2. **Titel-Validierung** (`scripts/validate-content.js`)
    - Jede Seite muss einen gültigen Titel haben (mindestens eine der folgenden Optionen):
        - Eine `h1`-Überschrift (`# Titel`)
        - Ein `title` im Frontmatter
    - Falls beide vorhanden sind, dürfen sie nicht identisch sein
3. **Build-Validierung** (`GitHub Actions Workflow`)
    - Der Docusaurus-Build muss fehlerfrei laufen
    - Keine Warnings oder Errors beim Build

## Komponenten

### 1. Validierungsskript

**Datei:** `scripts/validate-content.js`

Das Node.js-Skript prüft alle md/mdx-Dateien im `docs/`-Verzeichnis:

```bash
# Lokal ausführen:
npm run validate-content

# Oder direkt:
node scripts/validate-content.js
```

**Ausgabe-Beispiel:**

```
🔍 Validiere Dokumente...

📁 Gefundene Dateien: 42

📄 docs/10_domains/example.md
  ❌ Fehler:
     - Slug im Frontmatter fehlt
  ⚠️  Warnungen:
     - h1 und Frontmatter-title sind identisch

📊 Zusammenfassung:
   Dateien geprüft: 42
   Fehler: 2
   Warnungen: 1

❌ Validierung fehlgeschlagen!
```

### 2. GitHub Actions Workflow

**Datei:** `.github/workflows/pr-validation.yml`

Der Workflow läuft automatisch bei Pull Requests:

- Triggert bei PRs mit Änderungen in `docs/`, `package.json`, oder dem Workflow selbst
- Installiert Dependencies
- Führt Frontmatter/Titel-Validierung durch
- Führt Docusaurus-Build durch
- Meldet Ergebnisse im PR

## Anforderungen für Dokumente

### Mindestanforderungen für md/mdx-Dateien:

```markdown
---
slug: /my-page/
title: Mein Seitentitel
description: Kurzbeschreibung (optional)
---

# Anderer Titel als im Frontmatter

Hier kommt der Inhalt...
```

**Gültige Varianten:**

✅ Mit Frontmatter-Title und h1:

```yaml
---
slug: /page/
title: Page Title
---
# Different Title
```

✅ Mit nur h1:

```yaml
---
slug: /page/
---
# Page Title
```

✅ Mit nur Frontmatter-Title:

```yaml
---
slug: /page/
title: Page Title
---
Inhalt ohne h1...
```

### Ungültige Varianten:

❌ Kein Slug:

```yaml
---
title: Page Title
---
```

❌ Identische Titel:

```yaml
---
slug: /page/
title: Same Title
---
# Same Title
```

❌ Kein Title:

```yaml
---
slug: /page/
---
Nur Inhalt, kein Titel...
```

## Dependencies

Für das Validierungsskript werden zwei neue devDependencies hinzugefügt:

```json
{
	"devDependencies": {
		"glob": "^10.3.10",
		"gray-matter": "^4.0.3"
	}
}
```

Diese müssen installiert werden:

```bash
npm install
```

## Installation & Setup

1. **Dependencies installieren:**

    ```bash
    npm install
    ```

2. **Lokal testen:**

    ```bash
    npm run validate-content
    npm run build
    ```

3. **Beide Tests zusammen:**
    ```bash
    npm run test:ci
    ```

## CI/CD Integration

### Lokale Entwicklung vor Push:

```bash
# Vor dem Commit
npm run validate-content

# Vor dem Push
npm run test:ci
```

### GitHub Actions

Der Workflow `pr-validation.yml` läuft automatisch bei jedem PR. Die Prüfungen müssen bestanden werden, bevor der PR gemerged werden kann.

**Status in GitHub:**

- 🟢 Grün = Alle Checks bestanden
- 🔴 Rot = Ein oder mehrere Checks fehlgeschlagen

## Fehlerbehebung

### Fehler: "Slug im Frontmatter fehlt"

Lösung: Füge einen Slug zum Frontmatter hinzu:

```yaml
---
slug: /my-unique-slug/
---
```

### Fehler: "h1 und title sind identisch"

Lösung: Nutze unterschiedliche Texte:

```yaml
---
slug: /page/
title: Page Title
---
# Detailed Explanation of This Topic
```

### Fehler: "Keine h1 und kein title im Frontmatter"

Lösung: Nutze mindestens eine der beiden Optionen:

```yaml
---
slug: /page/
title: Page Title # Option 1
---
# oder Option 2
---
slug: /page/
---
# Page Title
```

### Build-Fehler

- Prüfe auf broken links
- Prüfe auf broken images
- Prüfe MDX-Syntax
- Schau in die Build-Logs

## Erwiterungsmöglichkeiten

Das System lässt sich leicht erweitern um:

- Maximal erlaubte Dateigröße
- Link-Validierung
- Image-Validierung
- SEO-Checks (Meta-Description, etc.)
- Linting (Remark, MDLint)
- Spellchecking

## Support

Bei Fragen oder Problemen:

1. Prüfe die lokale Validierung: `npm run validate-content`
2. Schau in die GitHub Actions Logs des PR
3. Vergleiche mit anderen Dokumenten, die die Tests bestehen
