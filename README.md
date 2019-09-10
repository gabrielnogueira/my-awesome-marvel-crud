# My Awesome Marvel Crud!

This is a practical activity proposed by [Softplan](https://www.softplan.com.br) as a challenge in their selection process.

The challenge is create an app that is possible to list marvel characters consumed from marvel api, showing image and name of each characters. User Has to be possible to search for a character. User also can see details of a character by clicking on his image/name, like character description or series. User has to be able to edit the character information and save.

The tech stack premisses of this challenge are:

  * Must use create-react-app;
  * Must use redux;
  * Must use react-router;
  * Use our favorit test lib;

## How this works?
### App usage
1. When open the app, it will list the first 20 characters of marvel api;
2. The characters are show in a masonry list, with infinite scroll. Scroll down to load more characters;
3. You can use the search field on top-right to search a determine characters (min of 3 char to start searching);
4. Click on character card to see details, like description and series;
5. The first 10 series will be loaded with the character content. They will bey show in a masonry list, with infinite scroll. Scroll down to load more series. 
6. Click on edit button to change character information. Click on save to confirm the edit.

### Some libraries used
1. @material-ui to style;
2. redux-thunk to side effects;
3. react-content-loader to skeleton loading;
3. redux-form to form edit;
5. https://w3bits.com/labs/css-masonry/ to style masonry list.

### Simplified technical pipeline flow
1. When app starts, it is shown a skeleton loading while is fetched the first 20 characters in marvel api using axios lib;
2. When the api returns, it is shown the characteres using css-masonry style, as mentioned above;
3. When user search for a character, skeleton loading is shown while marvel api is fetched with custom parameters.
4. When user click on a character, the character data is loaded on details screen, and the series of this characters is fetched on marvel api. While the series are fetched, and skeleton loading is displayed.
5. When user click on edit, the inputs are enabled to edit data. If user cancel the edit, the redux-form is reinitialized with the original values. If user save the edit, new data are saved on state.

## TODO list
### Required
- [x] SetUp the tech stack;
- [x] Connect with the marvel API;
- [x] Stylize Master screen;
- [x] Stylize Details screen;
- [x] Edit data on Details screen;
- [x] Save state to localStorage;
- [ ] Test Cover 100%;

### Other Tasks
- [ ] Create a zero to final guide of this project;
- [ ] Add proptypes to components
- [ ] Add Flow type checker;
- [ ] Use suspense and lazy to better code split and error handling
- [ ] Improve tests and code coverage


## Getting Started with this project
  Clone this repo and install dependencies:

```bash
$ git clone https://github.com/gabrielnogueira/my-awesome-marvel-crud.git
$ cd my-awesome-marvel-crud
$ yarn
```
  Create on app root a file named <strong><em>.env.development</em></strong> with your marvel api keys:
  
  ```bash
  REACT_APP_API_PUBLIC_KEY=MY_PUBLIC_KEY
  REACT_APP_API_PRIVATE_KEY=MY_PRIVATE_KEY
```

  Run the app:
  
  ```bash
  $ yarn start
  ```
  
  and enjoy!
