FROM node:lts-buster
WORKDIR /usr/src/app

COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
RUN apt-get update
RUN apt-get install -y chromium-browser
RUN npm ci
COPY . .
# Serve the app
CMD ["node", "index.js"]