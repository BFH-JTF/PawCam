import DocPouchClient from "docpouch-client";

const client = new DocPouchClient('https://docpouch.pantek.app', 80);
const ROOTPATH = "index.html"
const token = localStorage.getItem("authToken")
if (!token)
    window.location.replace(ROOTPATH)
client.setToken(token);
const users = await client.listUsers();
if (users.length === 0)
    window.location.replace(ROOTPATH)
document.body.style.display = ''; // show page