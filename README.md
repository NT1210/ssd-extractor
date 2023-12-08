# ssd-extractor
Electron.js + React.js Desktop application made for the improvement of work efficiency, targeting Russian seafood production. 

## Folder structures
All the codes for extraction logic are stored in `/electron` folder and React related codes are stored in `/src` and `/public` folders.

![image](https://github.com/NT1210/ssd-extractor/assets/147454467/de228a5b-aaaf-4abb-93ac-cab86c2b6e65)

## Notes
- When using RCA, main.js is by default specified as `public/electron.js`. Be sure not to forget adding `extends: null` and `extraMetadata` set to `"main: electron/main.js` in `package.json` file.
- This app is for a personal use. You need designated excel files for the program to be properly executed.

