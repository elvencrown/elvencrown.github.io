@echo off
cd /d E:\KATYPERRY\Documents\Nick\Programming front-end\Projects\vue-elvencrown-marketplace\vue-elvencrown-marketplace

call start cmd /k json-server --watch db.json --port 3000 --host=192.168.3.140
timeout /t 5
call start cmd /k npm run dev -- --host=192.168.3.140
