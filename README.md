# Triggerise Website

This repository hosts the contents of the triggerise.org website.

## Local development setup

To run this website locally it requires ruby and jekyll to be installed. To install a recent version of ruby on macOS you should use [brew](https://brew.sh/) and follow the instalation steps described there.

After installing brew you can then install the latest version of ruby using `brew install ruby`.

After ruby is installed, open a new terminal window in this repository directory and run `bundle install` to install `jekyll` and the other dependencies of this project.

## Development

To develop locally you can then run `bundle exec jekyll serve` to serve this project on `localhost:4000`. Hot reloading of code should be enabled by default.

## Branches

The `develop` branch is used as a staging environment which allows us to preview changes via siteleaf.

The `master` branch is the actual branch that is hosting the content.
