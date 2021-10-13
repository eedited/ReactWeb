#builder
FROM node:14.16.1 as Builder

ENV GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS=--max_old_space_size=8192

RUN mkdir -p /eedited
WORKDIR /eedited
ADD . /eedited
RUN npm install
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
