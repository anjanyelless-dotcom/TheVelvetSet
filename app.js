'use strict';
const sets=[
 {id:'VS01',name:'Lotus Reverie',asset:'blossom',category:'floral',tag:'THE LOTUS EDIT',cut:60.4,price:2999,description:'Pink lotus artwork, traditional garlands and a beautifully detailed gold chair.',props:['Lotus print backdrop and garland border','Ornate chair with pink cushion','Flower bowls, display pedestals and tall vases','Lotus stands and pink patterned floor cloth']},
 {id:'VS02',name:'The Heritage Edit',asset:'heritage',category:'traditional',tag:'TRADITIONAL',cut:60.4,price:3500,description:'Rich maroon tones, draped floral garlands and warm gold details.',props:['Maroon printed backdrop and cream garlands','Ornate gold chair with pink cushion','Flower bowls, pedestals and tall vases','Lotus stands and red patterned floor cloth']},
 {id:'VS03',name:'Little Beginnings',asset:'cradle',category:'baby',tag:'CRADLE CELEBRATIONS',cut:58,price:1999,description:'A wooden cradle framed by green peacock artwork and delicate floral strings.',props:['Wooden cradle and bedding as pictured','Peacock and elephant print backdrop','Floral strings and foliage border','Green patterned floor covering']},
 {id:'VS04',name:'Golden Lotus',asset:'lotus',category:'traditional',tag:'CEREMONIAL',cut:61.8,price:3500,description:'A vivid pink lotus, yellow floral strings and a pair of ceremonial elephant statues.',props:['Yellow and green backdrop with flower strings','Pink lotus prop','Two elephant statues on decorative pedestals','Brass-tone vessels as photographed']},
 {id:'VS05',name:'The Kolam Story',asset:'kolam',category:'traditional',tag:'ROOTED IN TRADITION',cut:60.3,price:2999,description:'A striking red kolam backdrop paired with gold accents and a green floor cloth.',props:['Red kolam backdrop and cream garlands','Gold chair with pink cushion','Flower bowls, pedestals and tall vases','Lotus stands and green patterned floor cloth']},
 {id:'VS06',name:'Garden Blessings',asset:'garden',category:'baby',tag:'BABY CELEBRATIONS',cut:69.5,price:1999,description:'Soft illustrated scenery, fresh green tones and an elegant gold chair.',props:['Cream illustrated backdrop','Green garlands and hanging ornaments','Gold chair with pink cushion','Two gold-tone flower vases']},
 {id:'VS07',name:'Temple Tales',asset:'temple',category:'traditional',tag:'SACRED MOMENTS',cut:57,price:2999,description:'Temple-inspired artwork and traditional garlands for meaningful family celebrations.',props:['Temple illustration backdrop and garlands','Gold chair with pink cushion','Flower bowls, pedestals and tall vases','Lotus stands and red patterned floor cloth']}
];
const $=s=>document.querySelector(s);const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
$('#cards').innerHTML=sets.map(s=>`<article class="card reveal" data-category="${s.category}"><button class="card-photo" data-view="${s.id}" aria-label="View ${s.name}"><div class="photo" style="--cut:${s.cut}%;--ratio:712/740"><img src="assets/${s.asset}.jpeg" alt="${s.description}" loading="lazy"></div><span class="card-tag">${s.tag}</span><span class="view-icon" aria-hidden="true"><span class="icon-arrow arrow-up"></span></span></button><div class="card-info"><div><h3>${s.name}</h3><p>${s.category==='baby'?'For beautiful new beginnings':'Decor rental & home styling'}</p></div><div class="card-price"><strong>₹${s.price.toLocaleString('en-IN')}</strong><span> / 1 day</span></div></div><button class="card-select" data-select="${s.id}">Enquire about this set <span aria-hidden="true">→</span></button></article>`).join('');
function replaceArrowGlyphs(){document.querySelectorAll('span').forEach(el=>{const value=el.textContent.trim();if(value==='↗'){el.textContent='';el.classList.add('icon-arrow','arrow-up')}else if(value==='→'){el.textContent='';el.classList.add('icon-arrow','arrow-right')}});document.querySelectorAll('footer a,#whatsapp-link').forEach(link=>{link.innerHTML=link.innerHTML.replace(/\s↗/g,' <span class="icon-arrow arrow-up" aria-hidden="true"></span>')})}
replaceArrowGlyphs();
sets.forEach(s=>$('#set-select').add(new Option(s.name+' · '+s.id,s.name+' ('+s.id+')')));
$('#year').textContent=new Date().getFullYear();
const today=new Date();today.setMinutes(today.getMinutes()-today.getTimezoneOffset());$('input[type=date]').min=today.toISOString().slice(0,10);
$('.menu').addEventListener('click',()=>{const open=$('nav').classList.toggle('open');$('.menu').setAttribute('aria-expanded',String(open));$('.menu').setAttribute('aria-label',open?'Close navigation':'Open navigation')});
$('nav').addEventListener('click',e=>{if(e.target.closest('a')){$('nav').classList.remove('open');$('.menu').setAttribute('aria-expanded','false')}});
function updateFilter(button){document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('active',x===button);x.setAttribute('aria-pressed',String(x===button))});const wanted=button.dataset.filter;let count=0;document.querySelectorAll('.card').forEach(card=>{const show=wanted==='all'||card.dataset.category===wanted;if(show){count++;card.hidden=false;card.classList.add('visible');if(window.gsap&&!reduced)window.gsap.fromTo(card,{opacity:0,y:18,scale:.97},{opacity:1,y:0,scale:1,duration:.55,delay:count*.045,ease:'power3.out',overwrite:true})}else if(window.gsap&&!reduced){window.gsap.to(card,{opacity:0,y:12,duration:.18,ease:'power2.in',overwrite:true,onComplete:()=>{card.hidden=true}})}else card.hidden=true});$('.collection-count').textContent=count+' beautiful setting'+(count===1?'':'s')}
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>updateFilter(b)));
function openDialog(dialog){replaceArrowGlyphs();dialog.showModal();document.body.classList.add('modal-open')}
document.querySelectorAll('dialog').forEach(d=>{d.querySelector('.close').addEventListener('click',()=>d.close());d.addEventListener('close',()=>document.body.classList.remove('modal-open'));d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}})});
function choose(id){const s=sets.find(x=>x.id===id);$('#set-select').value=s.name+' ('+s.id+')';if($('#detail-dialog').open)$('#detail-dialog').close();$('#enquire').scrollIntoView({behavior:reduced?'instant':'smooth'});$('#set-select').focus({preventScroll:true})}
document.addEventListener('click',e=>{const select=e.target.closest('[data-select]');if(select)choose(select.dataset.select);const view=e.target.closest('[data-view]');if(view){const s=sets.find(x=>x.id===view.dataset.view);$('#detail-content').innerHTML=`<div class="detail-layout"><div class="photo" style="--cut:${s.cut}%;--ratio:712/740"><img src="assets/${s.asset}.jpeg" alt="${s.description}"></div><div class="detail-copy"><div class="eyebrow">${s.id} / ${s.tag}</div><h2>${s.name}</h2><div class="detail-price">From ₹${s.price.toLocaleString('en-IN')} <span>/ 1 day rental</span></div><p>${s.description}</p><ul>${s.props.map(p=>'<li>'+p+'</li>').join('')}</ul><p>Request a quote for your date and location. Final inclusions and prop variations are confirmed before booking.</p><br><button class="button" data-select="${s.id}">Choose this set <span>↗</span></button></div></div>`;openDialog($('#detail-dialog'))}});
let enquiryText='';const phone=String(window.VELVET_CONFIG?.whatsappNumber||'').replace(/[^0-9]/g,'');const whatsappReady=/^[1-9]\d{7,14}$/.test(phone);
if(whatsappReady){$('#form-footnote').textContent='Prepare your enquiry, then send it on WhatsApp. Availability and pricing will be confirmed separately.';$('#enquiry-form button[type=submit]').firstChild.textContent='Prepare WhatsApp enquiry '}
$('#enquiry-form').addEventListener('submit',e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target));enquiryText=`Hello TheVelvetSet! I'd like to enquire about a celebration.\n\nName: ${d.name.trim()}\nPhone: ${d.phone.trim()}\nDate: ${d.date}\nLocation: ${d.location.trim()}\nDecor set: ${d.set}\nService: ${d.service}\nDetails: ${d.details.trim()||'To be discussed'}\n\nPlease confirm availability, rental duration, inclusions, setup/takedown and transport charges.\n\nThis is an enquiry, not a confirmed booking.`;$('#enquiry-text').textContent=enquiryText;$('#copy-status').textContent='';if(whatsappReady){$('#whatsapp-link').hidden=false;$('#whatsapp-link').href='https://wa.me/'+phone+'?text='+encodeURIComponent(enquiryText);$('#result-intro').textContent='Review your details, then send your enquiry on WhatsApp. Your booking is subject to confirmation.'}openDialog($('#enquiry-dialog'))});
$('#copy-enquiry').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(enquiryText);$('#copy-status').textContent='Copied. You can paste your enquiry into a message.'}catch{const range=document.createRange();range.selectNodeContents($('#enquiry-text'));const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);$('#copy-status').textContent='Text selected. Press Ctrl+C or Command+C to copy, or download your details.'}});
$('#download-enquiry').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([enquiryText],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='TheVelvetSet-Enquiry.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);$('#copy-status').textContent='Enquiry file prepared for download. It has not been sent.'});
if(!reduced&&'IntersectionObserver'in window){document.documentElement.classList.add('js-motion');const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}
if(!reduced&&matchMedia('(pointer:fine)').matches){document.querySelectorAll('.card-photo').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateY(${x*4}deg) rotateX(${-y*4}deg)`});card.addEventListener('pointerleave',()=>{card.style.transform=''})});document.querySelectorAll('.button,.navcta,.card-select').forEach(button=>button.addEventListener('pointerdown',()=>{button.animate([{transform:'translateY(0) scale(1)'},{transform:'translateY(1px) scale(.97)'},{transform:'translateY(-2px) scale(1)'}],{duration:320,easing:'cubic-bezier(.2,.8,.2,1)'})}))}
const canvas=$('#dust'),ctx=canvas.getContext('2d');if(ctx&&!reduced){let w,h,t=0,raf=0,active=true;const dots=Array.from({length:24},()=>({x:Math.random(),y:Math.random(),size:Math.random()*1.5+.4,speed:Math.random()*.3+.15}));function resize(){w=canvas.clientWidth;h=canvas.clientHeight;const d=Math.min(devicePixelRatio||1,2);canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0)}function frame(){if(!active||document.hidden){raf=0;return}ctx.clearRect(0,0,w,h);t++;for(const p of dots){ctx.beginPath();ctx.arc(p.x*w+Math.sin(t*.004+p.y*9)*12,(p.y*h-t*p.speed*.15+h*100)%h,p.size,0,Math.PI*2);ctx.fillStyle='rgba(166,124,71,.30)';ctx.fill()}raf=requestAnimationFrame(frame)}function resume(){if(active&&!document.hidden&&!raf)frame()}resize();addEventListener('resize',resize);document.addEventListener('visibilitychange',resume);new IntersectionObserver(entries=>{active=entries[0].isIntersecting;resume()}).observe($('.hero'));frame()}
/* GSAP motion layer: cinematic entrance, scroll reveals, parallax, and filter transitions. */
if(!reduced&&window.gsap){
  const gs=window.gsap;
  const st=window.ScrollTrigger;
  if(st)gs.registerPlugin(st);
  document.documentElement.classList.add('gsap-ready');
  const heroTl=gs.timeline({defaults:{ease:'power3.out'}});
  heroTl.from('.hero-logo-lockup',{opacity:0,y:28,scale:.92,duration:.85})
    .from('.hero .eyebrow',{opacity:0,x:-18,duration:.55},'-=.42')
    .from('.hero h1',{opacity:0,y:34,skewY:2,duration:1.05},'-=.34')
    .from('.hero-copy>p,.hero-actions,.hero-note',{opacity:0,y:18,stagger:.08,duration:.55},'-=.55')
    .from('.hero-art .photo-frame',{opacity:0,scale:.84,rotation:8,duration:1.1},'-=.95')
    .from('.floating-note',{opacity:0,y:26,scale:.94,duration:.6},'-=.65');
  if(st){
    gs.utils.toArray('.reveal').forEach((el)=>gs.fromTo(el,{autoAlpha:0,y:34},{autoAlpha:1,y:0,duration:.8,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 84%',once:true}}));
    gs.to('.hero-art .orbit-one',{rotation:18,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
    gs.to('.hero-art .orbit-two',{rotation:-14,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
    gs.to('.hero-scroll-track',{xPercent:-24,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
    gs.to('.hero-art .photo-frame',{y:54,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
    gs.to('.ribbon span',{xPercent:-8,scrollTrigger:{trigger:'.ribbon',start:'top bottom',end:'bottom top',scrub:1}});
    gs.to('.service-visual .photo',{y:-22,scrollTrigger:{trigger:'.services',start:'top bottom',end:'bottom top',scrub:1}});
  }
}
/* If a host blocks the full ScrollTrigger build, keep the background rail
   scroll-driven with a tiny native fallback. */
if(!reduced&&(!window.ScrollTrigger||typeof window.ScrollTrigger.create!=='function')){
  const rail=$('.hero-scroll-track');
  const heroSection=$('.hero');
  if(rail&&heroSection){
    let ticking=false;
    const syncRail=()=>{
      ticking=false;
      const rect=heroSection.getBoundingClientRect();
      const progress=Math.max(0,Math.min(1,-rect.top/Math.max(rect.height,1)));
      rail.style.setProperty('--gallery-shift',`${-24*progress}%`);
    };
    addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(syncRail)}},{passive:true});
    syncRail();
  }
}

/* Direct contact actions: customers can call or choose either WhatsApp
   contact without leaving the enquiry flow. */
const directContacts=(Array.isArray(window.VELVET_CONFIG?.contacts)?window.VELVET_CONFIG.contacts:[])
  .map(contact=>({name:String(contact.name||'').trim(),displayPhone:String(contact.phone||'').trim(),phone:String(contact.phone||'').replace(/[^0-9]/g,'')}))
  .filter(contact=>contact.name&&/^[1-9]\d{7,14}$/.test(contact.phone));
if(directContacts.length){
  $('#form-footnote').textContent='Prepare your enquiry, then choose Srikanth M or Anjan on WhatsApp. Availability and pricing will be confirmed separately.';
  const intro=$('.enquiry-intro');
  if(intro&&!intro.querySelector('.contact-list')){
    intro.insertAdjacentHTML('beforeend',`<div class="contact-list" aria-label="Call or WhatsApp contacts"><div class="contact-heading">Talk to us directly</div>${directContacts.map(contact=>`<div class="contact-card"><div><strong>${contact.name}</strong><span>${contact.displayPhone}</span></div><div class="contact-actions"><a class="contact-link" href="tel:+${contact.phone}">Call</a><a class="contact-link contact-whatsapp" href="https://wa.me/${contact.phone}?text=${encodeURIComponent('Hello TheVelvetSet! I would like to enquire about a decoration set.')}" target="_blank" rel="noopener">WhatsApp <span class="icon-arrow arrow-right" aria-hidden="true"></span></a></div></div>`).join('')}</div>`);
  }
  const resultActions=$('.result-actions');
  if(resultActions&&!$('#whatsapp-links')){
    const links=document.createElement('div');
    links.id='whatsapp-links';
    links.className='whatsapp-links';
    links.hidden=true;
    resultActions.appendChild(links);
  }
  $('#enquiry-form').addEventListener('submit',()=>{
    const links=$('#whatsapp-links');
    if(!links)return;
    links.hidden=false;
    links.innerHTML=directContacts.map(contact=>`<a class="button whatsapp-choice" href="https://wa.me/${contact.phone}?text=${encodeURIComponent(enquiryText)}" target="_blank" rel="noopener"><span>WhatsApp ${contact.name}</span><span class="icon-arrow arrow-right" aria-hidden="true"></span></a>`).join('');
    $('#result-intro').textContent='Choose who should receive your enquiry on WhatsApp. Availability and pricing will be confirmed separately.';
  });
}

/* Fixed WhatsApp/call launcher for quick contact from any section. */
if(directContacts.length&&!document.querySelector('[data-contact-widget]')){
  const widgetMessage='Hello TheVelvetSet! I would like to enquire about a decoration rental or home decoration service. Please share the available sets, pricing, date availability, setup details and transport charges.';
  document.body.insertAdjacentHTML('beforeend',`<aside class="contact-widget" data-contact-widget><button type="button" class="contact-widget-toggle" aria-expanded="false" aria-controls="contact-widget-panel" aria-label="Chat with TheVelvetSet"><span class="contact-widget-icon" aria-hidden="true"><svg viewBox="0 0 32 32" role="img"><path d="M16 3.5C9.1 3.5 3.5 8.7 3.5 15.1c0 2.3.7 4.5 2 6.4L4 27.9l6.6-1.9c1.7.8 3.5 1.2 5.4 1.2 6.9 0 12.5-5.2 12.5-11.6S22.9 3.5 16 3.5Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M11.4 11.6c.3-.4.7-.5 1.1-.3l1.6.8c.4.2.5.6.4 1l-.5 1.1c.8 1.5 2 2.6 3.5 3.4l1.1-.5c.4-.2.8 0 1 .3l.8 1.6c.2.4.1.8-.3 1.1-.7.6-1.6.8-2.5.5-3.8-1.2-6.8-4.2-8-8-.3-.9-.1-1.8.5-2.5Z" fill="currentColor"/></svg></span><span class="contact-widget-tooltip">Chat with TheVelvetSet</span></button><section id="contact-widget-panel" class="contact-widget-panel" role="dialog" aria-label="Contact TheVelvetSet" hidden><div class="contact-widget-head"><div><span class="contact-widget-kicker">CONTACT US</span><strong>Plan your celebration</strong></div><button type="button" class="contact-widget-close" aria-label="Close contact options">×</button></div><p>Choose WhatsApp for a quick enquiry or call us directly.</p><div class="contact-widget-people"></div></section></aside>`);
  const widget=document.querySelector('[data-contact-widget]');
  const toggle=widget.querySelector('.contact-widget-toggle');
  const panel=widget.querySelector('.contact-widget-panel');
  const people=widget.querySelector('.contact-widget-people');
  people.innerHTML=directContacts.map(contact=>`<div class="contact-widget-person"><div class="contact-widget-person-copy"><strong>${contact.name}</strong><span>${contact.displayPhone}</span></div><div class="contact-widget-actions"><a class="contact-widget-action contact-widget-whatsapp" href="https://wa.me/${contact.phone}?text=${encodeURIComponent(widgetMessage)}" target="_blank" rel="noopener">WhatsApp</a><a class="contact-widget-action contact-widget-call" href="tel:+${contact.phone}">Call</a></div></div>`).join('');
  const closeWidget=()=>{panel.hidden=true;toggle.setAttribute('aria-expanded','false')};
  const openWidget=()=>{panel.hidden=false;toggle.setAttribute('aria-expanded','true');panel.querySelector('.contact-widget-close').focus()};
  toggle.addEventListener('click',()=>panel.hidden?openWidget():closeWidget());
  panel.querySelector('.contact-widget-close').addEventListener('click',closeWidget);
  document.addEventListener('click',event=>{if(!widget.contains(event.target))closeWidget()});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!panel.hidden){closeWidget();toggle.focus()}});
}
