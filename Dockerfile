FROM node:14.21

WORKDIR /app

COPY . .

ENV TS_NODE_DEV=false

RUN npm install

RUN npm run build

EXPOSE 3333

CMD ["node", "dist/core/server.js"]