
document.addEventListener('DOMContentLoaded', () =>{
    const productsContainer = document.querySelector('.list-items');
    const totalElement = document.querySelector('.total p');
    const subscription = document.querySelector('.subscription');
    const selectedElement = document.createElement('p');
    const checkoutForm = document.getElementById('form');
    const checkoutbtn = document.getElementById('checkoutbtn')
    selectedElement.id = 'selectedPackage';
    subscription.parentNode.insertBefore(selectedElement, subscription.nextSibling);

    let selectedPackage;

    checkoutForm.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log("Checkout Button Clicked");
        alert("Checkout Button Clicked");

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        const house = document.getElementById('house no.').value;
        console.log(name);
        console.log(email);
        console.log(address);
        console.log(house);
    })

    function calculateTotal(){
        const products = productsContainer.querySelectorAll('.product');
        let totalPrice = 0;
        if(products.length === 0){
            totalElement.textContent = "Total: $0.00";
            return;
        }
        products.forEach(product =>{
            const priceElement = product.querySelector('p:nth-child(3)');
            const quantityElement = product.querySelector('p:nth-child(4)');

            if(priceElement && quantityElement) {
                const price = parseFloat(priceElement.textContent.replace('$', ''));
                const quantity = parseInt(quantityElement.textContent.replace('x',""));
                if(!isNaN(price) && !isNaN(quantity)){
                    totalPrice += price *quantity;
                }
            }
        });
        if(selectedPackage){
            const priceMatch = selectedPackage.match(/\$([\d.]+)/);
            if(priceMatch && priceMatch[1]){
                const selectedPrice = parseFloat(priceMatch[1]);
                if(!isNaN(selectedPrice)){
                    totalPrice += selectedPrice;
                }
            }
        }
        totalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
    }
    productsContainer.addEventListener('click', (event) => {
        const target = event.target;

        if (target.tagName === 'P'){
            if(target.textContent === 'x'){
                const quantityElement = target.parentNode.querySelector('p:nth-child(4)');
                let quantity = parseInt(quantityElement.textContent.replace('x', ''));
                if(quantity > 1){
                    quantity--;
                    quantityElement.textContent = `x${quantity}`;
                    calculateTotal();
                }
                else{
                    target.parentNode.remove();
                    calculateTotal();
                }
            }else if(target.textContent.startsWith('x')){
                let quantity = parseInt(target.textContent.replace('x', ''));
                quantity++;
                target.textContent = `x${quantity}`;
                calculateTotal();
            }
        }
    });
    subscription.addEventListener('click', (event) => {
        if(event.target.tagName === 'P' && event.target !== selectedElement) {
             if(event.target.id === 'remove'){
                selectedPackage = '';
                selectedElement.textContent = '';
                calculateTotal();
             }
             else{
                selectedPackage = event.target.textContent;
                selectedElement.textContent = `Selected Package : ${selectedPackage}`
                calculateTotal();
             }
        }
    });
    calculateTotal();
});



