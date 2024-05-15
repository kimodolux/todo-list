FROM node:alpine

WORKDIR /todo-list/

COPY src/ /todo-list/src
COPY package.json /todo-list/
COPY tsconfig.json /todo-list/
COPY .env /todo-list/

RUN npm install
RUN npm install typescript -g
RUN tsc
EXPOSE 8000
CMD ["node", "./dist/index.js"]