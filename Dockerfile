FROM ubuntu    
#选择系统


MAINTAINER rl2987@columbia.edu     
#维护人员的联系方式


LABEL version="2.0"


EXPOSE 8080
#web输出的端口


ENV LANG C.UTF-8
#给docker中文环境


RUN apt-get update
RUN apt-get install  libsm6 libxrender1 libxext-dev gcc -y
#更新ubuntu系统，下载相关的dependency


##下载Anaconda3 python 环境安装包 放置在程序目录 url地址https://repo.anaconda.com/archive/Anaconda3-2019.03-Linux-x86_64.sh


WORKDIR /keras-docker
#docker工作目录


ADD . /keras-docker
#将当前目录下的全部内容放入docker工作目录

]
RUN cd /keras-docker && sh -c '/bin/echo -e "\nyes\n\nyes" | sh Anaconda3-2019.03-Linux-x86_64.sh'
#安装anaconda


RUN echo -e "\ny" | /root/anaconda3/bin/conda install python=3.6.7
RUN echo -e "\ny" | /root/anaconda3/bin/conda install -c conda-forge scipy numpy==1.17.2 easydict cython h5py pandas requests beautifulsoup4
RUN echo -e "\ny" | /root/anaconda3/bin/conda install -c conda-forge scikit-learn cheroot mahotas joblib
RUN /root/anaconda3/bin/pip install tensorflow==1.13.2 keras==2.2.5 keras-retinanet
RUN /root/anaconda3/bin/pip install web.py==0.40.dev1 opencv-contrib-python==4.0.0.21 pillow==6.2.0
#下载python及需要的包


RUN rm Anaconda3-2019.03-Linux-x86_64.sh
#在docker中删除anaconda的安装文件