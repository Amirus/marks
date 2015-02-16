package main

const stylesContents = `/*
Color palette
0: #839496
1: #93a1a1
2: #eee8d5
3: #fdf6e3
*/

html, body {
  margin: 0; padding: 0;
  font-family: 'Courier New', sans-serif;
  font-size: 16px;
  background: #fdf6e3;
}

* {
  box-sizing: border-box;
}

img {
  max-width: 100%;
}

.btn {
  line-height: 20px;
  padding: 10px 15px;
  border: none;
  background: #859900;
  color: #fff;
  font-weight: bold;
  letter-spacing: 1px;
  cursor: pointer;
}
a.btn {
  text-decoration: none;
}
.btn.btn-delete {
  background: #dc322f;
}

a {
  color: #268bd2;
}

nav {
  background: #fdf6e3;
  position: absolute;
  top: 0; bottom: 0; left: 0;
  width: 270px;
}
nav header {
  background: #eee8d5;
  height: 70px;
  padding: 15px;
  line-height: 40px;
}
nav header h1 {
  margin: 0;
  color: #222;
  font-size: 32px;
}
nav header a {
  position: absolute;
  top: 15px; right: 15px;
  line-height: 40px;
}
nav ul {
  padding: 15px 0;
  list-style-type: none;
}
nav ul li {
  line-height: 20px;
  font-size: 18px;
  border-bottom: 2px solid #eee8d5;
}
nav ul li:first-child {
  border-top: 2px solid #eee8d5;
}
nav ul li a {
  display: block;
  padding: 15px;
  color: #222;
  text-decoration: none;
  transition: padding 200ms;
}
nav ul li a:hover {
  padding: 15px 5px 15px 25px;
}
nav footer {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  background: #eee8d5;
  color: #586e75;
  padding: 15px;
}

section {
  position: absolute;
  top: 0; bottom: 0; left: 270px;
  width: 800px;
  background: #002b36;
  overflow: auto;
}
section header {
  background: #073642;
  display: flex;
  height: 70px;
  padding: 15px;
  line-height: 40px;
}
section header input {
  flex: 1;
  height: 40px;
  padding: 8px 0;
  background: transparent;
  border: none;
  line-height: 22px;
  font-size: 22px;
  color: #657b83;
  border-bottom: 2px dashed #657b83;
  font-family: 'Courier New', sans-serif;
}
section header input:focus {
  outline: none;
  border-bottom: 2px solid #657b83;
}
section header .buttons {
  flex: 0 0 200px;
  text-align: right;
  height: 40px;
}
section .contents textarea {
  width: 100%;
  height: 100%;
  min-height: 800px;
  background: transparent;
  border: none;
}
section .contents .CodeMirror {
  height: calc(100vh - 70px);
}
section .contents .body {
  padding: 15px;
  color: #fff;
}
section .contents .body h1,
section .contents .body h2,
section .contents .body h3,
section .contents .body h4,
section .contents .body h5,
section .contents .body h6 {
  background: #073642;
  padding: 6px;
}
`
