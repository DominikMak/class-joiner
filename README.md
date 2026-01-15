# Auto-Signer - Automatyczne zapisywanie na zajęcia siłowni

Narzędzie do automatycznego zapisywania się na zajęcia w systemie siłowni superowej przy użyciu Playwright.

## 📋 Spis treści

- [Wymagania](#wymagania)
- [Instalacja](#instalacja)
- [Konfiguracja](#konfiguracja)
- [Uruchomienie](#uruchomienie)
- [Rozwiązywanie problemów](#rozwiązywanie-problemów)

## 🔧 Wymagania

Przed rozpoczęciem upewnij się, że masz zainstalowane:

- **Node.js** (wersja 18 lub nowsza)
- **npm** (zazwyczaj instalowany razem z Node.js)

### Sprawdzenie, czy masz Node.js

Otwórz terminal (na macOS: Terminal, na Windows: PowerShell lub CMD) i wpisz:

```bash
node --version
npm --version
```

Jeśli zobaczysz numery wersji (np. `v20.10.0` i `10.2.3`), masz już zainstalowane Node.js i npm. Jeśli zobaczysz błąd, przejdź do sekcji [Instalacja Node.js](#instalacja-nodejs).

## 📦 Instalacja

### Instalacja Node.js

Jeśli nie masz Node.js:

1. **macOS:**
   - Pobierz instalator z [nodejs.org](https://nodejs.org/)
   - Wybierz wersję LTS (Long Term Support)
   - Uruchom pobrany plik `.pkg` i postępuj zgodnie z instrukcjami

2. **Windows:**
   - Pobierz instalator z [nodejs.org](https://nodejs.org/)
   - Wybierz wersję LTS
   - Uruchom pobrany plik `.msi` i postępuj zgodnie z instrukcjami

3. **Linux:**
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

Po instalacji zamknij i ponownie otwórz terminal, a następnie sprawdź wersję:
```bash
node --version
npm --version
```

### Instalacja projektu

1. **Sklonuj lub pobierz projekt**

   Jeśli masz projekt w repozytorium Git:
   ```bash
   git clone <adres-repozytorium>
   cd auto-signer
   ```

   Jeśli masz już folder projektu, otwórz terminal w tym folderze.

2. **Zainstaluj zależności**

   W terminalu, w folderze projektu, wpisz:
   ```bash
   npm install
   ```

   To może zająć kilka minut. Zostaną zainstalowane:
   - Playwright (narzędzie do automatyzacji przeglądarki)
   - Inne wymagane biblioteki

3. **Zainstaluj przeglądarki dla Playwright**

   Po zakończeniu `npm install`, uruchom:
   ```bash
   npx playwright install
   ```

   To pobierze przeglądarki Chromium potrzebne do działania narzędzia.

## ⚙️ Konfiguracja

### Tworzenie pliku .env

1. W głównym folderze projektu utwórz plik o nazwie `.env` (z kropką na początku).

2. Otwórz plik `.env` w edytorze tekstu i dodaj następujące zmienne:

   ```env
   EMAIL=twoj_email@example.com
   PASSWORD=twoje_haslo
   CLASS_TO_JOIN_NAME=Nazwa zajęć
   CLASS_TO_JOIN_DATE=DD.MM
   CLASS_TO_JOIN_TIME=HH:MM
   ```

3. **Wypełnij wartości:**

   - `EMAIL` - Twój adres email używany do logowania w siłowni
   - `PASSWORD` - Twoje hasło do konta siłowni
   - `CLASS_TO_JOIN_NAME` - Nazwa zajęć, na które chcesz się zapisać (np. "Joga", "Pilates")
   - `CLASS_TO_JOIN_DATE` - Data zajęć w formacie DD.MM (np. "15.12")
   - `CLASS_TO_JOIN_TIME` - Godzina rozpoczęcia zajęć w formacie HH:MM (np. "18:00")

   **Przykład:**
   ```env
   EMAIL=jan.kowalski@example.com
   PASSWORD=moje_bezpieczne_haslo
   CLASS_TO_JOIN_NAME=Joga
   CLASS_TO_JOIN_DATE=20.12
   CLASS_TO_JOIN_TIME=18:00
   ```

4. **Zapisz plik** (upewnij się, że nazwa to dokładnie `.env` z kropką na początku)

### Ważne uwagi

- ⚠️ **NIE udostępniaj pliku `.env`** - zawiera on Twoje dane logowania
- Plik `.env` jest już dodany do `.gitignore`, więc nie zostanie przypadkowo przesłany do repozytorium
- Upewnij się, że data i godzina są dokładnie takie, jak wyświetlane na stronie siłowni

## 🚀 Uruchomienie

Gdy wszystko jest skonfigurowane, uruchom test:

```bash
npx playwright test
```

Narzędzie:
1. Otworzy przeglądarkę Chromium
2. Zaloguje się na Twoje konto siłowni
3. Przejdzie do sekcji rezerwacji
4. Znajdzie zajęcia zgodnie z podanymi parametrami
5. Zapisze Cię na zajęcia

### Uruchomienie z wyświetlaniem przeglądarki

Aby zobaczyć, co się dzieje (przydatne przy pierwszym uruchomieniu):

```bash
npx playwright test --headed
```

### Wyświetlenie raportu HTML

Po zakończeniu testu możesz zobaczyć szczegółowy raport:

```bash
npx playwright show-report
```

## 🔍 Rozwiązywanie problemów

### Problem: "command not found: node" lub "command not found: npm"

**Rozwiązanie:** Node.js nie jest zainstalowany lub nie jest w PATH. Zainstaluj Node.js zgodnie z instrukcjami powyżej i zrestartuj terminal.

### Problem: "Cannot find module '@playwright/test'"

**Rozwiązanie:** Zależności nie zostały zainstalowane. Uruchom:
```bash
npm install
```

### Problem: "Executable doesn't exist"

**Rozwiązanie:** Przeglądarki Playwright nie zostały zainstalowane. Uruchom:
```bash
npx playwright install
```

### Problem: "Class to join not found"

**Rozwiązanie:** 
- Sprawdź, czy nazwa zajęć w `.env` jest dokładnie taka sama jak na stronie
- Sprawdź format daty (DD.MM) i godziny (HH:MM)
- Upewnij się, że zajęcia są dostępne w systemie

### Problem: Błąd logowania

**Rozwiązanie:**
- Sprawdź, czy email i hasło w pliku `.env` są poprawne
- Upewnij się, że nie ma dodatkowych spacji w pliku `.env`
- Spróbuj zalogować się ręcznie na stronie, aby upewnić się, że konto działa

### Problem: Plik .env nie jest rozpoznawany

**Rozwiązanie:**
- Upewnij się, że plik nazywa się dokładnie `.env` (z kropką na początku, bez rozszerzenia)
- Na Windows: jeśli nie możesz utworzyć pliku zaczynającego się od kropki, użyj edytora kodu (VS Code, Notepad++) lub utwórz go przez terminal:
  ```bash
  echo. > .env
  ```

**Powodzenia z automatycznym zapisywaniem na zajęcia! 🎉**
