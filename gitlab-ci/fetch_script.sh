#!/bin/bash
# ==================GIT相关配置================
git config --global user.email "duanguang@hoolinks.cn"
git config --global user.name "duanguang"
git config --global push.default simple

WORKDIR_SCRIPT="/opt/gitlab-runner/data/legions-gitlab-ci"

git_url="git@gitlab.hoolinks.com:business-platform/legions-gitlab-ci-script.git"

PROJECT_CURR_PATH=$(pwd)

rm -rf $WORKDIR_SCRIPT

mkdir -p $WORKDIR_SCRIPT

cd $WORKDIR_SCRIPT

git clone --branch master $git_url 'sourcegit'

cd sourcegit

cp -r HoolinksPdaNative/gitlab-ci/* $PROJECT_CURR_PATH/gitlab-ci

cd $PROJECT_CURR_PATH