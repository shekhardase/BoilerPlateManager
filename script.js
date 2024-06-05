document.addEventListener('DOMContentLoaded', () => {
    const boilerplateForm = document.getElementById('boilerplate-form');
    const boilerplateName = document.getElementById('boilerplate-name');
    const boilerplateContent = document.getElementById('boilerplate-content');
    const boilerplateList = document.getElementById('boilerplate-list');

    let boilerplates = JSON.parse(localStorage.getItem('boilerplates')) || [];

    const saveBoilerplates = () => {
        localStorage.setItem('boilerplates', JSON.stringify(boilerplates));
        renderBoilerplates();
    };

    const renderBoilerplates = () => {
        boilerplateList.innerHTML = '';
        boilerplates.forEach((boilerplate, index) => {
            const boilerplateItem = document.createElement('div');
            boilerplateItem.classList.add('border', 'rounded', 'p-4', 'bg-gray-800', 'text-white', 'flex-shrink-0', 'w-64', 'm-2', 'relative'); // Darker background color

            const boilerplateTitle = document.createElement('h3');
            boilerplateTitle.classList.add('text-lg', 'font-bold', 'mb-2');
            boilerplateTitle.innerText = boilerplate.name;

            const boilerplateCode = document.createElement('pre');
            boilerplateCode.classList.add('whitespace-pre-wrap', 'break-words', 'max-h-40', 'overflow-auto', 'bg-gray-700', 'p-2', 'rounded'); // Darker background color
            boilerplateCode.innerText = boilerplate.content;

            const copyButton = document.createElement('button');
            copyButton.innerText = 'Copy';
            copyButton.classList.add('absolute', 'top-2', 'right-2', 'bg-blue-500', 'text-white', 'px-2', 'py-1', 'rounded');
            copyButton.addEventListener('click', () => {
                navigator.clipboard.writeText(boilerplate.content)
                    .then(() => {
                        alert('Boilerplate copied to clipboard!');
                    })
                    .catch(err => {
                        console.error('Failed to copy text: ', err);
                    });
            });

            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.classList.add('absolute', 'bottom-2', 'right-2', 'bg-red-500', 'text-white', 'px-2', 'py-1', 'rounded');
            deleteButton.addEventListener('click', () => {
                boilerplates.splice(index, 1);
                saveBoilerplates();
            });

            boilerplateItem.appendChild(boilerplateTitle);
            boilerplateItem.appendChild(boilerplateCode);
            boilerplateItem.appendChild(copyButton);
            boilerplateItem.appendChild(deleteButton);
            boilerplateList.appendChild(boilerplateItem);
        });
    };

    boilerplateForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = boilerplateName.value.trim();
        const content = boilerplateContent.value.trim();

        if (name && content) {
            boilerplates.push({ name, content });
            saveBoilerplates();

            boilerplateName.value = '';
            boilerplateContent.value = '';
        }
    });

    renderBoilerplates();
});
