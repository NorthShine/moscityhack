try {
  chrome.devtools.panels.create(
    'Dev Tools',
    'fake-64.png',
    'src/pages/panel/index.html'
  );
} catch (e) {
  console.error(e);
}

export { };
