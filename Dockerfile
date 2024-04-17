FROM node:20.11.1-alpine

LABEL Name="Icon-Memory"
LABEL Version="1.0.0"

ADD .output /webapp/.output

EXPOSE 3000

WORKDIR /webapp/.output

ENV NUXT_HOST=0.0.0.0
ENV PORT=3000

CMD ["node", "/webapp/.output/server/index.mjs"]
