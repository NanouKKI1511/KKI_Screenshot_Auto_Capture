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
![image](https://user-images.githubusercontent.com/94358192/142867360-31aa0459-82e6-46b4-b545-7f56436878ae.png)
3. Edit the KKI.js script to specific the market being tested
![image](https://user-images.githubusercontent.com/94358192/142867218-d3ddb9ed-77e3-4d2e-8070-27841571bed2.png)
4. Ensure project is set up on Percy and full access token received
- Go to Percy Project
- Select Project settings tab menu and choose "Full-access"
- Copy token
![image](https://user-images.githubusercontent.com/94358192/142866211-af9e1265-e7df-44d9-854c-6b545a54b8b6.png)
4. Open cmd in cloned repo directory and run the following to run script
- Set PERCY_TOKEN=TokenID [Enter]
- npx percy exec -- cypress run --spec 'cypress/integration/KKI.spec.js' [Enter]
![image](https://user-images.githubusercontent.com/94358192/142866891-0b5b6985-9c1a-4d7e-8628-b94219640631.png)
5. The js script run the specified market:
- Screenshot will be taken for each URL via Percy
- A backup screenshot is also taken by cypress and saved in the screenshot folder
6. Once run completed, Go to Percy build and wait for all the screenshots to load and verify if all has been captured successfully
7. Mark build as approved
![image](https://user-images.githubusercontent.com/94358192/142866388-23b10e58-5853-47bd-879e-704f8ec015ef.png)


### Second Run (after prod clean up)
1. Repeat steps 1 to 6 as above
2. Notice this time that Percy highlights any difference between the initial and second capture.
3. If the second run screenshot is the correct one then approve and set it as baseline and raise defect if required


## Additional
1. If not sure about screenshot or Percy not displaying correctly, go to screenshot folder for a backup shot capture by cypress.


## Limitations of Percy
1. Percy has a limit of 5000 snapshots per month, if runny multiple markets in a month, most probably a new Percy account will need to be set up
2. Percy take several snapshots of a page to make one whole screenshot resulting in distorted page. In that case, refer to screenshots in Cypress folder
