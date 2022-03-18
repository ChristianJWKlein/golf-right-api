# Backend for GolfRight

## Some Notes

Initial Database Name: golf-right-1 ( Firestore Firebase )

Location: us-east4

## Run Locally

    npm start
    or
    node .

### Packages installed:

    git init
    npm init -y
    npm i express cors firebase-admin

### run locally

    nodemon ./src

### Deploy on Google Cloud

    1. Set up billing for specified project
    2. add the app.yaml file into project
    3. gcloud config set project project-name-gcloud
    4. gcloud app deploy

### To re-deploy

    1. gcloud app deploy

### Find url

    1. gcloud app browse
    https://golf-right-1.uk.r.appspot.com/courses

### Testing with jest

install...

    npm i jest
    npm i supertest

to run test.. npm jest

###
