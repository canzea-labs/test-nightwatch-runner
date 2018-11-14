
docker run $MODE \
  -v `pwd`:/screenshots \
  -v `pwd`/app:/tests \
  -e ENV=local \
  -e APP_LOCAL_URLBASEPATH="https://canzea.com/" \
  tester

