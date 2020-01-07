# keras_docker
Dockerize a keras model

## Totural Link
### Part1: Build Web.py API
```
https://medium.com/@rl2987/%E5%A6%82%E4%BD%95%E7%94%A8web-py-docker%E6%9D%A5%E9%83%A8%E7%BD%B2keras%E6%A8%A1%E5%9E%8B-%E4%B8%80-dfc6dfd5f2e1?source=friends_link&sk=167e61bcaa9b967a85141e73ee1b26b7
```
### Part2: Dockerize the application
```
https://medium.com/@rl2987/%E5%A6%82%E4%BD%95%E7%94%A8web-py-docker%E6%9D%A5%E9%83%A8%E7%BD%B2keras%E6%A8%A1%E5%9E%8B-%E4%BA%8C-db172997ca4b?source=friends_link&sk=90be2e10dfaa13ffd8183454a27eca2f
```

## Local Run
```
python app.py
```
the server will run on 
http://0.0.0.0:8080

## build image
### 1、build docker
```
docker build -t keras-docker:1.0 .
```
注意最后的那个点是精髓

## 2、run image
```
docker run -p 8080:8080 keras-docker:1.0 /root/anaconda3/bin/python app.py
docker run -d -p 
```
