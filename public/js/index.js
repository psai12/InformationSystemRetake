window.onload=()=>{
  if(window.location.pathname==='/cart')
  {

    const section=document.querySelector('.section');
    const cart=JSON.parse(sessionStorage.getItem("cart"));
    
    if(cart.length===0)
    {
      const emptytext=document.querySelector('.emptytext');
      emptytext.style.display="flex";
      return;
    }
    cart.map((item)=>{

      const booksubsection=document.createElement('div')
      booksubsection.classList.add('booksubsection');
      const img=document.createElement('img');
      const text=document.createElement('h3');
      const button=document.createElement('button');

      img.src=item.img;
      text.innerText=item.h3;
      button.innerText=('Remove from cart!');
      button.addEventListener('click',()=>RemoveFromCart(item));
      booksubsection.append(img,text,button);
      section.append(booksubsection);
 
    });

  }
}

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
        });
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
   
    
    const existing=cart.some(e=>e.img==obj.img && e.h3== obj.h3)

    if(!existing)
    {
      alert("Item added to cart!");
      cart.push(obj);
    }
    else
    {
      alert("User can purchase 1 book at a time")
    }
    sessionStorage.setItem("cart",JSON.stringify(cart));
}

const search=document.querySelector('#search');

const storedbooks=document.querySelector('.storedbooks');
const searchedbooks=document.querySelector('.searchbooks');

storedbooks.style.display="block";
searchedbooks.style.display="none";
search.addEventListener('input',(e)=>{
  storedbooks.style.display="none";
  searchedbooks.style.display="block";
   fetch(`/search/${e.target.value}`,{method:'GET'})
   .then(res=> { if (!res.ok) {
    throw new Error('Network response was not ok');
         }
    return res.json();})
   .then(products=>
    {
      const container = searchedbooks.querySelector('.booksection');
      container.innerHTML = ''; // Clear previous search results

      products.forEach(product => {
        // Create elements for each product
        const div = document.createElement('div');
        div.classList.add('booksubsection'); // Remove dot from classList.add()

        const img = document.createElement('img');
        img.src = product.imgpath;
        div.appendChild(img);

        const price = document.createElement('h3');
        price.innerText = product.price;
        div.appendChild(price);

        const name = document.createElement('h4');
        name.innerText = product.name;
        div.appendChild(name);

        // Add more elements as needed (e.g., description, buttons)

        // Append the created div to the container
        container.appendChild(div);})

        // console.log(products,container);
        // container.innerHTML = ''; 
        // products.forEach(product => {
        //     const productDiv = document.createElement('div');
        //     productDiv.innerHTML = `
        //         <div class="imgsection" id="col">
        //         <h4>${product.name}</h4>
        //         <img src="${product.imgpath}" alt="${product.name}">
        //         <p>Price: ${product.price}</p>
        //            <button onclick="cartFunction('${product.name}')">Add Cart</button>
        //         </div>
        //     `
        //     container.appendChild(productDiv);});
   
          
    }).catch(e=>console.log('err',e));

});

function RemoveFromCart(element)
{
   const cart=JSON.parse(sessionStorage.getItem('cart'));
   console.log('before',cart)
  const filterCart= cart.filter(e=>e.img!==element.img && e.h3 !==element.h3 )
  
  sessionStorage.setItem('cart',JSON.stringify(filterCart));
   window.location.reload();
}
