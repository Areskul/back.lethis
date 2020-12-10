#!/usr/bin/sh
ssh linode-arch << EOF
cd Sites/Perso/POC/back.poc.com;
git pull --rebase;
EOF
