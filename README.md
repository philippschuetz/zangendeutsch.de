# zangendeutsch.de
Wörterbuch für [Zangendeutsch](https://www.bedeutungonline.de/was-ist-zangendeutsch-woerterbuch-erklaerung-bedeutung/), inspiriert duch [r/ich_iel](https://old.reddit.com/r/ich_iel/) auf Reddit und [c/ich_iel (alt)](https://feddit.de/c/ich_iel) bzw. [c/ich_iel (neu)](https://feddit.org/c/ich_iel) im Fediverse.

## Wörter eintragen
- Repository klonen
- Neuen Branch vom developer Branch erstellen (z.B: word/mein-neues-wort)
- Eintrag in [data.ts](https://github.com/philipp-schuetz/zangendeutsch.de/blob/main/src/lib/data.ts) hinzufügen oder bestehen verändern
  - ```ts
    {
        original: "Spotify",
        translations: ["Punktifizieren"],
        comment: ""
    }
    ```
- Pull Request abschicken

Neu bei GitHub? [Hilfe zu GitHub Beiträgen](https://github.com/firstcontributions/first-contributions/blob/main/translations/README.de.md)

## Nutzung der API
Für die URL `https://zangendeutsch.de/api?query=fir` wird diese Antwort zurückgegeben:
```json
{
  "query": "fir",
  "matches": [
    {
      "original": "Firefox",
      "translations": ["Feuerfuchs"],
      "comment": "Browser"
    },
    {
      "original": "Firewall",
      "translations": ["Feuerwand"],
      "comment": ""
    }
  ]
}
```
Bei einem leeren Suchbegriff (`query`) werden alle verfügbaren Einträge zurückgegeben.
Für Pliersenglish liegt die API bei `https://zangendeutsch.de/pliersenglish/api`

## Entwickeln
Aufsetzen der Entwicklungsumgebung mit npm:
```bash
# install dependencies
npm install
# run dev server
npm run dev
```

Aufsetzen der Entwicklungsumgebung mit Docker:
```bash
# build and run docker container with compose
docker compose up --build
```

Für Änderungen bitte neuen feature Branch von developer erstellen (z.B: feature/mein-neues-feature)
