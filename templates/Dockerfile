FROM elephantseed/whalephant-seed-base:latest

ARG JSPM_GITHUB_AUTH_TOKEN

ENV USER="<%= userName %>"
ENV HOME=/home/$USER
ENV LOOK_UP_TIME=480
ENV NODE_MODULES=/usr/local/lib/node_modules/
ENV BIN=/usr/local/bin
ENV JSPM=node_modules/.bin/jspm
ENV APP=$HOME/app/

LABEL vendor=<%= userName %>\
      com.<%= appName %>-base.version=<%= appVersion %> \
      com.<%= appName %>-base.release-date="2017-03-25"

USER root
COPY app/package.json app/yarn.lock app/config.js $APP
RUN chown -R $USER:$USER app/ bin/ server/

USER $USER
WORKDIR $HOME

RUN cd app &&\
    yarn &&\
    $JSPM config registries.github.timeouts.lookup $LOOK_UP_TIME &&\
    $JSPM config registries.github.auth $JSPM_GITHUB_AUTH_TOKEN &&\
    $JSPM i --lock

CMD ["npm", "start"]