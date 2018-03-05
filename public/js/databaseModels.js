class BaseItem {

     constructor(id, ident, name, onTimes, offTimes) {    
          this._id = id;
          this.ident = ident;
          this.name = name;
          this.onTimes = onTimes;
          this.offTimes = offTimes;
     }

     get _onTimes() { return this.onTimes; }
     set _onTimes(onTimes) { if(onTimes != null) this.onTimes = onTimes; }

     get _offTimes() { return this.offTimes; }
     set _offTimes(offTimes) { if(offTimes != null) this.offTimes = offTimes; }

     get _name(){ return this.name; }
     set _name(name) { if(name != null) this.name = name; }

     get _ident() { return this.ident; }
     set _ident(ident) { if(ident != null) this.ident = ident; }

     get id() { return this._id; }
     set id(id) {if(id != null) this._id = id; }
}

var LightBulbClass = class LightBulbClass extends BaseItem {
     constructor(id, ident, name, onTimes, offTimes, lightPresets, r,g,b) {
          super(id, ident, name, onTimes, offTimes);
          this.lightPresets = [LightPreset];
          this.r = Number;
          this.g = Number;
          this.b = Number;

          this.lightPresets = lightPresets;
          this.r = r;
          this.g = g;
          this.b = b;
     }

     get RGB() {
          var rgb = {
               r: this.r,
               g: this.g,
               b: this.b
          }
          return rgb;
     }

     get _r() {return this.r};
     get _g() {return this.g};
     get _b() {return this.b};

     set _r(r) { this.r = r};
     set _g(g) { this.g = g};
     set _b(b) { this.b = b};

     setRGB(r,g,b) {
          if(r == null || g == null || b == null) {
               console.error("RGB values need to be defined!");
               return;
          }
          this.r = parseInt(r);
          this.g = parseInt(g);
          this.b = parseInt(b);
     }

     get _lightPresets() {
          return this.lightPresets;
     }

     addLightPreset(r,g,b) {
          if(r == null || g == null || b == null) {
               console.error("RGB values need to be defined!");
               return;
          }
          this.lightPresets.push(new LightPreset(r,g,b));
     }

     removeLightPreset(presetName) {
          var ind = this.lightPresets.indexOf(presetName);
          this.lightPresets.splice(ind, 1);
     }
}

var SwitchClass = class SwitchClass extends BaseItem{
     constructor(id, ident, name, onTimes, offTimes, state, slaveid) {
          super(id, ident, name, onTimes, offTimes);
          this.state = state;
          this.slaveid = slaveid;
     }

     set _state(state) { this.state = state; }
     get _state() { return this.state; }

     set _state(state) { this.state = state; }
     get _state() { return this.state; }
}

var PlugClass = class PlugClass extends BaseItem{
     constructor(id, ident, name, onTimes, offTimes, state) {
          super(id, ident, name, onTimes, offTimes);
          this.state = state;
     }

     set _state(state) { this.state = state; }
     get _state() { return this.state; }
}


var LightPreset = class LightPreset {
     constructor() {
          this.r = Number;
          this.g = Number;
          this.b = Number;
     }

     setRGB(r,g,b) {
          this.r = parseInt(r);
          this.g = parseInt(g);
          this.b = parseInt(b);
     }
}

// module.exports.plugClass = plugClass;
// module.exports.switchClass = switchClass;
// module.exports.lightBulbClass = lightBulbClass;