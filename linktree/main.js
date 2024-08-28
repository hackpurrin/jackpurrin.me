import { links } from "./links.js";

const linkContainer = document.getElementById("links");

function addLink(name, link, image) {
    return `
  <a href="${link}" class="link" target="blank">
    <img src="${image}"/>
    <span>${name}  </span>
    <img class="linkIcon" src="link-solid.svg" alt=""/>
  </a>
  `;
}

let allLinks = "";

links.forEach((ele) => {
    let link = ele.link;
    let name = ele.name;
    let image = ele.image;

    allLinks += addLink(name, link, image);
});

linkContainer.innerHTML = allLinks;
