#FROM node:latest
#WORKDIR /app
#COPY . /app
#EXPOSE 8080
#EXPOSE 3000

FROM node:latest
COPY . .
RUN npm install
RUN npm run heroku-postbuild
RUN npm install -g serve
CMD serve -s build
EXPOSE 3000
EXPOSE 5000