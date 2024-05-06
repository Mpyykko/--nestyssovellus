# Käyttötapauksen nimi: Äänestyssovellus

## Käyttäjät
- Ylläpitäjä
- Rekisteröitymätön käyttäjä

## Laukaisija
- Käyttäjä avaa etusivun
- Ylläpitäjä kirjautuu sisään

## Esiehto
-Kuka tahansa voi äänestää
- Ylläpitäjän tulee kirjautua sisään

## Jälkiehto
-Tavallinen käyttäjä näkee etusivulla kaikki valittavissa olevat äänestykset
-Ylläpitäjät näkevät kaikki äänestykset ja voivat muokata niitä

## Käyttötapauksen kulku
1. Käyttäjä valitsee haluamansa äänestyksen, ja äänestää
2. Äänestyksen jälkeen äänestys tilanne päivittyy
3. Ylläpitäjä syöttää käyttäjätunnuksen ja salasanan
4. Mikäli tunnukset ovat oikein, ylläpitäjä kirjautuu sisään
5. Ylläpitäjälle avautuu oma valikko

## Poikkeuksellinen toiminta
- Jos käyttäjätunnus tai salasana ei täsmää:
1. Järjestelmä antaa virheilmoituksen
2. Ylläpitäjä voi syöttää tunnukset uudestaan tai lisätä uuden ylläpitäjän
