const sections = Array.from(document.querySelectorAll('.reveal'));

if (sections.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    {
      threshold: 0.01,
      rootMargin: '0px 0px -2% 0px',
    }
  );

  const revealIfVisible = (section) => {
    if (section.classList.contains('is-visible')) {
      return;
    }

    const rect = section.getBoundingClientRect();
    const visibleTop = rect.top <= window.innerHeight * 0.98;
    const visibleBottom = rect.bottom >= 0;

    if (visibleTop && visibleBottom) {
      section.classList.add('is-visible');
      observer.unobserve(section);
    }
  };

  sections.forEach((section) => {
    revealIfVisible(section);
    if (!section.classList.contains('is-visible')) {
      observer.observe(section);
    }
  });

  requestAnimationFrame(() => {
    sections.forEach(revealIfVisible);
  });

  window.addEventListener(
    'load',
    () => {
      sections.forEach(revealIfVisible);
    },
    { once: true }
  );
}
