---
# FitCoach
## Struktura Projektu
- `/node_modules`  // generowane przez node.js
- `/public`  //obrazy i pliki css (w naszym przypadku jeden plik css i favicon)
	- `/css`
	- `/img`
- `/server`  // największy boss, zawiera konfigurację route'ów, kontrolery, model użytkownika i łączenie z bazą danych
	- `/config`
	- `/controllers`
	- `/models`
	- `/routes`
- `/views`  // layouty i ogólnie wygląd poszczególnych stron
	- `/dashboard`
	- `/login`
	- `/signup`
	- `/layouts`
	- `/partials`
	- `index.ejs`
- `.env`  // environmental variables, mamy tam connection string do bazy danych, można ustawiać tam jakieś rzeczy typu właśnie linki które mogą się potencjalnie zmienić (dajemy ten plik do .gitingore, żeby nie udostępniać takich rzeczy)
- `app.js`  // główny plik aplikacji, ma komentarze tłumaczące co robi co
- `package-lock.json`  // generowane przez node.js
- `package.json`  // generowane przez node.js (zawiera wszystkie moduły i setup aplikacji)

## Baza danych
### MongoDB
To nierelacyjna baza danych opierająca się dokumentach w stylu plików JSON, wybrana została ze względu na jej popularność i prostotę implementacji, oraz pakiet mongoose który pozwala na relatywnie prostą konfigurację i łączenie się z bazą.
### MongoDBCompass
Aplikacja za pomocą której możemy połączyć się z samą bazą danych, dodawać i edytować kolekcję w bazie oraz podejrzeć strukturę samej bazy i sprawdzić czy wszystko działa tak jak powinno.
### /server/config/db.js
Plik który odpowiada za łączenie się z bazą danych, ma komentarze.
### Dane
W pliku `/server/models/User.js` została utworzona struktura naszych danych przechowywanych w bazie (tzw. schema/model).
Szyfrowanie haseł odbywa się za pomocą pakietu `bcrypt.js`.
## /server
### /config
Zawiera w.w. plik `db.js` który łączy z bazą.
### /controllers
Kontrolery obsługują przychodzące żądania (request) 
#### dashboardController.js
Obsługuje cały "backend" dashboardu i jego podstron
- formularz edytowania profilu
- formularz dziennika
- liczenie BMI, BMR i TDEE
#### main, login i sign up controllers
Przesyła odpowiednią stronę 
### /routes
Dopełnienie kontrolerów, obsługuje funkcje w kontrolerach i odsyła użytkownika do odpowiednich podstron
#### auth.js
Tu dzieje się cała autoryzacja i rejestracja użytkownika przy użyciu pakietu passport i strategii passport-local.
#### dashboard.js
Przesyłanie stron i sprawdzanie czy jest aktualnie zalogowany użytkownik.
#### index.js, logIn.js i signUp.js
Zajmują się przesyłaniem stron.
### /models
Zawiera wcześniej opisany plik `User.js`.

## /views
### EJS
"EJS, czyli Embedded JavaScript, to prosty silnik szablonów dla Node.js. Pozwala na generowanie dynamicznego kodu HTML za pomocą składni JavaScript.

W plikach EJS możemy używać tagów `<% %>` do osadzania kodu JavaScript bezpośrednio w HTML. Na przykład, `<%= locals.title %>` wstawia wartość `locals.title` do HTML."
### /layouts
Zawiera szablony dla wszystkich stron z wykorzystaniem składni EJS.
### /partials
Zawiera elementy wykorzystywane na wielu stronach (header i footer).
### /login, /signup, /dashboard, index.ejs
Zawierają zawartości odpowiadających sobie stron oraz w przypadku `/dashboard` również podstron.
### Chart.js
 "Biblioteka JavaScript, która umożliwia generowanie interaktywnych wykresów na stronach internetowych."
 Została  wykorzystana do stworzenia głównego wykresu na stronie `/dashboard`
 

