FROM node

RUN mkdir -p /home/bianjian

WORKDIR /home/bianjian

COPY . /home/bianjian

EXPOSE 3002

RUN yarn install && yarn build

CMD ["yarn","start"]
