#!/usr/bin/sh
ssh linode-arch << EOF
cd Sites/Clients/Lethis/lethis.poc;
git pull --rebase;
EOF
