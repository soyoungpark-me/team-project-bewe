FROM node:carbon

# 앱 폴더 생성
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# 앱 의존성 설치
COPY package*.json /usr/src/app/
RUN npm install

# 앱 소스 추가
COPY . /usr/src/app

# 포트 설정
EXPOSE 9000

# run 커맨드 설정
CMD ["npm", "start"]
