# KKI Markets Screenshot Auto Capture
QA automation script for capturing screenshot of actual prod KKI Urls (via Percy) for respective Markets. Ease process of comparing pages before and after production clean up. 

## Idea
1. Market URLs are defined in the KKI.Json file (for now only en-gb URLs have been added)
2. The js script run the specified market:
- Screenshot will be taken for each URL via Percy
- A backup screenshot is also taken by cypress and saved in the screenshot folder

