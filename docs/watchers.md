# Exchange Watcher

Analiza informacion de un exchange en periodos regulares de tiempo y genera una baliza por cada alerta programada que se dispare.

Por cada exchange se programa un watcher que interactua con la API del exchange. Los watchers son ejecutados desde un cron con un lista de las alertas que deben verificar.

