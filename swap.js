 (function(){
      const links = document.querySelectorAll('header nav a');
      const panels = document.querySelectorAll('.panel');
      const TRANSITION_MS = 300;

      function showPanel(id){
        const current = document.querySelector('.panel.active');
        const next = document.getElementById(id);
        if (!next || current === next) return;

        const activeLink = document.querySelector('header nav a.active');
        if (activeLink) activeLink.classList.remove('active');
        const link = document.querySelector(`header nav a[data-target="${id}"]`);
        if (link) link.classList.add('active');

        current.classList.add('exiting');
        current.classList.remove('active');

        setTimeout(() => {
          current.classList.remove('exiting');
          next.classList.add('active');
        }, TRANSITION_MS);
      }

      links.forEach(a => {
        a.addEventListener('click', (e) => {
          e.preventDefault();
          const id = a.dataset.target;
          showPanel(id);
        });
      });

      document.querySelectorAll('.qbtn').forEach(btn => {
        btn.addEventListener('click', () => showPanel(btn.dataset.target));
      });
    })();