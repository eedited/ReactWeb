#builder
FROM node:14.16.1 as Builder

RUN mkdir -p /eedited
WORKDIR /eedited
ADD . /eedited
RUN npm install

EXPOSE 80
RUN npm run build


#production
FROM nginx
RUN mkdir /app
WORKDIR /app
RUN mkdir ./build
COPY --from=Builder /eedited/build ./build/
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
