FROM node:14-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN npm install yarn
RUN yarn install
ADD . .
RUN yarn run build
RUN yarn prune --production
CMD ["node", "./dist/main.js"]