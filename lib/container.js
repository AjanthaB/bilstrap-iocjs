"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Container = void 0;

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * @author Ajantha Bandara
 * @Date 22 Dec, 2019
 * @description - This is a IoC container for Typescipt
 */
var Container = /*#__PURE__*/function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJDb250YWluZXIiLCJzZXJ2aWNlTWFwIiwiTWFwIiwic2luZ2xldG9uTWFwIiwiaXNDbGFzcyIsImMiLCJjb25zb2xlIiwibG9nIiwibmFtZSIsImRlZmluaXRpb24iLCJkZXBlbmRlbmNpZXMiLCJpc1NpbmdsZXRvbiIsInNldCIsInNlcnZpY2UiLCJnZXQiLCJzaW5nbGV0b25JbnN0YW5jZSIsImNyZWF0ZUluc3RhbmNlIiwibWFwIiwiZGVwIiwicmVzb2x2ZURlcGVuZGVuY2llcyJdLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250YWluZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAYXV0aG9yIEFqYW50aGEgQmFuZGFyYVxuICogQERhdGUgMjIgRGVjLCAyMDE5XG4gKiBAZGVzY3JpcHRpb24gLSBUaGlzIGlzIGEgSW9DIGNvbnRhaW5lciBmb3IgVHlwZXNjaXB0XG4gKi9cblxuZXhwb3J0IGludGVyZmFjZSBJU2VydmljZVR5cGU8VD4ge1xuICBkZWZpbml0aW9uOiBUO1xuICBkZXBlbmRlbmNpZXM6IHN0cmluZ1tdO1xuICBpc1NpbmdsZXRvbj86IGJvb2xlYW47XG4gIG5hbWU6IHN0cmluZyB8IHN5bWJvbDtcbn1cblxuZXhwb3J0IGNsYXNzIENvbnRhaW5lciB7XG4gIHByaXZhdGUgc2VydmljZU1hcCA9IG5ldyBNYXA8c3RyaW5nIHwgc3ltYm9sLCBJU2VydmljZVR5cGU8YW55Pj4oKTtcbiAgcHJpdmF0ZSBzaW5nbGV0b25NYXAgPSBuZXcgTWFwPHN0cmluZyB8IHN5bWJvbCwgYW55PigpO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgY29uc29sZS5sb2coJ2luaXRpYWxpemluZyBJb0MgY29udGFpbmVyJyk7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXIobmFtZTogc3RyaW5nIHwgc3ltYm9sLCBkZWZpbml0aW9uOiBhbnksIGRlcGVuZGVuY2llczogYW55W10sIGlzU2luZ2xldG9uID0gZmFsc2UpIHtcbiAgICB0aGlzLnNlcnZpY2VNYXAuc2V0KG5hbWUsIHsgZGVmaW5pdGlvbiwgZGVwZW5kZW5jaWVzLCBpc1NpbmdsZXRvbiwgbmFtZSB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQobmFtZTogc3RyaW5nIHwgc3ltYm9sKTogYW55IHtcbiAgICBjb25zdCBzZXJ2aWNlID0gdGhpcy5zZXJ2aWNlTWFwLmdldChuYW1lKTtcblxuICAgIGlmIChzZXJ2aWNlICYmIHRoaXMuaXNDbGFzcyhzZXJ2aWNlLmRlZmluaXRpb24pKSB7XG4gICAgICAvLyBjbGFzc1xuICAgICAgaWYgKHNlcnZpY2UuaXNTaW5nbGV0b24pIHtcbiAgICAgICAgbGV0IHNpbmdsZXRvbkluc3RhbmNlID0gdGhpcy5zaW5nbGV0b25NYXAuZ2V0KHNlcnZpY2UubmFtZSk7XG4gICAgICAgIGlmICghc2luZ2xldG9uSW5zdGFuY2UpIHtcbiAgICAgICAgICBzaW5nbGV0b25JbnN0YW5jZSA9IHRoaXMuY3JlYXRlSW5zdGFuY2Uoc2VydmljZSk7XG4gICAgICAgICAgdGhpcy5zaW5nbGV0b25NYXAuc2V0KHNlcnZpY2UubmFtZSwgc2luZ2xldG9uSW5zdGFuY2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzaW5nbGV0b25JbnN0YW5jZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUluc3RhbmNlKHNlcnZpY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc2VydmljZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlc29sdmVEZXBlbmRlbmNpZXM8VD4oc2VydmljZTogSVNlcnZpY2VUeXBlPFQ+KTogVFtdIHtcbiAgICBsZXQgZGVwZW5kZW5jaWVzOiBUW10gPSBbXTtcbiAgICBpZiAoc2VydmljZS5kZXBlbmRlbmNpZXMpIHtcbiAgICAgIGRlcGVuZGVuY2llcyA9IHNlcnZpY2UuZGVwZW5kZW5jaWVzLm1hcCgoZGVwOiBhbnkpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KGRlcCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGRlcGVuZGVuY2llcztcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlSW5zdGFuY2Uoc2VydmljZTogSVNlcnZpY2VUeXBlPGFueT4pIHtcbiAgICByZXR1cm4gbmV3IHNlcnZpY2UuZGVmaW5pdGlvbiguLi50aGlzLnJlc29sdmVEZXBlbmRlbmNpZXMoc2VydmljZSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0NsYXNzID0gKGM6IGFueSkgPT4gdHlwZW9mIGMgPT09ICdmdW5jdGlvbic7XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0lBU2FBLFM7RUFJWCxxQkFBYztJQUFBOztJQUFBLEtBSE5DLFVBR00sR0FITyxJQUFJQyxHQUFKLEVBR1A7SUFBQSxLQUZOQyxZQUVNLEdBRlMsSUFBSUQsR0FBSixFQUVUOztJQUFBLEtBMENORSxPQTFDTSxHQTBDSSxVQUFDQyxDQUFEO01BQUEsT0FBWSxPQUFPQSxDQUFQLEtBQWEsVUFBekI7SUFBQSxDQTFDSjs7SUFDWjtJQUNBQyxPQUFPLENBQUNDLEdBQVIsQ0FBWSw0QkFBWjtFQUNEOzs7O1dBRUQsa0JBQWdCQyxJQUFoQixFQUF1Q0MsVUFBdkMsRUFBd0RDLFlBQXhELEVBQWtHO01BQUEsSUFBckJDLFdBQXFCLHVFQUFQLEtBQU87TUFDaEcsS0FBS1YsVUFBTCxDQUFnQlcsR0FBaEIsQ0FBb0JKLElBQXBCLEVBQTBCO1FBQUVDLFVBQVUsRUFBVkEsVUFBRjtRQUFjQyxZQUFZLEVBQVpBLFlBQWQ7UUFBNEJDLFdBQVcsRUFBWEEsV0FBNUI7UUFBeUNILElBQUksRUFBSkE7TUFBekMsQ0FBMUI7SUFDRDs7O1dBRUQsYUFBV0EsSUFBWCxFQUF1QztNQUNyQyxJQUFNSyxPQUFPLEdBQUcsS0FBS1osVUFBTCxDQUFnQmEsR0FBaEIsQ0FBb0JOLElBQXBCLENBQWhCOztNQUVBLElBQUlLLE9BQU8sSUFBSSxLQUFLVCxPQUFMLENBQWFTLE9BQU8sQ0FBQ0osVUFBckIsQ0FBZixFQUFpRDtRQUMvQztRQUNBLElBQUlJLE9BQU8sQ0FBQ0YsV0FBWixFQUF5QjtVQUN2QixJQUFJSSxpQkFBaUIsR0FBRyxLQUFLWixZQUFMLENBQWtCVyxHQUFsQixDQUFzQkQsT0FBTyxDQUFDTCxJQUE5QixDQUF4Qjs7VUFDQSxJQUFJLENBQUNPLGlCQUFMLEVBQXdCO1lBQ3RCQSxpQkFBaUIsR0FBRyxLQUFLQyxjQUFMLENBQW9CSCxPQUFwQixDQUFwQjtZQUNBLEtBQUtWLFlBQUwsQ0FBa0JTLEdBQWxCLENBQXNCQyxPQUFPLENBQUNMLElBQTlCLEVBQW9DTyxpQkFBcEM7VUFDRDs7VUFDRCxPQUFPQSxpQkFBUDtRQUNEOztRQUNELE9BQU8sS0FBS0MsY0FBTCxDQUFvQkgsT0FBcEIsQ0FBUDtNQUNELENBWEQsTUFXTztRQUNMLE9BQU9BLE9BQVA7TUFDRDtJQUNGOzs7V0FFRCw2QkFBK0JBLE9BQS9CLEVBQThEO01BQUE7O01BQzVELElBQUlILFlBQWlCLEdBQUcsRUFBeEI7O01BQ0EsSUFBSUcsT0FBTyxDQUFDSCxZQUFaLEVBQTBCO1FBQ3hCQSxZQUFZLEdBQUdHLE9BQU8sQ0FBQ0gsWUFBUixDQUFxQk8sR0FBckIsQ0FBeUIsVUFBQ0MsR0FBRCxFQUFjO1VBQ3BELE9BQU8sS0FBSSxDQUFDSixHQUFMLENBQVNJLEdBQVQsQ0FBUDtRQUNELENBRmMsQ0FBZjtNQUdEOztNQUNELE9BQU9SLFlBQVA7SUFDRDs7O1dBRUQsd0JBQXVCRyxPQUF2QixFQUFtRDtNQUNqRCxrQkFBV0EsT0FBTyxDQUFDSixVQUFuQixxQkFBaUMsS0FBS1UsbUJBQUwsQ0FBeUJOLE9BQXpCLENBQWpDO0lBQ0QifQ==