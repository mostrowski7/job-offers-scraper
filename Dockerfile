FROM node:bullseye-slim

WORKDIR /usr/src/api

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]