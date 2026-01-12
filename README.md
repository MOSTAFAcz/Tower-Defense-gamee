🎮 Gameplay

Nepřátelé přichází ve vlnách

Každý nepřítel sleduje předdefinovanou trasu

Pokud nepřítel dojde do cíle → hráč ztratí HP

Zabíjením nepřátel hráč získává měnu

Za měnu lze stavět věže

Po poražení všech vln hra končí výhrou

Pokud HP klesne na 0 → Game Over

🧱 Herní mechaniky
Věže

Automaticky útočí na nepřátele v dosahu

Střílí projektily

Každá věž má:

dosah

damage

rychlost střelby

Nepřátelé

Různé typy:

Soldier – základní jednotka

EliteGuard – silnější, pomalejší

Boss – velmi silný nepřítel

Každý nepřítel má:

HP

rychlost

damage

reward (měna za zabití)

🌊 Vlny nepřátel

Nepřátelé jsou definováni v poli waves:

let waves = [
  { enemies: [1, 1, 1] },
  { enemies: [1, 1, 1, 1, 2, 2] },
  { enemies: [1, 1, 2, 2, 1, 2] },
  { enemies: [2, 2, 2, 3] },
];


Čísla odpovídají typům nepřátel:

1 → Soldier

2 → EliteGuard

3 → Boss

🕹️ Ovládání

Kliknutí na build spot → otevře build menu

Build Tower → postaví věž (stojí 5 měny)

Cancel → zavře build menu

🧠 Stav hry (Game State)

Hra používá jednoduchý state system:

PLAYING   // hra běží
WIN       // hráč porazil všechny vlny
GAMEOVER  // hráč ztratil všechny HP

🏆 Win / Game Over
Win

Všechny vlny byly spawnuty

Na mapě nejsou žádní nepřátelé

Game Over

Hráčovo HP klesne na 0

Po výhře nebo prohře se hra zastaví a zobrazí se odpovídající obrazovka.

🛠️ Použité technologie

JavaScript

p5.js

OOP přístup (Game, Enemy, Tower, Projectile)


🚀 Možná rozšíření

Upgrade věží

Více levelů

Restart / Next level tlačítko

Animace smrti nepřátel

Zvukové efekty

Ukládání skóre




Projekt vytvořen jako výuková / školní hra pro procvičení:

