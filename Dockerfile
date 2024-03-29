FROM node:lts as setup
WORKDIR /usr/dev
COPY . .
RUN yarn install

FROM setup as analyze
RUN yarn lint

FROM setup as check
RUN yarn check

FROM setup as test
RUN yarn test

FROM setup as build
RUN yarn build

FROM build as release
USER root
RUN git config --global credential.helper store && \
    git config --global user.name "Circle CI" && \
    git config --global user.email "circle-ci@zthunworks.com" && \
    git remote set-url origin https://github.com/zthun/spellcraft
RUN --mount=type=secret,id=GIT_CREDENTIALS,dst=/root/.git-credentials npx lerna version --conventional-commits --yes --no-push -m "chore: version [skip ci]" && \
    yarn install && \
    git add . && \
    git commit --allow-empty -m "chore: update yarn lockfile [skip ci]" && \
    git push && \
    git push --tags
RUN --mount=type=secret,id=NPM_CREDENTIALS,dst=/root/.npmrc npx lerna publish from-package --yes

FROM node:lts-alpine as spellcraft-docs-install
RUN npm install -g @zthun/spellcraft-docs

FROM nginx:stable-alpine as spellcraft-docs
COPY --from=spellcraft-docs-install /usr/local/lib/node_modules/@zthun/spellcraft-docs/dist/. /usr/share/nginx/html/

FROM node:lts-alpine as spellcraft-web-install
RUN npm install -g @zthun/spellcraft-web

FROM nginx:stable-alpine as spellcraft-web
COPY --from=spellcraft-web-install /usr/local/lib/node_modules/@zthun/spellcraft-web/dist/. /usr/share/nginx/html/


