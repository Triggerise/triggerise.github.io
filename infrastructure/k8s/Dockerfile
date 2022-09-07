FROM --platform=amd64 jekyll/jekyll:4.1.0 as build

USER jekyll

COPY . .

RUN touch Gemfile.lock && chmod a+w Gemfile.lock

USER root

RUN bundle install

USER jekyll

RUN jekyll build

FROM nginx:latest

WORKDIR /usr/share/nginx/html

COPY --from=build /srv/jekyll/_site .
