
const modalEl = document.getElementById('preview-modal');
const openBtn = document.getElementById('preview-btn');
const closeBtn = document.getElementById('close-modal-btn');
const iframe = document.getElementById('preview-iframe');
const switcherButtons = document.querySelectorAll('.cfb-preview-switcher');
const previewContainer = document.getElementById('cfb-preview-container');
const activePreviewButtonClass = "cfb-preview-switcher cfb:hover:text-blue-400 cfb:text-blue-600 cfb:text-sm cfb:transition";
const inactivePreviewButtonClass = "cfb-preview-switcher cfb:hover:text-blue-400 cfb:text-sm cfb:text-black cfb:transition";


const previewCall = (formState) => {
    const csrfInput = document.getElementById('csrf-input');
    const csrfToken = csrfInput.value;
    const data = {
        form: formState
    };

    fetch(Craft.getActionUrl('form-builder/forms/preview'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            modalEl.classList.remove('cfb:opacity-0', 'cfb:pointer-events-none');
            modalEl.classList.add('cfb:opacity-100', 'cfb:pointer-events-auto');
            iframe.srcdoc = html;
        })
        .catch(error => {
            Craft.cp.displayError('Failed to send preview request');
        });

}

export const registerPreviewEventListeners = (formState) => {
    openBtn?.addEventListener('click', () => previewCall(formState));
    closeBtn.addEventListener('click', hideModal);
    modalEl.addEventListener('click', (e) => {
        if (e.target === modalEl) {
            hideModal();
        }
    });
    switcherButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            switcherButtons.forEach(btn => btn.className = inactivePreviewButtonClass);
            button.className = activePreviewButtonClass;
            const device = button.dataset.device;
            previewContainer.className = `cfb:preview-device-frame cfb:${device}`
        });
    });
}

const hideModal = () => {
    modalEl.classList.remove('cfb:opacity-100', 'cfb:pointer-events-auto');
    modalEl.classList.add('cfb:opacity-0', 'cfb:pointer-events-none');
};



