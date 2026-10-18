function animateDeletion() {
    const deleteButton = document.getElementById('deleteButton');
    const deletionText = document.getElementById('deletionText');
    const deleteText = document.getElementById('deleteText');
    const trashIcon = document.getElementById('trashIcon');
    const paperIcon = document.getElementById('paperIcon');

    deleteButton.disabled = true;
    deleteText.classList.add('delete-text');

    setTimeout(() => {
        deletionText.classList.add('trash-can-move');
    }, 500);

    setTimeout(() => {
        paperIcon.classList.add('paper-animate');
    }, 1000);

    // After the paper icon animation completes, start the trash can end animation
    setTimeout(() => {
        deletionText.classList.add('trash-can-end');

        // Once the trash can has moved and faded out, show the confirmation text
        setTimeout(() => {
            confirmationText.style.display = "block";
            confirmationText.classList.add('confirmation-text');
        }, 500);

    }, 2000);
}
