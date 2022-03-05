FROM node:alpine
WORKDIR /app
COPY package.json .
RUN npm i 
COPY . .
RUN npm run build && rm -rf src && rm -rf node_modules &&rm -rf tsconfig.json && npm i --only=production
CMD npm start