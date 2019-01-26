# Postup spustenia

Databáza funguje externe cez www.mlab.com.

## lokálne

V priečinku client

1. _"npm install"_
2. _"npm run build"_

V hlavnom priečinku :

1. _"npm install"_
2. _"npm run dev"_

bude to dostupne v prehliadaci na http://localhost:3000

## docker (testované u mňa s vymazanými všetkými containers a images, v priečinku treba mať docker-compose.yml a Dockerfile z https://github.com/Saman1962/website)

1. _"docker-compose pull app"_
2. _"docker-compose run -p 3000:3000 -p 5000:5000 app"_

## zadanie beži aj na Heroku ale bez funkcionality vyžadujúcu prácu so súborovým systémom

_https://glacial-scrubland-47198.herokuapp.com_
