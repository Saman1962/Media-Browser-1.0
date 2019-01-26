# Postup spustenia

Databáza funguje externe cez www.mlab.com.

##  lokálne
1. *"npm install"*
2. *"npm run client-install"*
3. *"npm run dev"*

## docker (testované u mňa s vymazanými všetkými containers a images, v priečinku treba mať docker-compose.yml a Dockerfile z GitHubu)
1. *"docker-compose pull  app"*
2. *"docker-compose run -p 3000:3000 -p 5000:5000 app"*

## zadanie beži aj na Heroku ale bez funkcionality vyžadujúcu prácu so súborovým systémom

*https://glacial-scrubland-47198.herokuapp.com*