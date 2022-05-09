//  export
 class Contacto {
        static contadorContacto = 0;
        _id;
        _nombre;
        _celular;
        _mensaje;
        
        constructor(nombre, celular, mensaje) {
          this._id = ++Contacto.contadorContacto;
          this._nombre = nombre;
          this._celular = celular;
          this._mensaje = mensaje;
        }
      
        get id() {
          return this._id;
        }
      
        get nombre() {
          return this._nombre;
        }
      
        set nombre(nombre) {
          this._nombre = nombre;
        }
      
        get celular() {
          return this._celular;
        }
      
        set celular(celular) {
          this._celular = celular;
        }
      
        get mensaje() {
          return this._mensaje;
        }
      
        set mensaje(mensaje) {
          this._mensaje = mensaje;
        }
      
      };