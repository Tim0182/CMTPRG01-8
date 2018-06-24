<h1>Tower Defense</h1>

Het koninkrijk Gazorpazorp wordt aangevallen door een eindeloze horde tanks. Het is jouw taak om zo snel mogelijk de verdedigingstorens te upgraden en van munitie te voorzien. Als er teveel tanks door je verdediging breken dan is het game over! 

<h2>Installatie instructies.</h2>
Download de game en ga naar de folder "docs" en open het "index.html" bestand in je broweser. Er hoeft niks geïnstalleerd te worden, je kan direct spelen.

<h2>Speluitleg</h2>
rechtsonder zijn 2 buttons. De button met de kogel kan nieuwe kogels voor de torens kopen. De bytton met de toren kan de torens upgraden. Elke buttonklik haalt 10 goudstukken weg (deze kan je rechtsboven in het spel zien). De torens moeten eerst 1x een level omhoog gaan voordat ze kunnen schieten. De torens kunnen 3x totaal geüpgrade worden. Zodra er 10 tanks langs je torens rijden ben je gameover en begint het spel opnieuw.

<h2>Pull request</h2>
Met deze pull request heb ik een extra "Shoot Behaviour" toegevoegd. Ik zag dat Arno bezig was met een LevelManager, voor elke level komen er meer meteorieten bij, maar er zijn geen beter upgrades om meer meteorieten kapot te schieten.

https://github.com/Tim0182/CMTPRG01-9/commit/50abd7552c010072364220c08c8dcc401c939a21

<h2>Peer review</h2>
https://github.com/ArnovanDoesburg/Asteroid-Assault/issues/1

<h2>Desihn Patterns</h2>
<h3>Singleton</h3>
De Singleton is op de GameOver.ts geplaatst. Zodra er het aantal levens op 0 staat wordt de GameOver instance aangeroepen. Dit is nu alleen nog voor het aantal levens. Dit wil ik in de toekomst verder uitwerken met acties zoals: Schiet 100 tanks kapot binnen [x] minuten anders wordt GameOver.ts aangeroepen. Of verdien 1000 gold binnen [x] aantal minuten om te winnen anders wordt GameOver.ts aangeroepen.

<h3>Strategy & Observer</h3>
Het Strategy pattern is toegepast in de vorm van shootingbehaviours voor de verschillende torens. Deze word aangepast op het moment dat de speler zijn torens upgrade door een bepaald aantal keer te klikken op de bijbehorende knop.

Iedere toren(observer) luistert naar wanneer de upgrade knop(subject) voldoende keren is aangeklikt om torens te laten upgraden. Daarbij heeft iedere toren een notify functie waarin gekeken word welk level de toren is en welke nieuwe shootingbehaviour er moet worden gecreëerd.

<h3>Polymorphisme</h3>
De classes tower.ts, bullet.ts, zombie.ts en gameover.ts extenden allemaal van gameobject.ts wat ze allemaal een GameObject maakt. bulletbutton.ts en towerbutton.ts zijn beide van het type button.ts.

<h2>Een klassendiagram.</h2>
Coming soon™

<h2>Url naar game</h2>
http://timvdh.nl/CMTPRG01-8/docs/

<h2>Authors</h2>
Tim van der Hoek - development<br>
HRO & Pinterest - graphics