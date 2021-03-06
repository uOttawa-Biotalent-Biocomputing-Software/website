class Node {

  /**
   * Takes in shape of component to get its vertex points
   * @param  {} contour
   */
  constructor(contour) {
    this.contour = contour;
    this.sketch = contour.sketch;
    this.grid = contour.grid;
    this.component = contour.component;
    this.realX;
    this.realY;
    this.size;
    this.isMouseOver = false;
  }

  // Checks if mouse is over any vertex points
  getIsMouseOver() {
    this.isMouseOver =
      (((this.sketch.mouseX - this.realX) ** 2 +
        (this.sketch.mouseY - this.realY) ** 2) ** 
        0.5) < this.contour.size2 * this.grid.scalingFactor;
    if (this.isMouseOver) {
      Component.mouseOnNode = true;
      Component.clickedNode = this;
    }
    return this.isMouseOver;
  }

  // Updates vertex on canvas to show mouse is over point
  update(x, y) {
    this.realX = this.grid.getRealCoordinateX(x);
    this.realY = this.grid.getRealCoordinateY(y);
    if (this.getIsMouseOver()) {
      this.size = this.contour.size2;
    } else {
      this.size = this.contour.size1;
    }

    
  }

  // Show vertex of component
  show() {
    this.sketch.fill(0, 0, 0, 0);
    this.sketch.ellipse(
      this.realX,
      this.realY,
      this.grid.scalingFactor * this.size
    );
  }
}
