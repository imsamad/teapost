FROM node:alpine
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci 
COPY . .
RUN npm run build && rm -rf src && rm -rf node_modules && rm -rf tsconfig.json && npm ci --omit=dev
CMD npm start