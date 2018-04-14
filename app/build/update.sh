read -p "Are you sure ?" -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]];then
  cd ..
  br=`git branch | grep "*"`
  if [ "master"==${br/* /} ];then
    git status
    git add .
    git commit -m ":memo: update blog site"
    git pull origin master
    if [ 0==$? ];then
      node ./app/build/build.js
      git push origin master
      cd app
      echo -e "\033[42;37m update successful \033[0m"
    else
      echo "resolve git conflict"
    fi
  else
    echo "please exec git checkout master"
  fi
else
  echo "cancel update"
fi
