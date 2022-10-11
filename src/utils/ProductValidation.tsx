/**
 * @brief This function validates the passed in name, throws an exception if its invalid that can be handled to display relevant messages to client.
 * @param name - The name of the product
 * @returns - Valid || Error
 */
const productName = (name: String) => {
    if(name.length > 0) {
        return true;
    }
    else{
        throw new Error("Product name cannot be empty");
    }
};

/**
 * @brief This function validates the passed in category, throws an exception if its invalid that can be handled to display relevant messages to client.
 * @param category - The category of the product
 * @returns - Valid || Error
 */
const productCategory = (category: Number) => {
    if(category <= 0) {
        throw new Error("Please select a category");
    }
    else if(category > 4){
        throw new Error("Product category does not exist");
    }
    else{
        return true;
    }
}

/**
 * @brief This function validates the passed in price, throws an exception if its invalid that can be handled to display relevant messages to client.
 * @param price - The price of the product
 * @returns - Valid || Error
 */
const productPrice = (price: Number) => {
    if(price > 0) {
        return true;
    }
    else{
        throw new Error("Product price must be greater than 0");
    }
}

/**
 * Validation file, can easily expand and add more validation functions to use in the app
 */
const Validate = {
    productName,
    productCategory,
    productPrice
}

export default Validate;