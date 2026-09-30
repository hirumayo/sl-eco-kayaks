const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>50));
const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
const items=[...document.querySelectorAll('.gallery-item')],lightbox=document.getElementById('lightbox'),lightboxImage=document.getElementById('lightboxImage');let current=0;
function openGallery(i){current=i;const img=items[current].querySelector('img');lightboxImage.src=img.src;lightboxImage.alt=img.alt;lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false')}
function closeGallery(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true')}
items.forEach((item,i)=>item.addEventListener('click',()=>openGallery(i)));
document.getElementById('closeLightbox').onclick=closeGallery;
document.getElementById('prevImage').onclick=()=>openGallery((current-1+items.length)%items.length);
document.getElementById('nextImage').onclick=()=>openGallery((current+1)%items.length);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeGallery();if(e.key==='ArrowLeft'&&lightbox.classList.contains('open'))openGallery((current-1+items.length)%items.length);if(e.key==='ArrowRight'&&lightbox.classList.contains('open'))openGallery((current+1)%items.length)});

const menuBtn=document.getElementById('menuBtn');
const navLinks=document.getElementById('navLinks');
if(menuBtn&&navLinks){
  menuBtn.addEventListener('click',()=>{
    const open=nav.classList.toggle('menu-open');
    menuBtn.setAttribute('aria-expanded',String(open));
    menuBtn.textContent=open?'×':'☰';
  });
  navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    nav.classList.remove('menu-open');
    menuBtn.setAttribute('aria-expanded','false');
    menuBtn.textContent='☰';
  }));
}


/* Active navigation state for desktop and mobile */
const navAnchors = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const navSections = navAnchors
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

if (navSections.length) {
  const navObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + visible.target.id));
  }, { rootMargin: '-25% 0px -55% 0px', threshold: [0, .2, .5, .8] });
  navSections.forEach(section => navObserver.observe(section));
}


/* Gallery View More */
const viewMoreBtn = document.getElementById('viewMoreBtn');
const extraGalleryItems = [...document.querySelectorAll('.gallery-extra')];

if (viewMoreBtn && extraGalleryItems.length) {
  viewMoreBtn.addEventListener('click', () => {
    extraGalleryItems.forEach(item => {
      item.style.display = 'block';
    });
    viewMoreBtn.style.display = 'none';
  });
}
