(async () => {
  if (!document) return;

  const script = document.querySelector('script[data-trustbadge-id]');
  if (!script) return;

  let API_ORIGIN;
  const PATH = '/api/trustbadge';

  try {
    const source = script.src;
    const url = new URL(source);
    API_ORIGIN = url.origin;
  } catch (err) {
    console.error(err);
    return;
  }

  if (!API_ORIGIN) return;

  const id = script.getAttribute('data-trustbadge-id');
  if (!id) return;

  try {
    const res = await fetch(API_ORIGIN + PATH + '?id=' + id, {
      mode: 'cors',
      method: 'GET',
    });
    if (res.status !== 200) return;
  } catch (err) {
    console.log(err);
    return;
  }

  const node = document.querySelector('div.__trustbadge__');
  if (!node) return;

  const wrapper = document.createElement('div');
  wrapper.style = `
    display: -webkit-inline-box;
    display: -webkit-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    background-color: transparent;
    outline: 0;
    border: 0;
    margin: 0;
    border-radius: 0;
    padding: 0;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    vertical-align: middle;
    -moz-appearance: none;
    -webkit-appearance: none;
    -webkit-text-decoration: none;
    text-decoration: none;
    color: inherit;
    font-family: Commissioner,sans-serif;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.75;
    text-transform: uppercase;
    min-width: 64px;
    padding: 0 16px;
    border-radius: 4px;
    -webkit-transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    color: #fff;
    background-color: #6f6af8;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    background: linear-gradient( to bottom right, #ff7d7d, #ff0076 );
    position: relative;
    box-shadow: none;
    gap: 5px;
  `;
  node.appendChild(wrapper);

  const image = new Image();
  image.style = `
    height: 40px;
  `;
  image.src = 'data:image/png;base64,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';
  wrapper.appendChild(image);

  const text = document.createElement('p');
  text.innerText = "Trusted by NorthShine";
  wrapper.appendChild(text);
})();