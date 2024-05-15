FROM node:18-alpine

WORKDIR /todo-list/

COPY public/ /todo-list/public
COPY src/ /todo-list/src
COPY package.json /todo-list/
COPY tsconfig.json /todo-list/

RUN npm install
EXPOSE 3000
CMD ["npm", "start"]