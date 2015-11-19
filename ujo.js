
(function () {
    
    // just couple of sample getter functions (not important)
    var getters = {
        name : function() {
            return this.__raw.data.name;
        },
        lastName : function() {
            return this.__raw.data.lastName;
        }
    }

    var idFromNs = function(id) {
        if(id) {
            var len = id.length;
            if(id[len-1]=="#") {    
                id = id.split("@").shift();
            } 
        }
        return id;    
    }
    var objFromNs = function( obj, ns ) {
        if(obj && obj.__id) {
            if(obj.__p) obj.__p = idFromNs( obj.__p, ns );
            obj.__id = idFromNs( obj.__id, ns );
            for(var n in obj.data) {
                if(obj.data.hasOwnProperty(n)) {
                    if(Object(obj.data[n]) == obj.data[n]) objFromNs( obj.data[n], ns );
                }
            }
        }
        return obj;
    }

    
    function containerProto() {
        
        var _my_proto_ = this;

        Object.defineProperty(_my_proto_, "forEach", {
            enumerable: false,
            value : function(fn) {
                    var me = this;
                    this._keys.forEach( function(i) {
                        var o = me[i];
                        if(o) {
                            fn(o,i,me); // -- almost...
                        } 
                    })
              }
        });  
        Object.defineProperty(_my_proto_, "sort", {
            enumerable: false,
            value : function(fn) {
                var me = this,
                    res = [];
                this._keys.forEach( function(i) {
                    res.push( me[i] );
                })
                res.sort(fn);
                return res;
            }
        });   
        Object.defineProperty(_my_proto_, "map", {
            enumerable: false,
            value : function(fn) {
                var me = this,
                    res = [];
                this._keys.forEach( function(i) {
                    var o = me[i];
                    if(o) {
                        var val = fn(o,i,me); // -- almost...
                        if(val) res.push(val);
                    } 
                })
                return res;
            }
        });     

        Object.defineProperty(_my_proto_, "length", {
            enumerable: false,
            get: function() {
              return this.__raw.data.length;
            },
            set: function(value) {
              
            }
        }); 
    
        Object.defineProperty(_my_proto_, "_mosh", {
            enumerable: false,
            get: function() {
              return _data(this.__id);
            },
            set: function(value) {
              
            }
        });  
    
        Object.defineProperty(_my_proto_, "_merge", {
            enumerable: false,
            get: function() {
              var self = this;
              return function() {
                 var src = this._fork_src;
                 if(src) {
                     src._mosh.patch( src._mosh.diff( this._mosh ) );
                 }
              }
            },
            set: function(value) {
              
            }
        }); 
        Object.defineProperty(_my_proto_, "_fork", {
            enumerable: false,
            get: function() {
              var self = this;
              return function() {
                 var data = JSON.parse( JSON.stringify( self.__raw ) );
                 var plainData = objFromNs( data ),
                     newObj = _data( plainData );
                 
                 var oo = new containerObj( newObj );
                 Object.defineProperty(oo, "_fork_src", {
                        enumerable : false,
                        value : self
                 });
                 return oo;
              }
            },
            set: function(value) {
              
            }
        });      
        
          Object.defineProperty(_my_proto_, "_keys", {
            enumerable: false,
            get: function() {
              return Object.keys( this.__raw.data );
            },
            set: function(value) {
              
            }
          });    
        Object.defineProperty(_my_proto_, "onChange", {
            enumerable: false,
            get: function() {
            },
            set: function(listenerFn) {
                console.log("Setting listener for onChange ...");
                if(this.__chData && listenerFn) {
                    console.log("Setting listener for onChange ...");
                    this.__chData.on("cmd", listenerFn);
                }          
            }
        });  
        Object.defineProperty(_my_proto_, "__react", {
            enumerable: false,
            get: function() {
            },
            set: function(reactComponent) {
                this.onChange = function() {
                    reactComponent.forceUpdate();
                }          
            }
        });  
    
          Object.defineProperty(_my_proto_, "__raw", {
            enumerable: false,
            get: function() {
              return this.__chData._find(this.__id);
            },
            set: function(value) {
              
            }
          }); 
              Object.defineProperty(_my_proto_, "__treeTime", {
                enumerable: false,
                get: function() {
                  return this.__raw.__treeTime;
                },
                set: function(value) {
        
                }
              });   
              Object.defineProperty(_my_proto_, "__modTime", {
                enumerable: false,
                get: function() {
                  return this.__raw.__modTime;
                },
                set: function(value) {
                  
                }
              });
        var _workers_inited = false;
        var _nop_fn = function() {};
        
        Object.defineProperty( _my_proto_, "__defineData", {
           enumerable : false,
           value : function(chData, baseData) {
                
              var rawData;
             
              if(!_workers_inited) {
                  var toParent = function(o, fn) {
                      
                  }
                  chData.setWorkerCommands({
                       "_o_seto" : function(a, options) {
                           
                            var chData = options.chData;
                            var parentObj = chData._find( a[4] ),
                                prop = a[1],
                                setObj = chData._find( a[2] );
                                                    
                              Object.defineProperty(me, prop, {
                                  enumerable : true,
                                  configurable : true,
                                  value : new containerObj( chData, setObj )
                              });
    
                       },                   
                       "_o_push" : function(a, options) {
                           
                            var chData = options.chData;
                            var parentObj = chData._find( a[4] ),
                                insertedObj = chData._find( a[2] );                    
                            var toIndex = parseInt( a[1] );
                            var me = options.obj,
                                rawData = parentObj;
                            
                            if(rawData.data[toIndex] && (me.__id==a[4])) {
                                  Object.defineProperty(me, toIndex, {
                                    enumerable: true,
                                    configurable : true,
                                    value : new containerObj( chData, rawData.data[toIndex] )
                                  });
                            }
    
                       },
                       "_o_move" : function(a, options) {
                           
                           var chData = options.chData;
                           var parentObj = chData._find( a[4] ), // the parent object
                                len = parentObj.data.length,
                                targetObj;
                            
                            var oldIndex = null, i;
                            var targetObj = chData._find( a[1] );
                            i = oldIndex = parentObj.data.indexOf( targetObj );
    
                            var me = options.obj,
                                rawData = parentObj;

                            if(chData.isArray(rawData.data) && (parentObj.__id == me.__id)) {

                                var len = rawData.data.length;
                                
                                // just re-index the properties of the object
                                for(var i = 0; i < len; i++) {
                                    ( function(key) {
                                        Object.defineProperty(me, key, {
                                          configurable : true,
                                          enumerable : true,
                                          value : new containerObj( chData, rawData.data[key] )
                                        });         
                                    })(i);
                                }              
                            } 
    
                       },                   
                       "_o_rm" : function(a, options) {
                           var chData = options.chData;
                           var parentObj = chData._find( a[4] ),
                                removedItem = chData._find( a[2] ),
                                oldPosition = parseInt( a[1] );
    
                            var me = options.obj,
                                rawData = parentObj;
                            
                            if(me[oldPosition] ) {
                                if(chData.isArray(rawData.data)) {
                                    var len = rawData.data.length;
                                    for(var i = 0; i < len; i++) {
                                        ( function(key) {
                                            Object.defineProperty(me, key, {
                                              configurable : true,
                                              enumerable : true,
                                              value : new containerObj( chData, rawData.data[key] )
                                            });         
                                        })(i)
                                    }              
                                    delete me[len]; 
                                } else {
                                    if(rawData.data[oldPosition]) {
                                          delete me[oldPosition];
                                    }
                                }
                            }
                       }
                       });    
                  _workers_inited = true;
              }
              if(baseData) {
                  rawData = baseData;
              } else {
                  rawData = chData.getData();
              }
                 
              var me = this,
                  ms_elapsed = (new Date()).getTime(),
                  last_mod = (new Date()).getTime();
                  
              Object.defineProperty(me, "__id", {
                        enumerable: false,
                        value : rawData.__id
              });
              
              var worker_data = { chData : chData};
              
              chData.createWorker("_o_seto", [5, "*", null, null,  rawData.__id], { chData : chData, obj : me}); 
              chData.createWorker("_o_rm", [8, "*", null, null,  rawData.__id], { chData : chData, obj : me}); 
              chData.createWorker("_o_push", [7, "*", null, null,  rawData.__id], { chData : chData, obj : me}); 
              chData.createWorker("_o_move", [12, "*", null, null,  rawData.__id], { chData : chData, obj : me}); 
              
           
              Object.defineProperty(me, "__chData", {
                enumerable: false,
                value : chData
              });       
              
    
    
              if(chData.isArray( rawData.data ) ) {
                  Object.keys(rawData.data).forEach(
                      function(key) {
                          if(!chData.isObject(rawData.data[key])) {
                              // array with scalar values is not defined
                          } else {
                              if(rawData.data[key]) {
    
                                  Object.defineProperty(me, key, {
                                    enumerable: true,
                                    configurable : true,
                                    value : new containerObj( chData, rawData.data[key] )
                                  });

                              }
                          }
                      });
              } else {       
                  if(chData.isObject( rawData.data ) ) {
                      Object.keys(rawData.data).forEach(
                          function(key) {
                              if(!chData.isObject(rawData.data[key])) {
                                  try {
                                      if(!getters[key]) {
                                          getters[key] = function() {
                                            return this.__raw.data[key];
                                        }
                                      }
                                      Object.defineProperty(me, key, {
                                        enumerable: true,
                                        get: getters[key],
                                        set: _nop_fn
                                      });
                                  } catch(e) {
                                      console.log(e.message);
                                  }
                              } else {
                                  if(typeof(rawData.data[key]) != "undefined") {
            
                                      Object.defineProperty(me, key, {
                                          enumerable : true,
                                          configurable : true,
                                          value : new containerObj( chData, rawData.data[key] )
                                      });
                                  }
                              }
                          });
                  }
              }        
            }
        });
    }
 
    var __chCache = {};
    var containerObj = function(dataObj, rawBase) {
        var ch;
        if(dataObj.getChannelData) {
            ch = dataObj.getChannelData();
        } else {
            ch = dataObj;
        }
        if(!rawBase) rawBase = ch.getData();
        
        if(__chCache[rawBase.__id]) {
            return __chCache[rawBase.__id];
        }
        __chCache[rawBase.__id] = this;
        
        this.__defineData(ch, rawBase);
    }
    
    containerObj.prototype = new containerProto();
    
    var __amdDefs__ = {};
      (function () {
        if (typeof define !== "undefined" && define !== null && define.amd != null) {
          __amdDefs__["ujo"] = containerObj;
          this.ujo = containerObj;
        } else if (typeof module !== "undefined" && module !== null && module.exports != null) {
          module.exports["ujo"] = containerObj;
        } else {
          this.ujo = containerObj;
        }
      }).call(new Function("return this")());
    
      if (typeof define !== "undefined" && define !== null && define.amd != null) {
        define(__amdDefs__);
      }    

}).call(new Function("return this")());
