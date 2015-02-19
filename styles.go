package main

const stylesContents = `
html, body {
  margin: 0; padding: 0;
  font-family: 'Helvetica', sans-serif;
  font-size: 16px;
  background: #ecf0f1;
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
  background: #27ae60;
  color: #fff;
  font-weight: bold;
  letter-spacing: 1px;
  cursor: pointer;
  display: inline-block;
}
a.btn {
  text-decoration: none;
}
buttons.btn {
  font-family: 'Helvetica', sans-serif;
}
.btn.btn-delete {
  background: #c0392b;
}
.btn.btn-default {
  background: #555;
}

a {
  color: #268bd2;
}

nav {
  background: #9b59b6;
  position: absolute;
  top: 0; bottom: 0; left: 0;
  width: 270px;
}
nav header {
  background: #8e44ad;
  height: 70px;
  padding: 15px;
  line-height: 40px;
}
nav header h1 {
  margin: 0;
  color: #fff;
  font-size: 32px;
}
nav header a {
  position: absolute;
  top: 15px; right: 15px;
  line-height: 40px;
  color: #eee;
  font-size: 18px;
}
nav ul {
  padding: 15px 0;
  list-style-type: none;
}
nav ul li {
  line-height: 20px;
  font-size: 18px;
  border-bottom: 2px solid #8e44ad;
}
nav ul li:first-child {
  border-top: 2px solid #8e44ad;
}
nav ul li a {
  display: block;
  padding: 15px;
  color: #fff;
  text-decoration: none;
  transition: padding 200ms;
}
nav ul li a:hover {
  padding: 15px 5px 15px 25px;
}
nav footer {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  background: #8e44ad;
  color: #ecf0f1;
  padding: 15px;
}
nav footer a {
  color: #ecf0f1;
}

section {
  position: absolute;
  top: 0; bottom: 0; left: 270px;
  width: 800px;
  background: #fff;
  overflow: auto;
}
section header {
  background: #bdc3c7;
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
  color: #2c3e50;
  border-bottom: 2px dashed #2c3e50;
  font-family: 'Helvetica', sans-serif;
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
  color: #2c3e50;
}
section .contents .body p, section .contents .body li {
  font-size: 18px;
}
section .contents .body h1,
section .contents .body h2,
section .contents .body h3,
section .contents .body h4,
section .contents .body h5,
section .contents .body h6 {
  background: #ecf0f1;
  padding: 6px;
}
`
