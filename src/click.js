async function handleClick () {
    const element = document.createElement('div');
    const {default: _} = await import(/* webpackChunkName:"lodash" */'lodash');
    element.innerHTML = _.join(['a', 'b', 'c'], 'xxx');
    document.body.appendChild(element);
}
export default handleClick;