FROM node:16
MAINTAINER startPendulum
WORKDIR /takePhoto
ADD . /takePhoto
RUN npm install --registry=https://registry.npm.taobao.org
RUN pip install -i https://pypi.tuna.tsinghua.edu.cn/simple remove-bg
RUN pip install -i https://pypi.tuna.tsinghua.edu.cn/simple pillow



CMD npm run start