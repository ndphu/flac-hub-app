class Loader {
  constructor() {
    this.loadScreen = document.getElementById('load-screen');
  }

  show = () => {
    this.loadScreen.style.display = 'block';
    this.loadScreen.style.visibility = 'visible';
  };

  hide = () => {
    this.loadScreen.style.display = 'none';
    this.loadScreen.style.visibility = 'hidden';
  };
}

const loader = new Loader();

export default loader;