class Grid {
  constructor() {
    this.xOffset = 60;
    this.yOffset = 150;
  }

  getRealCoordinateX(x) {
    return x + this.xOffset
  }
  getRealCoordinateY(y) {
    return y + this.yOffset;
  }

  getGridCoordinateX(x) {
    return x - this.xOffset;
  }

  getGridCoordinateY(y) {
    return y - this.yOffset;
  }
}

class Component {
  constructor(path, initialX, initialY, id, sketch, grid) {
    this.img = sketch.loadImage(path);;
    this.w = 300;
    this.h = 100;
    this.x = initialX;
    this.y = initialY;
    this.move = false
    this.offsetX = 0;
    this.offsetY = 0;
    this.id = id;
    this.sketch = sketch;
    this.grid = grid;
  }

  // show component on the canvas
  show() {
    if (this.move) {
      this.x = this.sketch.mouseX - this.w/2 + this.offsetX;
      this.y = this.sketch.mouseY - this.h/2 + this.offsetY;
      
    }
    this.sketch.image(this.img, this.grid.getRealCoordinateX(this.x), this.grid.getRealCoordinateY(this.y), this.w, this.h);
  }

  // return true if mouse is over the component
  isMouseOver() {
    let realX = this.grid.getRealCoordinateX(this.x);
    let realY = this.grid.getRealCoordinateY(this.y);
    if(realX < this.sketch.mouseX && this.sketch.mouseX < realX+this.w && realY < this.sketch.mouseY && this.sketch.mouseY < realY+this.h && this.sketch.mouseIsPressed) {
      return true;
    }
    return false;
  }

  // calculate where the mouse is located relative to x and y of the component
  calculateOffset() {
    this.offsetX = -this.sketch.mouseX + this.x + this.w/2;
    this.offsetY = -this.sketch.mouseY + this.y + this.h/2;
  }
  
  // when mouse release, we need to reajust the x and y of the component with the offset
  resetOffset() {
    this.x = this.sketch.mouseX - this.w/2 + this.offsetX;
    this.y = this.sketch.mouseY - this.h/2 + this.offsetY;
    
    // set the offset at 0 after ajusting x and y
    this.offsetX = 0;
    this.offsetY = 0;
  }
}

const s = ( sketch ) => {
  
  
  sketch.getDimensions = () => {
    sketch.wanted_height = document.body.clientHeight;
    sketch.wanted_width = document.body.clientWidth;
  }

  sketch.wanted_height = 0;
  sketch.wanted_width = 0;
  sketch.getDimensions();

  sketch.allComponents = [];

  // p5.js execute this method once at the loading of the page
  sketch.setup = () => {
    let cnv = sketch.createCanvas(sketch.wanted_width, sketch.wanted_height);
    let grid = new Grid();
    // cnv.parent("myContainer");
    sketch.pixelDensity(1);

    
    sketch.allComponents.push(new Component(im, 0, 0, 0, sketch, grid));
    sketch.allComponents.push(new Component(im, 500, 500, 1, sketch, grid));
    sketch.allComponents.push(new Component(im, 200, 400, 2, sketch, grid));
    sketch.allComponents.push(new Component(im, 600, 500, 3, sketch, grid));
    
  }

  // p5.js continuously call this method
  sketch.draw = () => {
    sketch.background(120);

    for (let comp of sketch.allComponents) {
      comp.show();
    }
    

  }
  
  // handle resize events
  sketch.resize = () => {
    sketch.getDimensions();
    sketch.resizeCanvas(sketch.wanted_width, sketch.wanted_height, true);
  }

  // mouse pressed event
  sketch.mousePressed = () => {
    // loop over each component in the canvas and drag it if the mouse is over it
    for (let comp of sketch.allComponents) {
      if (comp.isMouseOver()) {
        comp.calculateOffset();
        comp.move = true;
      }
    }
  }

  // mouse released event
  sketch.mouseReleased = () => {
    // drop each component if it was previously dragged
    for (let comp of sketch.allComponents) {
      if (comp.move) {
        comp.resetOffset();
        comp.move = false;
      }
    }
  }


}
// create the canvas with the sketch
var myp5 = new p5(s, document.getElementById("myContainer"));

// handle the resize event from the body
// call the resize method in p5
function resize(){
  myp5.resize();
}
