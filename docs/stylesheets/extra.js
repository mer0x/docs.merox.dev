document.addEventListener('DOMContentLoaded', () => {
    const target = document.createElement('div');
    target.id = 'dynamic-text';
    document.body.prepend(target);

    const phrases = ['Learn', 'Deploy', 'RUN'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isTyping = true;

    function type() {
        if (isTyping) {
            if (charIndex < phrases[phraseIndex].length) {
                target.textContent += phrases[phraseIndex][charIndex];
                charIndex++;
                setTimeout(type, 100); // viteza de tiparire
            } else {
                isTyping = false;
                setTimeout(erase, 1000); // pauza dupa tiparire
            }
        }
    }

    function erase() {
        if (!isTyping) {
            if (charIndex > 0) {
                target.textContent = target.textContent.slice(0, -1);
                charIndex--;
                setTimeout(erase, 50); // viteza de stergere
            } else {
                isTyping = true;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(type, 500); // pauza intre fraze
            }
        }
    }

    type();
});
