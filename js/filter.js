// ============================================
// THE FOOD HUB — Menu Filter
// ============================================

document.addEventListener('DOMContentLoaded', function () {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  if (!filterBtns.length || !menuCards.length) return;

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // update active state
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter');

      menuCards.forEach(function (card) {
        const cardCategory = card.getAttribute('data-category');
        const matches = category === 'all' || category === cardCategory;

        if (matches) {
          card.style.display = '';
          requestAnimationFrame(function () {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(function () {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // set initial transition
  menuCards.forEach(function (card) {
    card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
  });
});
