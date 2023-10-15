FROM node:13.1.0-alpine as build

WORKDIR /usr/app
ENV PATH /usr/app/node_modules/.bin:$PATH
COPY package.json /usr/app/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
COPY . /usr/app
RUN npm run build

FROM nginx:1.17.5-alpine
COPY --from=build /usr/app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80