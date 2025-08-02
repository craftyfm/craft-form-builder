import {createDropIndicator, getDragAfterField} from "../utils";

let dropIndicator = null;
let draggedElement = null;

export function handleDragStart(_) {
    draggedElement = this;
    this.classList.add('dragging');

    // Create and store drop indicator
    dropIndicator = createDropIndicator();
}

export const handleDragEnd = (_) => {
    draggedElement.classList.remove('dragging');

    // Remove drop indicator if it exists
    if (dropIndicator && dropIndicator.parentNode) {
        dropIndicator.parentNode.removeChild(dropIndicator);
    }

    draggedElement = null;
    dropIndicator = null;
}

export const initDragDrop = (renderer, formState, formContainer) => {

    const formElements = document.querySelectorAll('.form-element');
    // --- Drag and Drop ---
    formElements.forEach(element => {
        element.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', element.dataset.type);
        });
        element.addEventListener('dragstart', handleDragStart);
        element.addEventListener('dragend', handleDragEnd);
    });

    formContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (!dropIndicator || renderer.formState.fields.length === 0) {
            return;
        }

        const scrollMargin = 100; // px
        const scrollSpeed = 20;

        if (e.clientY < scrollMargin) {
            window.scrollBy(0, -scrollSpeed);
        } else if (e.clientY > window.innerHeight - scrollMargin) {
            window.scrollBy(0, scrollSpeed);
        }

        const afterElement = getDragAfterField(formContainer, e.clientY);
        if (dropIndicator.parentNode) {
            dropIndicator.parentNode.removeChild(dropIndicator);
        }
        if (afterElement) {
            formContainer.insertBefore(dropIndicator, afterElement);
        } else {
            formContainer.appendChild(dropIndicator);
        }
    });

    formContainer.addEventListener('drop', (e) => {
        e.preventDefault();
        if (!dropIndicator) {
            return;
        }
        const afterElement = getDragAfterField(formContainer, e.clientY);
        const type = e.dataTransfer.getData('text/plain');
        const pos = afterElement ? afterElement.dataset.index : null;
        if (type) {
            renderer.addField(type, pos);
        } else {
            const oldPos = draggedElement.dataset.index;
            renderer.moveField(oldPos, pos, formState, renderer);
        }
    });
}