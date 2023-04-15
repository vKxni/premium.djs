FROM node:16.9.0

WORKDIR /usr

COPY package.json ./

COPY tsconfig.json ./

COPY src ./src
COPY . .env

RUN ls -a

RUN npm install
RUN npm run build 

CMD ["npm", "run", "start"]