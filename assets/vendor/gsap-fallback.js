/* Small offline motion fallback. The full GSAP + ScrollTrigger builds load first;
   this keeps the storefront animated when a restrictive host blocks third-party
   script execution while preserving the same public GSAP calls used by app.js. */
(function(){
  if(window.gsap)return;
  const toArray=target=>typeof target==='string'?[...document.querySelectorAll(target)]:target instanceof Element?[target]:[...(target||[])];
  const value=(vars,key,initial)=>vars[key] == null ? initial : vars[key];
  const transform=(vars)=>{
    const x=value(vars,'x',0),y=value(vars,'y',0),scale=value(vars,'scale',1),rotation=value(vars,'rotation',0),skewY=value(vars,'skewY',0);
    return `translate3d(${x}px,${y}px,0) rotate(${rotation}deg) skewY(${skewY}deg) scale(${scale})`;
  };
  const animate=(targets,from,to)=>{
    const items=toArray(targets),duration=Math.max(1,(to.duration||.6)*1000),delay=Math.max(0,(to.delay||0)*1000),iterations=to.repeat===-1?Infinity:(to.repeat||0)+1;
    items.forEach(el=>{
      const start={opacity:from?.autoAlpha ?? from?.opacity ?? 1,transform:transform(from||{})};
      const end={opacity:to.autoAlpha ?? to.opacity ?? 1,transform:transform(to)};
      if(from?.autoAlpha===0||to.autoAlpha===0)el.style.visibility=(to.autoAlpha===0?'hidden':'visible');
      if(from)Object.assign(el.style,start);
      if(el.animate)el.animate([start,end],{duration,delay,iterations,easing:'cubic-bezier(.2,.8,.2,1)',fill:'both'});
      else Object.assign(el.style,end);
      if(typeof to.onComplete==='function'&&iterations!==Infinity)setTimeout(()=>to.onComplete(),duration+delay);
    });
  };
  class Timeline{
    constructor(options){this.options=options||{};this.queue=[]}
    from(targets,vars){this.queue.push(()=>animate(targets,vars,{}));return this}
    fromTo(targets,from,vars){this.queue.push(()=>animate(targets,from,vars));return this}
    play(){this.queue.forEach((run,index)=>setTimeout(run,index*90));return this}
  }
  window.ScrollTrigger=window.ScrollTrigger||{};
  window.gsap={
    timeline:options=>{const t=new Timeline(options);setTimeout(()=>t.play(),0);return t},
    from:(targets,vars)=>animate(targets,vars,{}),
    fromTo:(targets,from,vars)=>animate(targets,from,vars),
    to:(targets,vars)=>animate(targets,{},vars),
    registerPlugin:()=>{},
    utils:{toArray}
  };
})();
