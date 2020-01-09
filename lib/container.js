"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Container = void 0;

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @author Ajantha Bandara
 * @Date 22 Dec, 2019
 * @description - This is a IoC container for Typescipt
 */
var Container =
/*#__PURE__*/
function () {
  function Container() {
    _classCallCheck(this, Container);

    this.serviceMap = new Map();
    this.singletonMap = new Map();

    this.isClass = function (c) {
      return typeof c === 'function';
    };

    // tslint:disable-next-line:no-console
    console.log('initializing IoC container');
  }

  _createClass(Container, [{
    key: "register",
    value: function register(name, definition, dependencies) {
      var isSingleton = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      this.serviceMap.set(name, {
        definition: definition,
        dependencies: dependencies,
        isSingleton: isSingleton,
        name: name
      });
    }
  }, {
    key: "get",
    value: function get(name) {
      var service = this.serviceMap.get(name);

      if (service && this.isClass(service.definition)) {
        // class
        if (service.isSingleton) {
          var singletonInstance = this.singletonMap.get(service.name);

          if (!singletonInstance) {
            singletonInstance = this.createInstance(service);
            this.singletonMap.set(service.name, singletonInstance);
          }

          return singletonInstance;
        }

        return this.createInstance(service);
      } else {
        return service;
      }
    }
  }, {
    key: "resolveDependencies",
    value: function resolveDependencies(service) {
      var _this = this;

      var dependencies = [];

      if (service.dependencies) {
        dependencies = service.dependencies.map(function (dep) {
          return _this.get(dep);
        });
      }

      return dependencies;
    }
  }, {
    key: "createInstance",
    value: function createInstance(service) {
      return _construct(service.definition, _toConsumableArray(this.resolveDependencies(service)));
    }
  }]);

  return Container;
}();

