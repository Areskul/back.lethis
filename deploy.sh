#!/usr/bin/sh
ssh linode-arch << EOF
cd Sites/Perso/POC/back.poc;
git pull --rebase;
EOF
