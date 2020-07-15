const s = ( sketch ) => {
  
  
  sketch.getDimensions = () => {
    sketch.wanted_height = document.body.clientHeight;
    sketch.wanted_width = document.body.clientWidth;
  }
  
  sketch.grid = new Grid(sketch);
  sketch.backgroundPressed = false;
  sketch.wanted_height = 0;
  sketch.wanted_width = 0;
  sketch.getDimensions();

  sketch.allComponents = [];

  // p5.js execute this method once at the loading of the page
  sketch.setup = () => {
    let cnv = sketch.createCanvas(sketch.wanted_width, sketch.wanted_height);
    // cnv.parent("myContainer");
    sketch.pixelDensity(1);

    
    sketch.allComponents.push(new Component(im, 50, 200, 0, sketch, sketch.grid));
    sketch.allComponents.push(new Component(im, 500, 700, 1, sketch, sketch.grid));
    sketch.allComponents.push(new Component(im, 200, 400, 2, sketch, sketch.grid));
    sketch.allComponents.push(new Component(im, 600, 200, 3, sketch, sketch.grid));
    
  }

  // p5.js continuously call this method
  sketch.draw = () => {
    sketch.background(120);
    Component.beginUpdate();
    for (let comp of sketch.allComponents) {
      comp.update();
    }
    

  }
  
  // handle resize events
  sketch.resize = () => {
    sketch.getDimensions();
    sketch.resizeCanvas(sketch.wanted_width, sketch.wanted_height, true);
  }

  // mouse pressed event
  sketch.mousePressed = () => {
    sketch.backgroundPressed = true;

    // loop over each component in the canvas and drag it if the mouse is over it
    for (let comp of sketch.allComponents) {
      if (comp.isMouseOver()) {
        sketch.backgroundPressed = false;
        comp.startMoving();
      }
    }

    for (comp of sketch.allComponents) {
      if (Component.isInActive(comp.id)) {
        comp.startMoving();
      }
    }

    if (sketch.backgroundPressed) {
      Component.resetActiveComponents();
      sketch.grid.startMoving();
      for (let comp of sketch.allComponents) {
        if (comp.move) {
          comp.stopMoving();
        }
      }

    }
  }

  // mouse released event
  sketch.mouseReleased = () => {
    // drop each component if it was previously dragged
    for (let comp of sketch.allComponents) {
      if (comp.move) {
        comp.stopMoving();
      }
    }
    if(sketch.backgroundPressed) {
      sketch.grid.stopMoving();
    }
  }
  for (comp of sketch.allComponents) {
    if (Component.isInActive(comp.id)) {
      comp.stopMoving();
    }
  }

  // when user scroll to resize the grid
  sketch.mouseWheel = (event) => { 
    // call the resize method in each component
    sketch.grid.resize(-event.delta/1000)
} 


}
// create the canvas with the sketch
var myp5 = new p5(s, document.getElementById("myContainer"));

// handle the resize event from the body
// call the resize method in p5
function resize(){
  myp5.resize();
}
