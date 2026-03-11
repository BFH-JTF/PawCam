import DocPouchClient from "docpouch-client";
const client = new DocPouchClient('https://docpouch.pantek.app', 80);
const ROOTPATH = "/PawCam/"
const token = localStorage.getItem('token');
if (!token)
    window.location.replace(ROOTPATH)

const users = await client.listUsers();
if (users.length === 0)
    window.location.replace(ROOTPATH)
document.body.style.display = ''; // reveal page