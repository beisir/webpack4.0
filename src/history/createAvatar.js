import flower  from "./flower.png";
function createAvatar() {
    var img = new Image();
    img.src = flower;
    img.classList.add('flower');

    document.querySelector('body').appendChild(img)

    
}
export default createAvatar;