module.exports = (temp,products)=>{
    let output = temp.replace(/{%IMAGE}/g,products.image);
    output = output.replace(/{%PRODUCT_NAME}/g,products.productName);
    output = output.replace(/{%QUANTITY}/g,products.quantity);
    output = output.replace(/{%PRICE}/g,products.price);
    output = output.replace(/{%FROM}/g,products.from);
    output = output.replace(/{%NUTRIENTS}/g,products.nutrients);
    output = output.replace(/{%DESC}/g,products.description);
    output = output.replace(/{%id}/g,products.id);

    if(!products.organic)output = output.replace(/{%NOT_ORGANIC}/g,'not-organic');
    return output;
}