    // Navbar: simple mobile toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger && hamburger.addEventListener('click', () => {
      const shown = navLinks.style.display === 'flex';
      navLinks.style.display = shown ? 'none' : 'flex';
    });

    // Slider functionality
    (function(){
      const slidesEl = document.querySelector('.slides');
      const slides = Array.from(document.querySelectorAll('.slides img'));
      const prevBtn = document.querySelector('.nav-btn.left');
      const nextBtn = document.querySelector('.nav-btn.right');
      const dotsEl = document.querySelector('.dots');
      const thumbsEl = document.querySelector('.thumbs');

      let index = 0; const total = slides.length;
      let autoplay = true; let autoplayInterval = 5000; let timer = null;

      function update(){ slidesEl.style.transform = `translateX(${-index * 100}%)`; Array.from(dotsEl.children).forEach((d,i)=> d.classList.toggle('active', i===index)); Array.from(thumbsEl.children).forEach((t,i)=> t.classList.toggle('active', i===index)); }
      function goTo(i){ index = (i + total) % total; update(); }
      function next(){ goTo(index+1); }
      function prev(){ goTo(index-1); }

      // build dots and thumbs
      slides.forEach((s,i)=>{
        const dot = document.createElement('button'); dot.className='dot'; dot.setAttribute('aria-label', 'Go to slide '+(i+1)); dot.addEventListener('click', ()=>{ goTo(i); resetAutoplay(); }); dotsEl.appendChild(dot);
        const thumb = document.createElement('div'); thumb.className='thumb'; const img = document.createElement('img'); img.src = s.src.replace('w=1600','w=400'); img.alt = 'thumb '+(i+1); thumb.appendChild(img); thumb.addEventListener('click', ()=>{ goTo(i); resetAutoplay(); }); thumbsEl.appendChild(thumb);
      });

      nextBtn.addEventListener('click', ()=>{ next(); resetAutoplay(); }); prevBtn.addEventListener('click', ()=>{ prev(); resetAutoplay(); });

      function startAutoplay(){ if(!autoplay) return; stopAutoplay(); timer = setInterval(next, autoplayInterval); }
      function stopAutoplay(){ if(timer){ clearInterval(timer); timer = null; } }
      function resetAutoplay(){ stopAutoplay(); startAutoplay(); }

      // keyboard
      window.addEventListener('keydown', (e)=>{ if(e.key === 'ArrowLeft'){ prev(); resetAutoplay(); } if(e.key === 'ArrowRight'){ next(); resetAutoplay(); } });

      // touch / swipe
      let startX = 0, endX = 0; const parent = slidesEl.parentElement;
      parent.addEventListener('touchstart', (e)=>{ startX = e.touches[0].clientX; });
      parent.addEventListener('touchmove', (e)=>{ endX = e.touches[0].clientX; });
      parent.addEventListener('touchend', ()=>{ const dx = endX - startX; if(Math.abs(dx) > 40){ if(dx < 0) next(); else prev(); resetAutoplay(); } startX = endX = 0; });

      // pause on hover
      slidesEl.parentElement.addEventListener('mouseenter', ()=>{ stopAutoplay(); });
      slidesEl.parentElement.addEventListener('mouseleave', ()=>{ startAutoplay(); });

      update(); startAutoplay(); window.mySlider = { goTo, next, prev, startAutoplay, stopAutoplay };
    })();