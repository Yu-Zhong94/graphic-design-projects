class Note {
  /////////////////////////////////
  constructor(_x, _y, _w, _h) {
    var noteCol = ['Ab', 'A', 'Bb', 'B','C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G'];
    var noteRow = ['1','2','3','4','5','6','7'];
    this.size = 40;
    this.pos = createVector(_x+ this.size/2, _y+ this.size/2);
    this.state = 0;
    this.activeTime = 0;
    this.note = noteCol[floor((_x+this.size/2) / (_w/noteCol.length))]+noteRow[floor((_y+this.size/2) / (_h/noteRow.length))];
    this.velocity = random();
    this.time = 0;
    this.dur = this.activeTime;
  }
}
/////////////////////////////////
class Grid {
  /////////////////////////////////
  constructor(_w, _h) {
    this.gridWidth = _w;
    this.gridHeight = _h;
    this.monoSynth = new p5.MonoSynth();
    this.notes = [];
    this.size = 40;
    // initalise grid structure and state
    for (var x=0;x<_w;x+=this.size){
      for (var y=0;y<_h;y+=this.size){
        this.notes.push(new Note(x, y, _w, _h));
      }
    }
  }
  /////////////////////////////////
  run(img) {
    img.loadPixels();
    this.findActiveNotes(img);
    this.getActiveNotesTime(img);
    this.drawActiveNotes(img);
    this.drawActiveEffects(img);
    this.playActiveNotes(img);
    
  }
  /////////////////////////////////
  drawActiveNotes(img){
    // draw active notes
    fill(255);
    noStroke();
    
    for (var i=0;i<this.notes.length;i++){
        var x = this.notes[i].pos.x;
        var y = this.notes[i].pos.y;
        if (this.notes[i].state>0) {
          
          var alpha = 200 / this.notes[i].activeTime * this.notes[i].state;
          var c1 = color(noise(this.notes[i].state)*255, map(mouseX,0,width,0,255), 0, alpha);
          var c2 = color(0, 255*noise(this.notes[i].state), map(mouseY,0,height,0,255), alpha); 
          var mix = lerpColor(c1, c2, map(i, 0, this.notes.length, 0, 1));
          var s = this.notes[i].state;
          
          fill(mix);
          noStroke();
          ellipse(x, y, this.size*s);

        }
        this.notes[i].state -= 0.05;
        this.notes[i].state = constrain(this.notes[i].state,0,1);
    }
  }

  //draw secondary effects
  drawActiveEffects(img){
    fill(255);
    noStroke();
    
    for (var i=0;i<this.notes.length;i++){
        var x = this.notes[i].pos.x;
        var y = this.notes[i].pos.y;
        if (this.notes[i].state>0 && this.notes[i].activeTime>2 && this.notes[i].activeTime<5) {
          
          var alpha = 200 / this.notes[i].state;
          var c1 = color(this.notes[i].state*255, map(mouseX,0,width,0,255), 0, alpha);
          var c2 = color(0, 255*this.notes[i].state, map(mouseY,0,height,0,255), alpha); 
          var mix = lerpColor(c1, c2, map(i, 0, this.notes.length, 0, 1));
          
          fill(mix);
          noStroke();
          rect(x-this.size/2 , y-this.size/2, this.notes[i].activeTime*this.size, this.notes[i].velocity*this.size);

        }
        this.notes[i].state -= 0.05;
        this.notes[i].state = constrain(this.notes[i].state,0,1);
    }
  }
  /////////////////////////////////
  findActiveNotes(img){
    for (var x = 0; x < img.width; x += 1) {
        for (var y = 0; y < img.height; y += 1) {
            var index = (x + (y * img.width)) * 4;
            var state = img.pixels[index + 0];
            if (state==0){ // if pixel is black (ie there is movement)
              // find which note to activate
              var screenX = map(x, 0, img.width, 0, this.gridWidth);
              var screenY = map(y, 0, img.height, 0, this.gridHeight);
              var i = int(screenX/this.size);
              var j = int(screenY/this.size);
              this.notes[i*int(this.gridHeight/this.size)+j].state = 1;
            }
        }
    }
  }

  //get note state lasting time
  getActiveNotesTime(img){
    // console.log(this.noteState);
    for (var i=0;i<this.notes.length;i++){
      if (this.notes[i].state>0) {
        this.notes[i].activeTime += 0.5;
        this.notes[i].activeTime = constrain(this.notes[i].activeTime,0,200);
      } else {
        this.notes[i].activeTime = 0;
      }
    }
  }

  //play notes if activated
  playActiveNotes(img) {
    for (var i=0;i<this.notes.length;i++){
      if (this.notes[i].state>0 && this.notes[i].activeTime>2 && this.notes[i].activeTime<5) {
        userStartAudio();
        this.monoSynth.play(this.notes[i].note, this.notes[i].velocity, this.notes[i].time, this.notes[i].dur);
      }
    }
  }
}
/////////////////////////////////
