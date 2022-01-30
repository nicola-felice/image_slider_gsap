gsap.registerPlugin(ScrollTrigger);

// carica animazioni dopo caricamento della pagina
window.addEventListener('load', () => {
  loadScrollAnimation();
});


function loadScrollAnimation() {
  const scrollImagesAnimation = gsap.timeline({
    scrollTrigger: {
      trigger: '.image_slider_section',
      pin: true,
      scrub: true,
    }
  });

  const listImageContainers = document.querySelectorAll('.img_container');

  listImageContainers.forEach( (imageContainer, index) => {
    // se è l'ultima immagine non mettere animazione (deve rimanere a schermo)
    const isLastElement = index === listImageContainers.length - 1;
    if ( isLastElement )
      return;

    const image = imageContainer.querySelector('img');
    // imposto uno z index decrescente (le prime immagini a essere animate devono stare sopra)
    imageContainer.style.zIndex = 100 - index;
    
    // creo l'animazione per la singola immagine
    const partialAnimation = gsap.timeline();
    partialAnimation
    .to(imageContainer, {
      x: '-100%',
    })
    .to(image, {
      x: '100%',
    }, '<');

    // aggiungo l'animazione della singola immagine alla timeline dello slider completo
    scrollImagesAnimation.add(partialAnimation, '>');
  });
}