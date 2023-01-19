#bin/bash

dist=./dist/
name=Hello
ssh=root@192.168.10.106
targetSpace=/home/zephyru/workspace/space/
# 基本参数

tar -cvf ./$name.tar $dist/* && 
expect -c "spawn ssh ${ssh}; 
                    expect \"#\"; 
                        send \"cd ${targetSpace} \r\";
                    expect \"#\";
                        send \"rm ./${name} ./${name}.tar -rf \r\"; 
                    expect \"#\";
                        send \"exit \r\";
                    expect eof;
                    interact"&&
scp ./$name.tar $ssh:$targetSpace$name.tar &&
expect -c "spawn ssh ${ssh}; 
                    expect \"#\"; 
                        send \"cd ${targetSpace} \r\";
                    expect \"#\";
                        send \"tar -xvf ./${name}.tar \r\"
                    interact"
                    # expect \"#\";
                    #     send \"pm2 restart ${name} \r\"
                    # expect \"#\";
                    #     send \"pm2 log ${name} \r\";
           



              

