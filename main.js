fetch('Media-assets/dataset.json')
    .then(response => response.json())
    .then(data => {
        setupShop(data);
    })
    .catch(error => console.error('Error loading dataset:', error));

let selectedProduct, selectedSymbol, selectedColor;
let totalPrice = 0;
let colorPriceAdded = false;

function setupShop(data) {
    const productTypesDiv = document.getElementById('product-types');
    data.products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `<img src="Media-assets/products/${product.name}.png" alt="${product.name}" data-price="${product.price}" data-id="${product.id}" class="product-item">`;
        productDiv.addEventListener('click', () => selectProduct(product));
        productTypesDiv.appendChild(productDiv);
    });

    const symbolsDiv = document.getElementById('symbols');
    data.symbols.forEach(symbol => {
        const symbolDiv = document.createElement('div');
        symbolDiv.innerHTML = `<img src="Media-assets/symbols/symbol-${symbol.name}.png" alt="${symbol.name}" data-id="${symbol.id}" class="symbol-item">`;
        symbolDiv.addEventListener('click', () => selectSymbol(symbol));
        symbolsDiv.appendChild(symbolDiv);
    });

    const colorsDiv = document.getElementById('colors');
    data.colours.forEach(color => {
        const colorDiv = document.createElement('div');
        colorDiv.innerHTML = `<div style="background-color:${color.name}; width: 50px; height: 50px;" data-price="${color.price_add}" data-id="${color.id}" class="color-item"></div>`;
        colorDiv.addEventListener('click', () => selectColor(color));
        colorsDiv.appendChild(colorDiv);
    });
}


function selectProduct(product) {
    selectedProduct = product;
    totalPrice = product.price;
    colorPriceAdded = false;
    

    const productImage = document.getElementById('selected-product-image');
    productImage.src = `Media-assets/products/${product.name}-default.png`; 
    
    document.getElementById('customization').style.display = 'block'; 
    document.getElementById('product-selection').style.display = 'none'; 
    
    updateProductPreview();
    updatePrice();
}


function selectSymbol(symbol) {
    selectedSymbol = symbol;
    updateProductPreview();
}


function selectColor(color) {
    if (!selectedColor) { 
        selectedColor = color;
        totalPrice += color.price_add; 
        colorPriceAdded = true;
    } else if (selectedColor && color !== selectedColor) {
        totalPrice -= selectedColor.price_add;
        selectedColor = color;
        totalPrice += color.price_add; 
    }
    
    updateProductPreview();
    updatePrice();
}


function updatePrice() {
    const priceElement = document.getElementById('total-price');
    priceElement.innerText = `€${totalPrice.toFixed(2)}`;
}


function updateProductPreview() {
    if (selectedProduct) {
        const productImage = document.getElementById('selected-product-image');
        productImage.src = `Media-assets/products/${selectedProduct.name}-${selectedColor ? selectedColor.name : 'default'}.png`; 

        const symbolImage = document.getElementById('selected-symbol-image');
        if (selectedSymbol) {
            symbolImage.src = `Media-assets/symbols/symbol-${selectedSymbol.name}.png`; 
            symbolImage.style.display = 'block'; 
        } else {
            symbolImage.style.display = 'none'; 
        }
    }
}


