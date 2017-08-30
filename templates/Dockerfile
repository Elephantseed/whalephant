FROM elephantseed/whalephant-seed-base:latest

ARG JSPM_GITHUB_AUTH_TOKEN

ENV USER="<%= userName %>"
ENV ELEPHANT_SEED_USER="elephantseed"
ENV HOME=/home/$USER
ENV ELEPHANT_SEED_HOME=/home/$ELEPHANT_SEED_USER
ENV APP_NAME=<%= appName %>
ENV APP_VERSION=<%= appVersion %>
ENV LOOK_UP_TIME=480
ENV NODE_MODULES=/usr/local/lib/node_modules/
ENV JSPM=node_modules/.bin/jspm
ENV APP=$HOME/app
ENV BIN=$ELEPHANT_SEED_HOME/bin
ENV SERVER=$ELEPHANT_SEED_HOME/server

LABEL vendor=$USER\
      com.$APP_NAME-base.version=$APP_VERSION \
      com.$APP_NAME-base.release-date="2017-03-25"

USER root
RUN addgroup -S $USER && adduser -S -g $USER $USER
ADD app/ $APP
RUN chown -R $USER:$USER $APP $BIN $SERVER

USER $USER
WORKDIR $HOME

RUN cd app &&\
    yarn &&\
    $JSPM config registries.github.timeouts.lookup $LOOK_UP_TIME &&\
    $JSPM config registries.github.auth $JSPM_GITHUB_AUTH_TOKEN &&\
    $JSPM i --lock

CMD ["npm", "start"]