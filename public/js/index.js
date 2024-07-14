function ImageSelector(id)
{

    const imagesection=document.getElementById(id);
    const image=imagesection.firstElementChild.src;
    const button=imagesection.lastElementChild;
    const overlay=document.querySelector('.overlaypreview');
    let overlayimage=overlay.lastElementChild.src;
    button.addEventListener('click',()=>{
        overlay.style.display="flex";
          overlay.lastElementChild.src=image;
    })
   
}

const cross=document.querySelector('.cross');
const overlay=document.querySelector('.overlaypreview');
cross.addEventListener('click',()=>{
  overlay.style.display="none";
});