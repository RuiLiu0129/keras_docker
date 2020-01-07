# keras_docker
Dockerize a keras model

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
