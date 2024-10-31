const addLabelBtn = document.getElementById('addlabel_btn');
const labelContainer = document.getElementById('label-container');
const overlay = document.getElementById('overlay');
const customDialog = document.getElementById('custom-dialog');
const labelInput = document.getElementById('label-input');
const saveLabelBtn = document.getElementById('save-label');
const cancelLabelBtn = document.getElementById('cancel-label');
const addLabelButton = document.getElementById('add-label');

const showContactButton = document.getElementById('createContact_btn');
const showListButton = document.getElementById('show-list');

// Afficher le dialogue pour ajouter un label
const showDialog = () => {
    overlay.classList.remove('hidden');
    customDialog.classList.remove('hidden');
    labelInput.value = ''; // Réinitialiser l'entrée
    labelInput.focus(); // Mettre le focus sur l'entrée
};

addLabelButton.addEventListener('click', showDialog);
addLabelBtn.addEventListener('click', showDialog);

// Tableau pour stocker les labels
let labels = [];

// Sauvegarder un nouveau label
saveLabelBtn.addEventListener('click', () => {
    const newLabel = labelInput.value.trim();
    
    // Vérifier si le label existe déjà
    const existingLabels = Array.from(labelContainer.children).map(div => div.querySelector('span').textContent.trim());
    
    if (newLabel && !existingLabels.includes(newLabel)) {
        const labelDiv = document.createElement('div');
        labelDiv.classList.add('bg-gray-100', 'rounded-md', 'py-1', 'px-2', 'flex', 'items-center', 'space-x-2');
        labelDiv.innerHTML = `
            <img src="images/label.svg" alt="Label" class="w-5 h-5">
            <span>${newLabel}</span>
        `;
        labelContainer.appendChild(labelDiv);

         // Ajouter le label au tableau
         labels.push(newLabel);


        overlay.classList.add('hidden');
        customDialog.classList.add('hidden');
    } else if (existingLabels.includes(newLabel)) {
        alert('Le label existe déjà.'); // Alerte si le label est déjà présent
        overlay.classList.add('hidden');
        customDialog.classList.add('hidden');
    }
});
// Charger les labels depuis localStorage
function loadLabels() {
    const storedLabels = JSON.parse(localStorage.getItem('labels')) || [];
    labels = storedLabels; // Mettre à jour la variable labels

    storedLabels.forEach(label => {
        const labelDiv = document.createElement('div');
        labelDiv.classList.add('bg-gray-100', 'rounded-md', 'py-1', 'px-2', 'flex', 'items-center', 'space-x-2');
        labelDiv.innerHTML = `
            <img src="images/label.svg" alt="Label" class="w-5 h-5">
            <span>${label}</span>
        `;
        labelContainer.appendChild(labelDiv);
    });
}

// Appeler la fonction au chargement du document
document.addEventListener("DOMContentLoaded", loadLabels);

// Annuler l'ajout de label
cancelLabelBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
    customDialog.classList.add('hidden');
});

// Navigation vers d'autres pages
showContactButton.addEventListener('click', () => {
    window.location.href = 'contact.html';
});

showListButton.addEventListener('click', () => {
    window.location.href = 'index1.html';
});

// Tableau pour stocker les contacts
let contacts = [];

// Ajouter un nouveau champ d'email
function addEmailField() {
    const newEmailInput = document.createElement('div');
    newEmailInput.classList.add('flex', 'justify-start', 'gap-4', 'mt-2');
    newEmailInput.innerHTML = `
        <img src="images/ic--outline-email.svg" alt="Email Icon">
        <input class="p-2 border border-gray-300 rounded w-4/5" type="email" placeholder="Email">
    `;
    const emailContainer = document.getElementById('email-container');
    emailContainer.appendChild(newEmailInput);
}

// Gérer le téléchargement d'une image
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const photoPreview = document.getElementById('photo-preview');
            photoPreview.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}




// Ajouter un contact
function addContact(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    const prenom = document.getElementById('prenom').value;
    const nom = document.getElementById('nom').value;
    const entreprise = document.getElementById('entreprise').value;
    const fonction = document.getElementById('fonction').value;

    // Récupérer tous les emails
    const emailInputs = document.querySelectorAll('#email-container input[type="email"]');
    const emails = Array.from(emailInputs).map(input => input.value.trim()).filter(email => email); // Filtrer les emails vides

    const phone = document.getElementById('phone').value;
    const imageSrc = document.getElementById('photo-preview').src; // Récupérer la source de l'image

    const contact = {
        prenom,
        nom,
        entreprise,
        fonction,
        emails,
        phone,
        image: imageSrc,
        labels // Ajouter les labels à l'objet contact
    };

    // Récupérer les contacts existants ou initialiser un tableau vide
    const existingContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    existingContacts.push(contact); // Ajouter le nouveau contact

    localStorage.setItem('contacts', JSON.stringify(existingContacts)); // Sauvegarder les contacts




    // Réinitialiser le formulaire
    document.getElementById('contact-form').reset();
    document.getElementById('photo-preview').src = 'images/images.png'; // Réinitialiser l'image
    console.log(contacts); // Afficher les contacts

     // Rediriger vers la page des contacts
     window.location.href = 'index1.html';
}


// Ajouter les écouteurs d'événements
document.getElementById('add-email').addEventListener('click', addEmailField);
document.getElementById('upload-photo').addEventListener('click', () => {
    document.getElementById('photo').click();
});
document.getElementById('photo').addEventListener('change', handleImageUpload);
document.getElementById('contact-form').addEventListener('submit', addContact);

document.addEventListener("DOMContentLoaded", function() {
    let isVisible = true; // État d'affichage

    const menu = document.getElementById("menu");
    const formContainer = document.getElementById("contact-form");   

    document.getElementById("menu-humburger").addEventListener("click", function() {
        if (menu && formContainer) { // Vérifie que les éléments existent
            if (isVisible) {
                // Cacher le menu et agrandir le conteneur de formulaire
                menu.classList.add('hidden'); // Cache le menu
                formContainer.classList.remove('w-3/4'); // Réinitialise la largeur
                formContainer.classList.add('w-12/12'); // Agrandit le conteneur de formulaire à 95%
            } else {
                menu.classList.remove('hidden'); // Affiche le menu
                menu.classList.add('flex'); // Applique le style flex
                menu.classList.add("flex-col");
                formContainer.classList.remove('w-11/12'); // Réinitialise la largeur
                formContainer.classList.add('w-3/4'); // Rétrécit le conteneur de formulaire à 75%
            }
            isVisible = !isVisible; // Inverse l'état
        } else {
            console.error("Le menu ou le conteneur de formulaire n'est pas trouvé.");
        }
    });
});
