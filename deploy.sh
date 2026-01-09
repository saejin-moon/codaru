#!/bin/bash

PI_USER="wada"
PI_HOST="pecan"
PI_DIR="/home/wada"

echo "[1/5] building frontend with bun"
cd ts
bun run build
cd ..

echo "[2/5] cleaning and moving assets"
rm -rf go/cmd/api/web
cp -r ts/dist go/cmd/api/web 

echo "[3/5] creating go binary"
cd go
go mod tidy
env GOOS=linux GOARCH=arm64 go build -o ./pi cmd/api/main.go

echo "[4/5] Shipping to Raspberry Pi..."
# Copy Binary and .env
scp cmd/api/pi $PI_USER@$PI_HOST:~/
scp .env $PI_USER@$PI_HOST:~/

echo "[5/5] restarting service on pi"
ssh $PI_USER@$PI_HOST "sudo systemctl restart codaru"

echo "✅ Deployed Successfully!"