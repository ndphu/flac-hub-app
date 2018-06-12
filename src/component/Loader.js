const Nanobar = require('nanobar')

class Loader {
  constructor() {
    const options = {
      classname: 'nano-bar',
    };
  
    this.nanobar = new Nanobar(options);
  }

  show = () => {
    this.nanobar.go(90)
  };

  hide = () => {
    this.nanobar.go(100)
  };
}

const loader = new Loader();

export default loader;