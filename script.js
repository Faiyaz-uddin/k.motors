// Vehicle Data
const carData = {
    "Maruti Suzuki": ["Alto", "Wagon R", "Swift", "Baleno", "Dzire", "Ertiga", "Brezza", "Ciaz", "S-Presso", "Ignis", "XL6", "Grand Vitara", "Fronx", "Jimny", "Invicto"],
    "Hyundai": ["Grand i10 Nios", "i20", "Aura", "Verna", "Venue", "Creta", "Alcazar", "Tucson", "Exter", "Ioniq 5"],
    "Tata": ["Tiago", "Tigor", "Altroz", "Nexon", "Harrier", "Safari", "Punch", "Tiago EV", "Nexon EV", "Punch EV"],
    "Mahindra": ["XUV300", "XUV700", "Scorpio N", "Scorpio Classic", "Thar", "Bolero", "Bolero Neo", "Marazzo", "XUV400"],
    "Honda": ["Amaze", "City", "Elevate"],
    "Toyota": ["Glanza", "Urban Cruiser Hyryder", "Innova Crysta", "Innova Hycross", "Fortuner", "Camry", "Hilux"],
    "Kia": ["Sonet", "Seltos", "Carens", "EV6"],
    "Volkswagen": ["Virtus", "Taigun", "Tiguan"],
    "Skoda": ["Slavia", "Kushaq", "Kodiaq"],
    "Renault": ["Kwid", "Triber", "Kiger"],
    "MG": ["Hector", "Astor", "Gloster", "Comet EV", "ZS EV"],
    "Other": ["Other Model"]
};

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Dynamic Dropdown Logic
function populateModels(brandSelectId, modelSelectId) {
    const brandSelect = document.getElementById(brandSelectId);
    const modelSelect = document.getElementById(modelSelectId);

    if (!brandSelect || !modelSelect) return;

    brandSelect.addEventListener('change', function() {
        const selectedBrand = this.value;
        modelSelect.innerHTML = '<option value="" disabled selected>Select Model</option>';

        if (selectedBrand && carData[selectedBrand]) {
            carData[selectedBrand].forEach(model => {
                const option = document.createElement('option');
                option.value = model;
                option.textContent = model;
                modelSelect.appendChild(option);
            });
        }
    });
}

// Initialize Dropdowns if they exist
document.addEventListener('DOMContentLoaded', () => {
    populateModels('quote-brand', 'quote-model');
    populateModels('home-brand', 'home-model');
});

// WhatsApp Redirect Logic
function sendWhatsApp(formId, type) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        let message = "";
        const phone = "919477633336"; // Added country code 91

        if (type === 'quote') {
            const name = formData.get('name');
            const brand = formData.get('brand');
            const model = formData.get('model');
            const service = formData.get('service');
            const notes = formData.get('notes');
            
            message = `Hi, I need a quote.%0A*Name:* ${name}%0A*Car:* ${brand} ${model}%0A*Service:* ${service}%0A*Notes:* ${notes}`;
        } else if (type === 'home') {
            const name = formData.get('name');
            const address = formData.get('address');
            const brand = formData.get('brand');
            const model = formData.get('model');
            const service = formData.get('service');
            const date = formData.get('date');
            
            message = `Hi, I want to book a home service.%0A*Name:* ${name}%0A*Address:* ${address}%0A*Car:* ${brand} ${model}%0A*Service:* ${service}%0A*Preferred Date:* ${date}`;
        }

        const url = `https://wa.me/${phone}?text=${message}`;
        window.open(url, '_blank');
    });
}

// Initialize Forms
document.addEventListener('DOMContentLoaded', () => {
    sendWhatsApp('quote-form', 'quote');
    sendWhatsApp('home-service-form', 'home');
});
