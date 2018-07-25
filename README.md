# simple-express-server
This repository has the objectives to demonstrate how a continuous-delivery-pipeline can look like and to provide hands-on-experience
with deployments in OpenShift.
Each push to the master branch will end up in a deployment.

## Build Process
Pushing any branch to this repository will trigger a CI Build. This project uses [travis-ci](https://travis-ci.org/SeWaS/simple-express-server/) for that.
The entire CI config and instructions how to build the app can be found in the [.travis.yml](https://github.com/SeWaS/simple-express-server/blob/master/.travis.yml) file in the root directory:
```yaml
language: node_js
node_js:
  - "8"

after_success:
  - docker login $REGISTRY_URL -u $REGISTRY_USER -p $REGISTRY_PASS

  - export APP=sewas/simple-express-server
  - export TAG=`if [ "$TRAVIS_BRANCH" == "master" ]; then echo "latest"; else echo $TRAVIS_BRANCH ; fi`

  - docker build -t $REGISTRY_URL/$APP:$TAG .
  - docker push $REGISTRY_URL/$APP:$TAG
```
As we see, each successful application build is containerized with docker and pushed to the OpenShift registry (provided as env var `$REGISTRY_URL` in travis-ci).
Builds from `master`branch are tagged with `:latest`, builds from other branches are tagged with the branch name (`$TRAVIS_BRANCH`).

## Deployment Process
Each push to the OpenShift registry will be recognized immediately by the OpenShift plattform and can trigger something. In this example an ImageStream
is configured to listen only to the `:latest` tag. If that image changes, a deployment will be triggered.

It is perfectly fine to deploy every other successfully pushed container, as well. Due to the constraints in terms of using the Free-Starter-Plan
it is often just not possible to use the resources to run multiple services and pods in parallel.
