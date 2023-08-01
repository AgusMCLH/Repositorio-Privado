const states = ['active', 'unactive'];
const textStates = ['active-Text', 'unactive-Text'];

const banners = document.getElementsByClassName('hero-img');
const texts = document.getElementsByClassName('hero-text');

console.log('texts', texts);

let index;

for (let i = 0; i < banners.length; i++) {
  if (banners[i].classList.contains(states[0])) {
    index = i;
  }
}
console.log('el activo es', index);

document.getElementById('prev-hero_button').addEventListener('click', () => {
  banners[index].classList.remove(states[0]);
  banners[index].classList.add(states[1]);

  texts[index].classList.remove(textStates[0]);
  texts[index].classList.add(textStates[1]);
  index--;
  if (index < 0) {
    index = banners.length - 1;
  }
  texts[index].classList.remove(textStates[1]);
  texts[index].classList.add(textStates[0]);
  banners[index].classList.remove(states[1]);
  banners[index].classList.add(states[0]);
});

document.getElementById('next-hero_button').addEventListener('click', () => {
  banners[index].classList.remove(states[0]);
  banners[index].classList.add(states[1]);
  texts[index].classList.remove(textStates[0]);
  texts[index].classList.add(textStates[1]);
  index++;
  if (index > banners.length - 1) {
    index = 0;
  }
  texts[index].classList.remove(textStates[1]);
  texts[index].classList.add(textStates[0]);
  banners[index].classList.remove(states[1]);
  banners[index].classList.add(states[0]);
});
