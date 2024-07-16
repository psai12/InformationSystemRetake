function ImageSelector(id,value=false)
{

    const imagesection=document.getElementById(id);
    const image=imagesection.firstElementChild.src;
    console.log(image)
    const button=imagesection.lastElementChild;
    const overlay=document.querySelector('.overlaypreview');
    let overlayimage=overlay.lastElementChild.src;
    let price=imagesection.querySelector('h3').innerText;
    if(value)
    {
        button.addEventListener('click',()=>{
            overlay.style.display="flex";
              overlay.querySelectorAll('img')[1].src=image;
              overlay.querySelector('h3').innerText=price;
        })
    }

   
}

const cross=document.querySelector('.cross');
const overlay=document.querySelector('.overlaypreview');
cross.addEventListener('click',()=>{
  overlay.style.display="none";
});


let cart=[]
function AddToCart(element)
{
    const img=element.querySelectorAll('img')[1];
    const h3=element.querySelector('h3');

    const obj={img,h3};


}