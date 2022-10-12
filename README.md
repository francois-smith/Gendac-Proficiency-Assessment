<h2 align="center">Francois Smith</h3>
<h3 align="center">Proficiency Assessment | Gendac</h3>

<div align="center">
    <p>
        Proficiency assessment for my application to join Gendac for a position to participate in part time vacation work.
    </p>
</div>
<br/>

## About The Project

The application is set up using a react typescript with the styling done with bootstrap and Sass. The application allows an easy to use interface to communicate with an API to perform CRUD operations.


## Built With

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) <br/>
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)<br/>
![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white) <br/>
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)


## Getting Started
### Prerequisites

Make sure you have the latest LTS version of node installed. You can download it from [here](https://nodejs.org/en/)
* Validate that you have node installed by running the following command in your terminal
  ```sh
    node -v
    ```

### Installation
1. Naviagte to the folder containing the project files
2. Install NPM package dependencies
   ```sh
   npm install
   ```
3. Start a development server using
   ```sh
   npm run start
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


## Usage
### Layout
I opted for a table layout because it makes the most sense in terms of a products API, the dasboard follows the same colour scheme as gendac to make it feel like the Dashboard was develeped specifically for them.

The top right of the dashboard contains the main controls for the table with a custom settings menu that can be used to modify the table row amount and to apply basic filters. There is also a pagignation control at the bottom of the table to traverse the product list.

Unit tests can be done by running the following command in the root directory
```sh
npm run test
```

The dashboard contains toast messages relaying information to the user such as errors and when the table is altered. The modal is has multiple uses where it updates it internal layout and state depending if you want to create or edit an event.

<br/>

## Project Structure

### Root:

    .
    ├── public                  # Contains media and index.html
    ├── src                     # Source files 
    ├── jest.config.js          # Adds base config for Jest testing
    ├── package.json            # Contains dependencies and scripts
    ├── tsconfig.json           # Specifies the root files and the compiler options
    └── README.md

### Automated Tests:
    * Very basic testing done to showcase ability to do it, but time constraints forced me to keep it basic *
    .
    ├── ...
    ├── __tests__                       # Test files for the project
    │   ├──  CreateProduct.test.tsx     # Basic test to showcase products        
    └── ...

### Components:

    .
    ├── ...
    ├── components              # Contains main components for the app
    │   ├── Dashboard.tsx       # Main Component, manages state of the app
    │   ├── Table.tsx           # Renders a table of products, based on data from the dashboard
    │   ├── Product.tsx         # Renders a row in the table, representing a product
    │   ├── TablePagination.tsx # Component used to traverse the products
    └── ...

### Services:

    .
    ├── ...
    ├── services                # Contains api connections and requests
    │   ├── api-url.tsx         # Exports an axios call that can be used anywhere
    │   ├── api-requests.tsx    # Predefined methods to interact with the API more easily
    └── ...

### Utils:

    .
    ├── ...
    ├── utils                      # Contains methods commonly used within numerous components
    │   ├── CustomTypes.tsx        # Contains types and enums
    │   ├── ProductValidation.tsx  # Exports an interface to easily validate products
    │   ├── Toasts.tsx             # Exports methods to display different toasts to the user
    └── ...

### Views:

    .
    ├── ...
    ├── views                   # Contains components that are overlayed
    │   ├── ProductModal.tsx    # Renders a modal used to create and edit products
    │   ├── settingMenu.tsx     # Renders a popup that can alter the rendering of the table 
    └── ...


## Contact

Francois Smith - contact@francois-smith.com


<p align="right">(<a href="#readme-top">back to top</a>)</p>
