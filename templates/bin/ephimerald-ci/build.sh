#!/usr/bin/env bash
#this is for exiting the sh when a non-zero code is returned by any operation
set -e

#SOURCE_PATH=/source/$GIT_PROJECT_NAME
#BUILD_PATH=$HOME/build
#DESTINATION=node_modules #in case of a java project this would be the war file
#NODE_VERSION=0.12.2
#NVM_DIR=/usr/local/nvm

#echo "BUILD_PATH " $BUILD_PATH
echo "Current path :" && pwd
echo "Containing "
ls -thrall

#echo "Recreating build directory $BUILD_PATH"
#rm -rf $BUILD_PATH && mkdir -p $BUILD_PATH
#echo "Transferring the source: $SOURCE_PATH/$GIT_PROJECT_NAME -> $BUILD_PATH"
#cd $BUILD_PATH && cp -rp $SOURCE_PATH . && cd $GIT_PROJECT_NAME

#put your build instructions here...
echo "♠ Building... This may take several minutes"

# Install nvm with node and npm (we need to run all the commands together cos every RUN it's a different container)
#RUN yum -y --skip-broken install make automake gcc gcc-c++ kernel-devel bzip2 \
#    && curl --silent --location https://rpm.nodesource.com/setup_4.x | bash - \
#    && yum -y install nodejs \
#    && curl https://raw.githubusercontent.com/creationix/nvm/v0.20.0/install.sh | bash \
#    && source $NVM_DIR/nvm.sh \
#    && nvm install $NODE_VERSION \
#    && nvm alias default $NODE_VERSION \
#    && history -c
#nvm use $NODE_VERSION
echo "########################################################################"
echo "Using NodeJS version : " && node -v
echo "########################################################################"

npm run init

#consider running tests here
echo "Build finished"
#end put your build instructions here...

echo "Transferring build artifact..."
#echo $DESTINATION $SOURCE_PATH/$DESTINATION
#cp -r . $SOURCE_PATH/$DESTINATION

echo "All build tasks completed successfully!"