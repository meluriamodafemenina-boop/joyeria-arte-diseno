let products=[], cart=JSON.parse(localStorage.getItem('arteCart')||'[]');
const $=s=>document.querySelector(s); const grid=$('#grid');
fetch('products.json').then(r=>r.json()).then(p=>{products=p;render(p);updateCart()});
function render(list){grid.innerHTML=list.map(p=>`<article class="card"><img src="${p.images[0]}" alt="${p.name}"><h3>${p.name}</h3><p>${p.brand} · ${p.gender} · Consultar precio</p><div class="actions"><button onclick="view('${p.id}')">Ver producto</button><button onclick="add('${p.id}')">+ Carrito</button></div></article>`).join('')||'<p class="empty">No encontramos productos con esa búsqueda.</p>'}
function apply(){let q=$('#search').value.toLowerCase().trim();render(products.filter(p=>[p.name,p.brand,p.gender,p.category,...p.specs].join(' ').toLowerCase().includes(q)))}
$('#search').addEventListener('input',apply);
$('#search').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();apply();location.hash='productos'}});
$('#searchBtn').onclick=()=>{apply();location.hash='productos'};
document.querySelectorAll('[data-filter]').forEach(x=>x.onclick=()=>{$('#search').value=x.dataset.filter;apply();location.hash='productos'});
function view(id){let p=products.find(x=>x.id===id);$('#modalContent').innerHTML=`<div class="detail"><div><img id="mainImg" class="gallery-main" src="${p.images[0]}"><div class="thumbs">${p.images.map(i=>`<img src="${i}" onclick="mainImg.src=this.src">`).join('')}</div></div><div><p class="eyebrow">${p.brand.toUpperCase()}</p><h2>${p.name}</h2><p>Consultar precio y disponibilidad.</p><ul>${p.specs.map(s=>`<li>${s}</li>`).join('')}</ul><button class="gold" onclick="add('${p.id}')">AÑADIR AL CARRITO</button><br><a class="gold" href="${waLink([p])}">CONSULTAR POR WHATSAPP</a></div></div>`;$('#modal').classList.add('show')}
function closeModal(){$('#modal').classList.remove('show')}
function add(id){if(!cart.includes(id))cart.push(id);localStorage.setItem('arteCart',JSON.stringify(cart));updateCart();$('#cart').classList.add('open')}
function removeItem(id){cart=cart.filter(x=>x!==id);localStorage.setItem('arteCart',JSON.stringify(cart));updateCart()}
function updateCart(){if(!products.length)return;$('#cartCount').textContent=cart.length;let ps=cart.map(id=>products.find(p=>p.id===id)).filter(Boolean);$('#cartItems').innerHTML=ps.length?ps.map(p=>`<div class="cart-item"><b>${p.name}</b><br><small>Consultar precio</small><br><button onclick="removeItem('${p.id}')">Eliminar</button></div>`).join(''):'<p class="empty">Aún no has agregado productos.</p>';$('#cartWa').href=waLink(ps)}
function waLink(ps){let msg=ps.length?`Hola, Joyería y Relojería Arte & Diseño. Quisiera consultar precio y disponibilidad de:\n${ps.map((p,i)=>`${i+1}. ${p.name}`).join('\n')}`:'Hola, Joyería y Relojería Arte & Diseño. Quisiera recibir información.';return 'https://wa.me/573127010633?text='+encodeURIComponent(msg)}
function toggleCart(){$('#cart').classList.toggle('open')}$('#cartBtn').onclick=toggleCart;