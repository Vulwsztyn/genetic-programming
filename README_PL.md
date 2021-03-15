# Programowanie Genetyczne

## Intro
Celem projektu było stworzenie strony umożliwiającej użytkownikowi generację matematycznych funkcji, które jak najlepiej odwzorowuje dane punkty. Strona ta istnieje pod adresem: https://vulwsztyn.github.io/genetic-programming/.

## Wyjaśnienie o co chodzi dla zwykłych śmiertelników

### Założenia

Załóżmy, że otrzymałeś zadanie wykonania tego, co robi ten program i otrzymałeś zbiór punktów, które masz jak najlepiej przybliżyć losową funkcją. Załóżmy także, że nie masz pojęcia o regresji liniowej, metodzie Newtona etc., ale za to bardzo szybko tworzysz i losowe funkcje i je ewaluujesz (bo komputery tak robią).


### Jak wygenerować losową funkcję (na podstawie przykładu)

Dane Ci są: zbiór funkcji `sin, cos, multiply, add, log` i wartości `x0, 1, 0, 2, range(-10,10)` (range oznacza, że możesz wziąć losową wartość z tego zakresu).

Możesz wybierać funkcje lub wartości np. rzucając kostką.

W dalszej części pomijam wszystkie "załóżmy".

Proces zaczyna sie wybraniem funkcji `sin`. `sin` jest funkcją unarną (ma 1 parametr), więc ponownie musimy wybrać pojedynczą funkcję lub wartość. Aktualnie nasza losowa funkcja wygląda tak: `sin(_)` (`_` Będzie wypełnione w następnym kroku).

By wypełnić lukę wybierasz mnożenie. mnożenie ma 2 parametry więc nasza funkcja to teraz: `sin(_*_)` i trzeba wybrać 2. funkcje lub parametry by uzupełnić luki

Wybierasz `range(-10,10)` i `log`. `range` został wybrany celowo by pokazać, jak działa. Musisz wygenerować (np. przy pomocy pythona) 1. losową wartość z zakresu (rzeczywistą jeżeli domena jest rzeczywista, liczbę całkowitą, gdy całkowita). Wygenerowałeś -6. Funkcja wygląda teraz następująco: `sin(-6*log(_,_))`.

Istnieje ograniczenie na liczbę "poziomów" funkcji, więc gdyby było to `3` to w następnym kroku musiałbyś wybrać wartość, ale nie funkcję. Załóżmy, że tak jest.

 Wybierasz `2` i `x0` by wypełnić luki. Ostatecznie funkcja przybiera postać: `sin(-6*log(2,x0))`.

Może ona lepiej lub gorzej przybliżać dane punkty, więc generujesz jeszcze 24999 kolejnych funkcji, tym samym tworząc pokolenie funkcji (osobników). 

### Jak są generowane kolejne pokolenia?

Kolejne pokolenia są generowane mniej losowo niż pierwsze. Są tworzone poprzez mutację lub krzyżowanie wykonywane na obecnej populacji.

Mutacja działa następująco: wybierasz pojedynczą funkcję z obecnej populacji np. `sin(-6*log(2,x0))` i wybierasz, którą jej część zmutować, czyli podmienić. Wybierasz `log`, więc usuwasz `log` wraz z parametrami i zastępujesz `_`: `sin(-6*_)` i działasz tak, jakbyś tworzył funkcję od nowa wypełniając lukę. Mógłbyś stworzyć `sin(-6*(x0+4))` lub `sin(-6*x0)` lub `sin(-6*cos(2))` (tak, to jest stała), etc.

Krzyżowanie polega na wyborze 2. osobników z populacji i zamienieniu ich części. Wybierasz `log(x0,(4*x0))+sin(cos(2))` i `2*log(4,log(2,x0))` z pierwszej do wymiany wybierasz `(4*x0)`, z drugiej `2`. Krzyżowanie tworzy, więc następujące "dzieci": `log(x0,2)+sin(cos(2))` i `(4*x0)*log(4,log(2,x0))`.

