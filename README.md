Recreation of a site that won Award of site of the day in Awwards.

overflow-clip can be applied on sticky parent, but hidden can't

# scrollbar fix
```css
html.intro-lock { padding-right: var(--sbw); }
html.intro-lock nav { right: var(--sbw); }  /* your fixed navbar; use its real selector */
```
```js
useEffect(() => {
  if (!lenis || done) return;
  const html = document.documentElement;
  const sbw = window.innerWidth - html.clientWidth;  // measure while the scrollbar exists
  html.style.setProperty("--sbw", sbw + "px");
  html.classList.add("intro-lock");
  lenis.stop();
  return () => {                                     // runs when done flips to true
    html.classList.remove("intro-lock");
    lenis.start();                                   // same task as the class removal = same frame
  };
}, [lenis, done]);
```