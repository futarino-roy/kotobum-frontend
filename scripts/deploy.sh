#!/bin/sh
# $1 にブランチ名を渡す

set -e

if [ "$1" = "" ]
then
    echo "Please set branch name"
    exit 2
fi
echo "Deployment started ...[branch is $1]"

# 本番環境Xサーバー(mainブランチ)
# if [ "$1" = "main" ]
# then
#     cd /var/www/vhosts/official_front/public/torisetsu
# fi

# 開発環境Xサーバー(releaseブランチ)
if [ "$1" = "release" ]
then
    cd /var/www/vhosts/kotobum-frontend
fi

# username="deploy.sh ($1/`hostname -s`)"

# Enter maintenance mode or return true
# if already is in maintenance mode
# (php artisan down) || true

# Pull the latest version of the app
if ! (sudo git stash; sudo git fetch origin $1; sudo git checkout $1; sudo git reset --hard origin/$1)
then
    echo "git pull failed"
    exit 1
fi

set +e

echo "Deployment finished!"