# simple_short_URL_hosting
非常簡易的短網址伺服器，透過連結來新增短網址。

這是中文說明文件，[English README](README.md)


## 開啟服務
此專案是使用node.js開發，建議使用pm2來執行此專案，安裝pm2後你可以透過下面的指令啟動服務
``` bash
pm2 start ./src/index.js --name "short_url"
```
[安裝pm2](https://pm2.keymetrics.io/)

## 新增短網址
開啟服務後使用瀏覽器GET以下網址，新增短網址
``` http
http://[Your host]:[Your port]/setURL?surl=[name]&transport=[url]
```
例如我要新增一個短網址，短網址名稱為`test`，短網址連結為`https://www.google.com.tw/`，那我可以藉由GET以下網址來新增短網址
``` http
http://localhost:3000/setURL?surl=test&transport=https://www.google.com.tw/
```

## 使用短網址
新增短網址後，你可以透過以下網址來使用短網址。
``` http
http://[Your host]:[Your port]/[name]
```
例如剛剛新增的短網址名稱為`test`，那我可以藉由GET以下網址來使用短網址。
``` http
http://localhost:3000/test
```

