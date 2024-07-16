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
    const img=element.querySelectorAll('img')[1].src;
    const h3=element.querySelector('h3').innerText;

    const obj={img,h3};
   
    
    const existing=cart.some(e=>e.img==cart.img && e.h3== cart.h3)

    if(!existing)
      cart.push(obj);

    sessionStorage.setItem("cart",JSON.stringify(cart));
    console.log(cart);
}