#!/usr/bin/sh
ssh linode-arch << EOF
cd Sites/Clients/Lethis/back.lethis;
git pull --rebase;
EOF
