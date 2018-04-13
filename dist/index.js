var t={match:function(t){var n=Object.keys(t);if(function(t,n){if(n.length!==t.length)return!0;for(var r in n)if(n[r]!==t[r])return!0;return!1}(n.sort(),this.__cases__))throw new Error("You need to provide cases for all of: "+this.__cases__.join(", ")+", but instead provided "+n.join(", "));return t[this.__name].apply(t,this.value)},toString:function(){return this.__name+(this.__fields?"("+this.value.map(function(t){return t.toString()}).join(", ")+")":"")}},n={match:function(t){return function(n){return n.match(t)}}},r={};function u(r,u,i){function e(t,n,r){if(this.__name=t,this.__fields=n.length,r.length!==this.__fields)throw new Error("Not enough fields provided for "+t+", was expecting "+this.__fields+" value"+(1!==this.__fields?"s":"")+" but received: "+r.join(", "));r.forEach(function(t,n){if(null==t)throw new Error("Argument "+n+" was provided a null value: "+t)}),this.value=r}Object.assign(e.prototype,u,t);var o=Object.keys(r).sort();return e.prototype.__cases__=o,Object.assign(e,i,n),o.forEach(function(t){e[t]=function(){for(var n=[],u=arguments.length;u--;)n[u]=arguments[u];return new e(t,r[t],n)}}),e}var i=u({Just:[r],Nothing:[]},{withDefault:function(t){return this.match({Just:function(t){return t},Nothing:function(n){return t}})},map:function(t){var n=this;return this.match({Just:function(n){return i.Just(t(n))},Nothing:function(t){return n}})},andThen:function(t){var n=this;return this.match({Just:function(n){return t(n)},Nothing:function(t){return n}})},unwrap:function(){return this.match({Just:function(t){return t},Nothing:function(t){return null}})}},{from:function(t){return null!=t?i.Just(t):i.Nothing()},map:function(t){for(var n=[],r=arguments.length-1;r-- >0;)n[r]=arguments[r+1];var u=[];for(var e in n){var o=n[e].unwrap();if(null==o)return i.Nothing();u.push(o)}return i.Just(t.apply(void 0,u))}}),e=u({Ok:[r],Err:[r]},{withDefault:function(t){return this.match({Ok:function(t){return t},Err:function(n){return t}})},map:function(t){var n=this;return this.match({Ok:function(n){return e.Ok(t(n))},Err:function(t){return n}})},mapError:function(t){var n=this;return this.match({Ok:function(t){return n},Err:function(n){return e.Err(t(n))}})},andThen:function(t){var n=this;return this.match({Ok:function(n){return t(n)},Err:function(t){return n}})},toMaybe:function(){return this.match({Ok:function(t){return i.Just(t)},Err:function(t){return i.Nothing()}})},unwrap:function(){return this.match({Ok:function(t){return t},Err:function(t){throw t}})}},{try:function(t){try{return e.Ok(t())}catch(t){return e.Err(t)}},fromMaybe:function(t,n){return n.match({Just:function(t){return e.Ok(t)},Nothing:function(n){return e.Err(t)}})},fromPromise:function(t){return t.then(function(t){return e.Ok(t)}).catch(function(t){return e.Err(t)})},map:function(t){for(var n=[],r=arguments.length-1;r-- >0;)n[r]=arguments[r+1];var u=[];for(var i in n)try{u.push(n[i].unwrap())}catch(t){return e.Err(t)}return e.Ok(t.apply(void 0,u))}});exports.Maybe=i,exports.Result=e,exports._=r,exports.Type=u;
//# sourceMappingURL=index.js.map
