document.querySelector('#clear').onclick = function(e) {
  document.querySelector('#contents').innerHTML =
      '<iframe src="data:text/html,<h1>local frame</h1>"></iframe>';
};
