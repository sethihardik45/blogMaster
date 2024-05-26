document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form[action^="/delete"]');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!confirm('Are you sure you want to delete this blog?')) {
                e.preventDefault();
            }
        });
    });
});
