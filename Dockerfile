FROM centos:7
MAINTAINER startPendulum
ADD ./env/Python-3.10.3.tar.xz  /usr/local/
ADD ./ /usr/local/app/
WORKDIR /usr/local/app/

RUN yum install -y tar vim libffi-devel zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gcc make initscripts \
    && yum -y install epel-release \
    && cd /usr/local//Python-3.10.3  \
    && ./configure prefix=/usr/local/python3 \
    && make \
    && make install \
    && rm -rf /usr/local/Python-3.10.3 \
    && yum install -y python-pip \
RUN mkdir /usr/bin/python27 \
    && mkdir /usr/bin/pip-python27 \
    && mv /usr/bin/python /usr/bin/python27 \
    && mv /usr/bin/pip /usr/bin/pip-python27 \
    && ln -s /usr/local/python3/bin/python3.10 /usr/bin/python \
    && ln -s /usr/local/python3/bin/pip3 /usr/bin/pip
RUN sed -i "s#/usr/bin/python#/usr/bin/python2#" /usr/bin/yum \
    && sed -i "s#/usr/bin/python#/usr/bin/python2#" /usr/libexec/urlgrabber-ext-down
RUN rm -rf /etc/localtime \
    && ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN pip install --upgrade pip -i http://pypi.douban.com/simple/ --trusted-host pypi.douban.com \
    && pip install removebg -i http://pypi.douban.com/simple/ --trusted-host pypi.douban.com \
    && pip install --upgrade Pillow -i http://pypi.douban.com/simple/ --trusted-host pypi.douban.com
RUN yum install -y nodejs \
    && yum install -y npm \
    && cd /usr/local/app \
    && npm config set registry https://registry.npm.taobao.org \
    && npm install
CMD npm run start