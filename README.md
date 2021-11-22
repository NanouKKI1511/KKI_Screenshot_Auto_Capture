# KKI Markets Screenshot Auto Capture
QA automation script for capturing screenshot of actual prod KKI Urls (via Percy) for respective Markets. Ease process of comparing pages before and after production clean up. 

## Idea
- Screenshots of URLs is captured for each market before prod clean up and set baseline
- Once prod cleaned up, capture another set of screenshot 
- Then QA will manually verify screenshot difference between the original/new prod and determine if an actual defect

## Built with
- Cypress 
- Percy

## Getting started
- Clone the repository and install dependencies: npm i

## Running tests
### Initial Run (before prod clean up)
1. Define the Market details, credentials and list of URLs in the KKI.Json file (for now only en-gb URLs have been added)
2. Edit the KKI.js script to specific the market being tested
3. Ensure project is set up on Percy and full access token received
- Go to Percy Project
- Select Project settings tab menu and choose "Full-access"
- Copy token
4. Open cmd in cloned repo directory and run the following to run script
- Set PERCY_TOKEN=TokenID [Enter]
- npx percy exec -- cypress run --spec 'cypress/integration/KKI.spec.js' [Enter]
5. The js script run the specified market:
- Screenshot will be taken for each URL via Percy
- A backup screenshot is also taken by cypress and saved in the screenshot folder
6. Once run completed, Go to Percy build and wait for all the screenshots to load and verify if all has been captured successfully
7. Mark build as approved

### Second Run (after prod clean up)
1. Repeat steps 1 to 6 as above
2. Notice this time that Percy highlights any difference between the initial and second capture.
3. If second run screenshot is the correct one then approve and set it as baseline and raise defect if required

## Additional
1. If not sure about screenshot or Percy not displaying correctly, go to screenshot folder for a backup shot capture by cypress.
