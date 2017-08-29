# EPHIMERALD

## What for?
With Ephimeral you can run every project you want Git/Bitbucked, on any Os you
want using docker containers installing any NodeJS version you want, and get
the final compiled project in your host machine folder ready to use.

It's a Phoenix Idempotent ephimeral server for NodeJS Based projects.

## Where to use it
On Debian based distributions, (for a Mac compatible version, PR's welcome)

Ephimeral build process:

    1)Checkout https://github.com/sloppylopez/phoenix-server

    2)cd phoenixserver

    3)usage: sudo sh init.sh <GIT_USER> <GIT_PROJECT_NAME> <TARGET_EXEC> <DOCKER_CONTAINER_BASE_IMAGE> <TIMEOUT_FOR_BUILD>
      examples: 
        sudo sh init.sh sloppylopez nodeapi server.js phusion/baseimage:0.9.16 stash 0.12.2 30m
        sudo sh init.sh sloppylopez nodeapi server.js phusion/baseimage:0.9.16 git 0.12.2 30m


    INFO:init.sh will execute build.sh and when finished, init will execute run
    
## Common Pitfalls
Ensure to use it on a new empty folder for security reasons
    
## Credits    
Based on this brilliant idea:

http://ariya.ofilabs.com/2014/12/docker-and-phoenix-how-to-make-your-continuous-integration-more-awesome.html

![alt tag](https://s-media-cache-ak0.pinimg.com/736x/c3/4e/c1/c34ec1692829098ceb3299be43c28ed1.jpg)

