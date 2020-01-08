class ResizeSensor {

  constructor(selector, handler) {

    this.element = document.querySelector(selector);
    this.handler = handler;

    this.divElementsBox = document.createElement('div');
    this.expandDivOuter = document.createElement('div');
    this.expandDivInner = document.createElement('div');
    this.shrinkDivOuter = document.createElement('div');
    this.shrinkDivInner = document.createElement('div');

    this.divElementsBox.className = 'resize-sensor';
    this.divElementsBox.style.visibility = 'hidden';
    this.divElementsBox.style.position = 'absolute';
    this.divElementsBox.style.overflow = 'scroll';
    this.divElementsBox.style.bottom = '0px';
    this.divElementsBox.style.right = '0px';
    this.divElementsBox.style.left = '0px';
    this.divElementsBox.style.top = '0px';

    this.expandDivOuter.className = 'resize-sensor-expand';
    this.expandDivOuter.style.visibility = 'hidden';
    this.expandDivOuter.style.position = 'absolute';
    this.expandDivOuter.style.overflow = 'scroll';
    this.expandDivOuter.style.bottom = '0px';
    this.expandDivOuter.style.right = '0px';
    this.expandDivOuter.style.left = '0px';
    this.expandDivOuter.style.top = '0px';

    this.expandDivInner.style.position = 'absolute';
    this.expandDivInner.style.left = '0px';
    this.expandDivInner.style.top = '0px';

    this.shrinkDivOuter.className = 'resize-sensor-shrink';
    this.shrinkDivOuter.style.visibility = 'hidden';
    this.shrinkDivOuter.style.position = 'absolute';
    this.shrinkDivOuter.style.overflow = 'scroll';
    this.shrinkDivOuter.style.bottom = '0px';
    this.shrinkDivOuter.style.right = '0px';
    this.shrinkDivOuter.style.left = '0px';
    this.shrinkDivOuter.style.top = '0px';

    this.shrinkDivInner.style.position = 'absolute';
    this.shrinkDivInner.style.height = '200%';
    this.shrinkDivInner.style.width = '200%';
    this.shrinkDivInner.style.left = '0px';
    this.shrinkDivInner.style.top = '0px';

    this.expandDivOuter.appendChild(this.expandDivInner);
    this.shrinkDivOuter.appendChild(this.shrinkDivInner);
    this.divElementsBox.appendChild(this.expandDivOuter);
    this.divElementsBox.appendChild(this.shrinkDivOuter);

    this.element.appendChild(this.divElementsBox);

    if (!{fixed: 1, absolute: 1}[window.getComputedStyle(this.element, null).getPropertyValue('position')]) {
        this.element.style.position = 'relative';
    }

    this.reset();

    this.addEvent(this.expandDivOuter, 'scroll', () => {
        if (this.element.offsetWidth > this.lastWidth || this.element.offsetHeight > this.lastHeight) {
          this.handler();
        }
        this.reset();
    });

    this.addEvent(this.shrinkDivOuter, 'scroll', () => {
        if (this.element.offsetWidth < this.lastWidth || this.element.offsetHeight < this.lastHeight) {
          this.handler();
        }
        this.reset();
    });

  }

  reset() {
    this.expandDivInner.style.width = this.expandDivOuter.offsetWidth + 10 + 'px';
    this.expandDivInner.style.height = this.expandDivOuter.offsetHeight + 10 + 'px';

    this.expandDivOuter.scrollLeft = this.expandDivOuter.scrollWidth;
    this.expandDivOuter.scrollTop = this.expandDivOuter.scrollHeight;

    this.shrinkDivOuter.scrollLeft = this.shrinkDivOuter.scrollWidth;
    this.shrinkDivOuter.scrollTop = this.shrinkDivOuter.scrollHeight;

    this.lastWidth = this.element.offsetWidth;
    this.lastHeight = this.element.offsetHeight;
  }

  addEvent(element, eventType, callback) {
    element.addEventListener(eventType, callback);
  }

}
