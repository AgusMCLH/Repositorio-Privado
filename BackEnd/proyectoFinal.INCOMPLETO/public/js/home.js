const states = ['active', 'unactive'];
const textStates = ['active-Text', 'unactive-Text'];

const banners = document.getElementsByClassName('hero-img');
const texts = document.getElementsByClassName('hero-text');

let index;

for (let i = 0; i < banners.length; i++) {
  if (banners[i].classList.contains(states[0])) {
    index = i;
  }
}

document.getElementById('prev-hero_button').addEventListener('click', () => {
  console.log(index);
  banners[index].classList.remove(states[0]);
  banners[index].classList.add(states[1]);

  texts[index].classList.remove(textStates[0]);
  texts[index].classList.add(textStates[1]);

  unactiveTexts(texts[index].children);

  index--;
  if (index < 0) {
    index = banners.length - 1;
  }

  activeTexts(texts[index].children);
  banners[index].classList.remove(states[1]);
  banners[index].classList.add(states[0]);

  texts[index].classList.remove(textStates[1]);
  texts[index].classList.add(textStates[0]);
});

document.getElementById('next-hero_button').addEventListener('click', () => {
  banners[index].classList.remove(states[0]);
  banners[index].classList.add(states[1]);
  texts[index].classList.remove(textStates[0]);
  texts[index].classList.add(textStates[1]);
  unactiveTexts(texts[index].children);
  index++;
  if (index > banners.length - 1) {
    index = 0;
  }
  activeTexts(texts[index].children);
  texts[index].classList.remove(textStates[1]);
  texts[index].classList.add(textStates[0]);
  banners[index].classList.remove(states[1]);
  banners[index].classList.add(states[0]);
});

const activeTexts = (textList) => {
  const chidren = textList[0].children;
  for (let i = 0; i < chidren.length; i++) {
    let classList = chidren[i].classList.value;
    classList = classList.split('-');
    classList = classList[0] + '-' + classList[1];
    chidren[i].classList = classList + '-active';
  }
};

const unactiveTexts = (textList) => {
  const chidren = textList[0].children;
  for (let i = 0; i < chidren.length; i++) {
    let classList = chidren[i].classList.value;
    classList = classList.split('-');
    classList = classList[0] + '-' + classList[1];
    console.log('classList es: ', classList);
    chidren[i].classList = classList + '-unactive';
  }
};
