const typess = require('@babel/types');
const get = require('lodash/get');
const components_counter = {};
const createReactJsxProps = function ({ types }) {
  let _opts = {};
  const Program = {
    enter(path,{ opts = {} }) {
      _opts = opts;
    },
    exit() {
    },
  };
  const ret = {
    visitor: { Program },
  };
  ret.visitor = {
    ...ret.visitor,
    JSXOpeningElement: function (path,state) {
      const node = path.node;
      var _name = get(node,'name.name','');
      const file = get(state,'file.opts.filename','');
      const _opts_components = get(_opts,'components',[]);
      if (Array.isArray(_opts_components)) {
        _opts_components.map((item) => {
          if (get(item,'name') === _name) {
            const _start = get(node,'name.start');
            const _end = get(node,'name.end');
            const _patch = `${file}/${_start}/${_end}`;
            if (!components_counter[_name]) {
              components_counter[_name] = [];
            }
            const _index = components_counter[_name].findIndex((i) => i.path === _patch);
            if (_index < 0) {
              components_counter[_name].push({ path: _patch,index: components_counter[_name].length });
            }
            const props = typess.jsxIdentifier(get(item,'props'));
            const value = types.stringLiteral(get(item,'value','') || `${file}/${components_counter[_name][_index].index}`);
            const _jsxAttribute = typess.jsxAttribute(props,value);
            path.node.attributes.push(_jsxAttribute);
            components_counter[_name].splice(_index,1);
          }
        })
      }
    }
  }

  return ret;
}
module.exports = createReactJsxProps;