Tworzenie "dzieci" przy pomocy mutacji i krzyżowania następuje, aż nie zostanie utworzone nowe pokolenie o liczności poprzedniego. Wtedy następuje wymiana pokoleń i proces zaczyna się na nowo, aż nie zostanie osiągniey limit populacji.

### Jak oceniany jest osobnik?

Funkcja osobnika otrzymuje jako parametry punkty podane przez użytkownika.
Należy zauważyć, że ostatnia wartość danego punktu nigdy nie jest traktowana jako wartość wejściowa np. dla punktu`2, 4` `x0 = 2` i `y = 4`, a `y` nigdy nie jest parametrem funkcji-osobnika. Podobnie dla `0, 1, 1, 1` `x0 = 0, x1 = 1, x2 = 1, y = 1`. 

Następnie obliczana jest różnica między wartością zwróconą przez funkcję a podaną przez użytkownika (`y`). Różnica jest podnoszona do 2. potęgi. Suma błędów podniesionych do drugiej potęgi to "fitness" osobnika. Im niższy tym dany osobnik lepiej przybliża dane punkty.

## Interfejs użytkownika

Użytkownik może zdefiniować następujące parametry:

- `Typ Problemu` - definiuje, czy domena funkcji ma być rzeczywista, całkowita, lub boolowska. Wpływa na zbiór możliwych do użycia funkcji.
- `Wielkość Populacji` - definiuje liczbę osobników w pokoleniu
- `Maksymalna Głębokość Drzewa` - definiuje maksymalny poziom zagnieżdżenia funkcji
- `Wielkość turnieju` - definiuje wielkość turnieju. Najlepszy wygrywa.
- `Prawdopodobieńswto krzyżowania` - prawdopodobieństwo krzyżowania zamiast mutacji
- `Punkty` -  zbiór punktów do przybliżenia
- `Możliwe liście` - definiuje możliwe wartości w liściach drzewa funkcji. Jedna linia powinna zawierać wartość (e.g. `3.14`) lub zakres (e.g. `(-10,10)`).  Automatycznie zawarte są wszystkie zmienne ( `x0, x1, x2, ...`).
- `Dostępne Funkcje` - zbiór funkcji, które mogą być użyte do utworzenia funkcji

Użytkownik ma także dostęp do 4. guzików:
- `Stwórz Pierwsze Pokolenie` - tworzy pierwsze pokolenie
- `Stwórz Następne Pokolenie` - tworzy kolejne pokolenie
- `Stwórz N Pokoleń` - jak wyżej, ale `n` razy
- `Reset` - resetuje postęp algorytmu

## Logika
### Przykładowy osobnik:
![Equation Tree](/assets/eq_as_tree.png)

Algorytm generuje osobniiki, które możnaby otypować następująco:
```javascript
interface TNode { // wierzchołek będący liściem
    type: 'T'
    value: Number | boolean 
    level: Number // liczba całkowita
}
interface FNode { // wierzchołek będący funkcją
    type: 'F'
    name: string 
    level: Number // liczba całkowita
    children?: Node[], // parametry wykonania funkcji, ma długość równą arności funkcji
}
type Node = TNode | FNode
```

Jeżeli pokolenie jest pierwsze to wszystkie osobniki były stworzone losowo ze wszystkich dostępnych funkcji i wartości. Pokolenie jest zawsze posortowane po wartości "fitnessu".

Jeżeli pokolenie nie jest pierwsze to jest genereowane poprzez mutację i krzyżowanie osobników z poprzedniego pokolenia. Wybór operatora (mutacja lub krzyżowanie) następuje losowo z prawdopodobieństwem `Prawdopodobieńswto krzyżowania`. Mutacja tworzy jedno "dziecko", krzyżowanie 2

"Rodzice" są wybierani na podstawie turnieju. `Wielkość turnieju` osobników jest wybieranych losowo i wygrywa (czyli zostaje rodzicem) najlepszy z nich.

Mutacja to zastąpienie losowego węzła (funkcji lub wartości) nowym losowo wygenerowanym węzłem.

Krzyżowanie to wymiana losowych węzłów pomiędzy rodzicami