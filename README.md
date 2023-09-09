# simple_short_URL_hosting
A very simple short URL server that allows you to create short URLs via links.

This is the English documentation, [中文說明文件](README_zh-tw.md)


## Starting the Service
This project is developed using node.js. It is recommended to use pm2 to run this project. After installing pm2, you can start the service with the following command:
```bash
pm2 start ./src/index.js --name "short_url"
```
[Install pm2](https://pm2.keymetrics.io/)

## Adding a Short URL
After starting the service, use your browser to GET the following URL to add a short URL:
```http
http://[Your host]:[Your port]/setURL?surl=[name]&transport=[url]
```
For example, if you want to add a short URL with the name `test` and the link `https://www.google.com.tw/`, you can add the short URL by using the following URL:
```http
http://localhost:3000/setURL?surl=test&transport=https://www.google.com.tw/
```

## Using a Short URL
After adding a short URL, you can use it by accessing the following URL:
```http
http://[Your host]:[Your port]/[name]
```
For example, if you created a short URL with the name `test`, you can use it by accessing the following URL:
```http
http://localhost:3000/test
```