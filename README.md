# Functional Requirements

### 1. Contents Filter

- **Pricing Option**
  - There are three options: Paid, Free, and View Only
  - The default state should be unchecked, and when all options are unchecked, all data (Content List) should be displayed.
  - Content List should be filtered based on the selected Pricing Option(s).
    - (e.g., If Paid is selected, only Paid content should be shown.)
  - Multiple Pricing Options can be selected at once.
- Clicking the Reset Button should restore the default state.
- The filter or search results should persist across page reloads, but avoid using browser storage for this.

### 2. Contents List

- Display each item’s photo, user name, title, and the Pricing Option (Free/View Only). For Paid items, the price should be shown.
- Apply a grid system that adjusts based on the device width:
  - Default: 4 columns
  - Below 1200px: 3 columns
  - Below 768px: 2 columns
  - Below 480px: 1 column
- Implement infinite scroll to load more items as the user scrolls (loading size can be determined as needed).

### 3. Keyword Search

- Filter the list based on a keyword search 
  - (e.g., searching "Anisha" should filter content that includes "Anisha" in the user name or title).
- If no keyword is entered, all items should be displayed.
- Keyword searches should be combinable with Pricing Option filters.
  - (e.g., searching for "Anisha" and selecting Paid should filter content that is both Paid and related to "Anisha.")
- As with filters, the search results should persist across page reloads without relying on browser storage.

---

# Optional Requirements

### 1. Test Code Writing

- Please include test code for your implementation.

### 2. TypeScript Application

- The project should be implemented using TypeScript.

### 3. Sorting Implementation

- Implement a sorting feature in a dropdown format with the following criteria:
  - Item Name (Default)
  - Higher Price
  - Lower Price
- Sort only according to the criteria above; no need to consider secondary sorting for items with the same value.

### 4. Pricing Slider Implementation

- Create a range slider with a minimum value of 0 and a maximum value of 999.
- The slider should be activated/deactivated based on whether the Paid option is selected or not.
- When the handle is dragged and dropped, the selected amount should be displayed on both sides of the slider, filtering items only within that price range.
- The handles should not overlap.

### 5. Skeleton UI for Infinite Scroll

- Implement a skeleton UI that corresponds to the infinite scroll of the content list.


# Non - Functional Requirements

- The project should be developed using React.js.
- Use a state management library (e.g., Redux, Recoil, etc.).
- You are free to use CSS-in-JS or a CSS pre-processor, and any test code
libraries of your choice.
- The project must be runnable in a local environment.
(e.g., npm run start should allow you to access the app on localhost:3000.)
- Use Git for version control.
- You must use the provided API (data).
- The implementation should resemble the given design as closely as possible.
- There are no restrictions on the packages you can use, but you must explain why
you chose each one.



# Approach / Design considerations

### Create vite + TypeScript
- for strong static typing
- Less buggy compared to JS
  
### Redux-toolkit (state management for apps that scales)
  
### Material UI 
- Inbuild support for CSS-in_JS using emotions
- Consistent, polished UI for Quick frontend engineering
- Has powerful, responsive grid layout component which is ideal for the given scenario


# Tasks Identified
- P1: Inititial project setup using vite + typescript, Material UI, Redux Toolkit 
- P1: Redux store setup
- P1: UI Components
      - Keyword search with debounced fetch
      - Content filter
      - Contents List, with lazy loading, infinite scroll, responsive based on device
- P1: URL Statemanagement for filters
- P1: Unit Tests
- P2: Sorting
- P2: Pricing slider filter


# Setup
    // Create react app using vite 
    npm create vite@latest

    // go to app dir and initialize git
    git init

    // Install matririal UI
    npm install @mui/material @emotion/react @emotion/styled

    // Redux toolkit
    npm install @reduxjs/toolkit react-redux

    // Redux types to support type script
    npm install --save-dev @types/react-redux

    // for using useSearchParams hook
    npm install react-router-dom

    // Install axios
    npm install axios 

    //Jest setup
    npm install --save-dev jest babel-jest @types/jest ts-jest jest-environment-jsdom

    npm install --save-dev @babel/preset-env @babel/preset-react @babel/preset-typescript

    npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event

    git add . 

    git commit -m "feat: create project"

    git remote add origin https://github.com/harini-aj/clo-set-connect.git

    git pull origin master --allow-unrelated-histories

    git push -u origin master

    


# Resources

API : [https://closet-recruiting-api.azurewebsites.net/api/data](https://closet-recruiting-api.azurewebsites.net/api/data)

## Sample Data
    [
      {
        "id": "content-001",
        "creator": "Adam",
        "title": "Yellow green coat",
        "pricingOption": 0,
        "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_1.jpeg",
        "price": 50
      },
      {
        "id": "content-002",
        "creator": "Benny",
        "title": "Brown Anorak",
        "pricingOption": 1,
        "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_2.png",
        "price": 30
      },
      {
        "id": "content-003",
        "creator": "Catlin",
        "title": "Block shape mini bag",
        "pricingOption": 2,
        "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_3.jpeg",
        "price": 15
      }
    ]

![image](https://github.com/user-attachments/assets/5b0aa461-6c8f-4cf7-b286-d36d0d2158fb)



# References

Vite setup:
(https://vite.dev/guide/)[https://vite.dev/guide/]

React API Documnetation:
[https://react.dev/reference/react](https://react.dev/reference/react)

TypeScript API Documentation:
[https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)

Material UI API Documentaton: 
[https://mui.com/material-ui/react-grid/](https://mui.com/material-ui/react-grid/)

Redux setup:
[https://react-redux.js.org/introduction/getting-started](https://react-redux.js.org/introduction/getting-started)

Jest Setup:
[https://jestjs.io/docs/getting-started](https://jestjs.io/docs/getting-started)

Infinite Scoll :
[https://dev.to/hey_yogini/infinite-scrolling-in-react-with-intersection-observer-22fh](https://dev.to/hey_yogini/infinite-scrolling-in-react-with-intersection-observer-22fh)




  