exports.Container = Container;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250YWluZXIudHMiXSwibmFtZXMiOlsiQ29udGFpbmVyIiwic2VydmljZU1hcCIsIk1hcCIsInNpbmdsZXRvbk1hcCIsImlzQ2xhc3MiLCJjIiwiY29uc29sZSIsImxvZyIsIm5hbWUiLCJkZWZpbml0aW9uIiwiZGVwZW5kZW5jaWVzIiwiaXNTaW5nbGV0b24iLCJzZXQiLCJzZXJ2aWNlIiwiZ2V0Iiwic2luZ2xldG9uSW5zdGFuY2UiLCJjcmVhdGVJbnN0YW5jZSIsIm1hcCIsImRlcCIsInJlc29sdmVEZXBlbmRlbmNpZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7OztJQWFhQSxTOzs7QUFJWCx1QkFBYztBQUFBOztBQUFBLFNBSE5DLFVBR00sR0FITyxJQUFJQyxHQUFKLEVBR1A7QUFBQSxTQUZOQyxZQUVNLEdBRlMsSUFBSUQsR0FBSixFQUVUOztBQUFBLFNBeUNORSxPQXpDTSxHQXlDSSxVQUFDQyxDQUFEO0FBQUEsYUFBWSxPQUFPQSxDQUFQLEtBQWEsVUFBekI7QUFBQSxLQXpDSjs7QUFDWjtBQUNBQyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSw0QkFBWjtBQUNEOzs7OzZCQUVlQyxJLEVBQXVCQyxVLEVBQWlCQyxZLEVBQTBDO0FBQUEsVUFBckJDLFdBQXFCLHVFQUFQLEtBQU87QUFDaEcsV0FBS1YsVUFBTCxDQUFnQlcsR0FBaEIsQ0FBb0JKLElBQXBCLEVBQTBCO0FBQUVDLFFBQUFBLFVBQVUsRUFBVkEsVUFBRjtBQUFjQyxRQUFBQSxZQUFZLEVBQVpBLFlBQWQ7QUFBNEJDLFFBQUFBLFdBQVcsRUFBWEEsV0FBNUI7QUFBeUNILFFBQUFBLElBQUksRUFBSkE7QUFBekMsT0FBMUI7QUFDRDs7O3dCQUVVQSxJLEVBQTRCO0FBQ3JDLFVBQU1LLE9BQU8sR0FBRyxLQUFLWixVQUFMLENBQWdCYSxHQUFoQixDQUFvQk4sSUFBcEIsQ0FBaEI7O0FBRUEsVUFBSUssT0FBTyxJQUFJLEtBQUtULE9BQUwsQ0FBYVMsT0FBTyxDQUFDSixVQUFyQixDQUFmLEVBQWlEO0FBQUU7QUFDakQsWUFBSUksT0FBTyxDQUFDRixXQUFaLEVBQXlCO0FBQ3ZCLGNBQUlJLGlCQUFpQixHQUFHLEtBQUtaLFlBQUwsQ0FBa0JXLEdBQWxCLENBQXNCRCxPQUFPLENBQUNMLElBQTlCLENBQXhCOztBQUNBLGNBQUksQ0FBQ08saUJBQUwsRUFBd0I7QUFDdEJBLFlBQUFBLGlCQUFpQixHQUFHLEtBQUtDLGNBQUwsQ0FBb0JILE9BQXBCLENBQXBCO0FBQ0EsaUJBQUtWLFlBQUwsQ0FBa0JTLEdBQWxCLENBQXNCQyxPQUFPLENBQUNMLElBQTlCLEVBQW9DTyxpQkFBcEM7QUFDRDs7QUFDRCxpQkFBT0EsaUJBQVA7QUFDRDs7QUFDRCxlQUFPLEtBQUtDLGNBQUwsQ0FBb0JILE9BQXBCLENBQVA7QUFDRCxPQVZELE1BVU87QUFDTCxlQUFPQSxPQUFQO0FBQ0Q7QUFDRjs7O3dDQUU4QkEsTyxFQUErQjtBQUFBOztBQUM1RCxVQUFJSCxZQUFpQixHQUFHLEVBQXhCOztBQUNBLFVBQUlHLE9BQU8sQ0FBQ0gsWUFBWixFQUEwQjtBQUN4QkEsUUFBQUEsWUFBWSxHQUFHRyxPQUFPLENBQUNILFlBQVIsQ0FBcUJPLEdBQXJCLENBQXlCLFVBQUNDLEdBQUQsRUFBYztBQUNwRCxpQkFBTyxLQUFJLENBQUNKLEdBQUwsQ0FBU0ksR0FBVCxDQUFQO0FBQ0QsU0FGYyxDQUFmO0FBR0Q7O0FBQ0QsYUFBT1IsWUFBUDtBQUNEOzs7bUNBRXNCRyxPLEVBQTRCO0FBQ2pELHdCQUFXQSxPQUFPLENBQUNKLFVBQW5CLHFCQUFpQyxLQUFLVSxtQkFBTCxDQUF5Qk4sT0FBekIsQ0FBakM7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGF1dGhvciBBamFudGhhIEJhbmRhcmFcbiAqIEBEYXRlIDIyIERlYywgMjAxOVxuICogQGRlc2NyaXB0aW9uIC0gVGhpcyBpcyBhIElvQyBjb250YWluZXIgZm9yIFR5cGVzY2lwdFxuICovXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNlcnZpY2VUeXBlPFQ+IHtcbiAgZGVmaW5pdGlvbjogVDtcbiAgZGVwZW5kZW5jaWVzOiBzdHJpbmdbXTtcbiAgaXNTaW5nbGV0b24/OiBib29sZWFuO1xuICBuYW1lOiBzdHJpbmcgfCBzeW1ib2w7XG59XG5cbmV4cG9ydCBjbGFzcyBDb250YWluZXIge1xuICBwcml2YXRlIHNlcnZpY2VNYXAgPSBuZXcgTWFwPHN0cmluZyB8IHN5bWJvbCwgSVNlcnZpY2VUeXBlPGFueT4+KCk7XG4gIHByaXZhdGUgc2luZ2xldG9uTWFwID0gbmV3IE1hcDxzdHJpbmcgfCBzeW1ib2wsIGFueT4oKTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgIGNvbnNvbGUubG9nKCdpbml0aWFsaXppbmcgSW9DIGNvbnRhaW5lcicpO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyKG5hbWU6IHN0cmluZyB8IHN5bWJvbCwgZGVmaW5pdGlvbjogYW55LCBkZXBlbmRlbmNpZXM6IGFueVtdLCBpc1NpbmdsZXRvbiA9IGZhbHNlKSB7XG4gICAgdGhpcy5zZXJ2aWNlTWFwLnNldChuYW1lLCB7IGRlZmluaXRpb24sIGRlcGVuZGVuY2llcywgaXNTaW5nbGV0b24sIG5hbWUgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0KG5hbWU6IHN0cmluZyB8IHN5bWJvbCk6IGFueSB7XG4gICAgY29uc3Qgc2VydmljZSA9IHRoaXMuc2VydmljZU1hcC5nZXQobmFtZSk7XG5cbiAgICBpZiAoc2VydmljZSAmJiB0aGlzLmlzQ2xhc3Moc2VydmljZS5kZWZpbml0aW9uKSkgeyAvLyBjbGFzc1xuICAgICAgaWYgKHNlcnZpY2UuaXNTaW5nbGV0b24pIHtcbiAgICAgICAgbGV0IHNpbmdsZXRvbkluc3RhbmNlID0gdGhpcy5zaW5nbGV0b25NYXAuZ2V0KHNlcnZpY2UubmFtZSk7XG4gICAgICAgIGlmICghc2luZ2xldG9uSW5zdGFuY2UpIHtcbiAgICAgICAgICBzaW5nbGV0b25JbnN0YW5jZSA9IHRoaXMuY3JlYXRlSW5zdGFuY2Uoc2VydmljZSk7XG4gICAgICAgICAgdGhpcy5zaW5nbGV0b25NYXAuc2V0KHNlcnZpY2UubmFtZSwgc2luZ2xldG9uSW5zdGFuY2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzaW5nbGV0b25JbnN0YW5jZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUluc3RhbmNlKHNlcnZpY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc2VydmljZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlc29sdmVEZXBlbmRlbmNpZXM8VD4oc2VydmljZTogSVNlcnZpY2VUeXBlPFQ+KTogVFtdIHtcbiAgICBsZXQgZGVwZW5kZW5jaWVzOiBUW10gPSBbXTtcbiAgICBpZiAoc2VydmljZS5kZXBlbmRlbmNpZXMpIHtcbiAgICAgIGRlcGVuZGVuY2llcyA9IHNlcnZpY2UuZGVwZW5kZW5jaWVzLm1hcCgoZGVwOiBhbnkpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KGRlcCk7XG4gICAgICB9KVxuICAgIH1cbiAgICByZXR1cm4gZGVwZW5kZW5jaWVzO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVJbnN0YW5jZShzZXJ2aWNlOiBJU2VydmljZVR5cGU8YW55Pikge1xuICAgIHJldHVybiBuZXcgc2VydmljZS5kZWZpbml0aW9uKC4uLnRoaXMucmVzb2x2ZURlcGVuZGVuY2llcyhzZXJ2aWNlKSk7XG4gIH1cblxuICBwcml2YXRlIGlzQ2xhc3MgPSAoYzogYW55KSA9PiB0eXBlb2YgYyA9PT0gJ2Z1bmN0aW9uJztcbn0iXX0=