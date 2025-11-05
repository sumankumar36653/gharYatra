document.addEventListener('DOMContentLoaded', function() {
    const taxToggle = document.getElementById('toggle-total-before-taxes');
    
    if (taxToggle) {
        // Get all listing prices
        const updatePrices = () => {
            const priceElements = document.querySelectorAll('.listing-card .fw-semibold');
            
            priceElements.forEach(element => {
                const priceText = element.textContent;
                const priceMatch = priceText.match(/₹([\d,]+)/);
                
                if (priceMatch) {
                    const basePrice = parseInt(priceMatch[1].replace(/,/g, ''));
                    
                    if (taxToggle.checked) {
                        // Show price with GST
                        let gstRate;
                        if (basePrice <= 7500) {
                            gstRate = 0.05; // 5% GST for rooms ≤ ₹7,500
                        } else {
                            gstRate = 0.18; // 18% GST for rooms > ₹7,500
                        }
                        
                        const gstAmount = basePrice * gstRate;
                        const totalPrice = basePrice + gstAmount;
                        
                        element.innerHTML = `₹${totalPrice.toLocaleString("en-IN")} night <span class="tax-info">(incl. GST)</span>`;
                    } else {
                        // Show base price only
                        element.innerHTML = `₹${basePrice.toLocaleString("en-IN")} night`;
                    }
                }
            });
        };
        
        // Initial update
        updatePrices();
        
        // Update on toggle change
        taxToggle.addEventListener('change', updatePrices);
    }
});