console.log("sortProducts.js ran");

let isSortingInitialized = false; // Flag to track if sorting is initialized
let hasSorted = false; // Flag to track if sorting has been done

function sortProducts() {
    if (hasSorted) {
        console.log("Sorting already done.");
        return;
    }

    console.log("Sorting products started");

    // Select all cmp-product-box elements
    const products = Array.from(document.querySelectorAll("cmp-product-box.product"));
    console.log(`Number of products found: ${products.length}`);

    if (products.length === 0) {
        console.log("No products found.");
        return;
    }

    // Function to extract the title text from a product
    const getTitleText = (product) => {
        const titleElement = product.querySelector(".product__title");
        return titleElement ? titleElement.textContent.trim().toLowerCase() : "";
    };

    const addCopyIdButton = (product) => {
        const productHeader = product.querySelector(".product__header");
        if (!productHeader.querySelector('.copyButton')) { // Ensure only one button is added
            const productInfo = product.querySelector(".product__info");
            const copyIdButton = document.createElement("button");
            copyIdButton.className = 'copyButton';
            copyIdButton.textContent = 'Copy ID'; // Added text for the button
            productHeader.insertBefore(copyIdButton, productInfo);
            console.log("Button added");
        }
    };

    // Sort products alphabetically by title
    products.sort((a, b) => {
        const titleA = getTitleText(a);
        const titleB = getTitleText(b);
        return titleA.localeCompare(titleB);
    });

    // Select the container where the products should be reordered
    const container = document.querySelector(".products-wrapper");

    // Reorder the products in the DOM
    products.forEach(product => container.appendChild(product));
    products.forEach(product => addCopyIdButton(product));

    var buttons = document.getElementsByClassName('copyButton');

    // Loop through the collection and add event listeners to each button
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function (event) {
            // Find the parent element of the button
            var parentElement = event.target.parentElement;

            // Search within the parent element for the element with the class "product__info-code"
            var productInfoCodeElement = event.target.closest('.product').querySelector('.product__info-code');

            // Check if the element exists
            if (productInfoCodeElement) {
                // Get the text content from the found element
                var textToCopy = productInfoCodeElement.textContent;

                // Use the Clipboard API to copy the text
                navigator.clipboard.writeText(textToCopy)
                    .then(() => {
                        //alert('Text copied to clipboard!');
                    })
                    .catch(error => {
                        console.error('Failed to copy text: ', error);
                    });
            } else {
                console.log('Element with class "product__info-code" not found.');
            }
        });
    }

    hasSorted = true; // Mark as sorted
    console.log("Products sorted alphabetically by title.");
}

function initializeObserver() {
    if (isSortingInitialized) return;
    isSortingInitialized = true;

    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                debounceSortProducts(); // Use debounced sorting
            }
        }
    });

    // Observe changes in the body and subtree
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial run to sort products when the script first runs
    sortProducts();
}

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

const debounceSortProducts = debounce(sortProducts, 1000); // Adjust delay as needed

// Reset sorting initialization flag on page load or refresh
window.addEventListener('load', () => {
    hasSorted = false; // Allow sorting to occur on page load
    initializeObserver();
});
