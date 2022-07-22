#!/bin/sh
until docker ps; do sleep 3; done;
docker buildx build . \
--tag 387002922338.dkr.ecr.eu-west-1.amazonaws.com/tiko/triggerise-org:{{workflow.parameters.git_commit}} \
-f infrastructure/k8s/Dockerfile \
--push
