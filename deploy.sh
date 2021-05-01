#!/usr/bin/sh
ssh linode << EOF
cd Sites/Clients/Lethis/back.lethis;
git pull --rebase;
EOF
