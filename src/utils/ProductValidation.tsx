/**
 * Validation file, can easily expand and add more validation functions to use in the app
 */

const productName = (name: String) => {
    if(name.length > 0) {
        return true;
    }
    else{
        throw new Error("Product name cannot be empty");
    }
};

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

const productPrice = (price: Number) => {
    if(price > 0) {
        return true;
    }
    else{
        throw new Error("Product price must be greater than 0");
    }
}

const Validate = {
    productName,
    productCategory,
    productPrice
}

export default Validate;