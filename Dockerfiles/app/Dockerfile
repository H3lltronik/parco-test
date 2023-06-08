FROM node:latest

RUN userdel -r node

ARG USER_ID

ARG GROUP_ID

RUN addgroup --gid $GROUP_ID h3lltronik

RUN adduser --disabled-password --gecos '' --uid $USER_ID --gid $GROUP_ID h3lltronik

USER h3lltronik

WORKDIR /app

# Copying ../../package*.json ./ as h3lltronik
COPY --chown=h3lltronik:h3lltronik ../../package*.json ./

RUN npm install

RUN chown -R h3lltronik:h3lltronik /app

USER h3lltronik

CMD [ "npm", "run", "start:dev" ]