FROM node:16.17.1
FROM python:3.11.0
MAINTAINER startPendulum
RUN npm install --registry=https://registry.npm.taobao.org
RUN pip install -i https://pypi.tuna.tsinghua.edu.cn/simple remove-bg
RUN pip install -i https://pypi.tuna.tsinghua.edu.cn/simple pillow
ADD . /takePhoto
WORKDIR /app
EXPOSE 443

CMD npm run start