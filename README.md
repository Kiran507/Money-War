# Money War 
The Money War App is a web application developed using NodeJS, Express JS, and MongoDB. It allows users to participate in auctions, add their products, and bid on items listed by others. 

## Features

1. **User Authentication**
   - Users can securely sign in and register.
   - Passwords are hashed using npm packages for security.

2. **Product Management**
   - Users can add, update, and delete their products.
   - Each product includes an image, necessary details, and descriptive tags.

3. **Bidding**
   - Owners can set a time limit for each product, after which bidding is disabled.
   - Owners can view details of all bidders for a specific product.

4. **Public Page**
   - A public page showcases all products with the highest bidder.
   - Users can search and filter products based on tags and product names.

5. **Profile Page**
   - Each user has a profile page displaying their products sorted by the highest bid.


7. **Sorting Options**
   - Multiple sorting options, such as alphabetical and by the highest bidder, are available for displaying posts.

## Setup and Getting Started
1. Download or clone this repo to your local system.
2. For this repo, you have to create your own `config.env` file or rename the `config.example` file to `config.env`, which is provided as an example for the contents to be filled in .env file.
3. After this, open the terminal and run the following command to download all the dependencies.
```
npm install
```
4. After downloading all the dependencies, run the following command in the terminal.
```
npm run dev
```
5. Now, navigate to http://localhost:4000