/**
 * PROFILE.JS — Customer Profile Editor Controller
 * Pre-populates profile info from Store and handles address / profile updates.
 */
document.addEventListener("DOMContentLoaded", function () {
    const profileForm = document.querySelector(".profile-section form");
    const Store = window.Store || (window.BiteBuddy && window.BiteBuddy.Store);
    if (!profileForm || !Store) return;

    const user = Store.getUser() || (window.BiteBuddy?.Constants?.DEMO_USERS?.CUSTOMER);
    if (user) {
        const nameInput = profileForm.querySelector("input[name='fullName'], input[placeholder*='Name']");
        const emailInput = profileForm.querySelector("input[name='email'], input[type='email']");
        const phoneInput = profileForm.querySelector("input[name='phone'], input[type='tel']");
        const addressInput = profileForm.querySelector("textarea[name='address'], textarea, input[name='address']");

        if (nameInput && user.name) nameInput.value = user.name;
        if (emailInput && user.email) emailInput.value = user.email;
        if (phoneInput && user.phone) phoneInput.value = user.phone;
        if (addressInput && user.address) addressInput.value = user.address;
    }

    profileForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const updated = {
            ...user,
            name: profileForm.querySelector("input[name='fullName'], input[placeholder*='Name']")?.value || user.name,
            phone: profileForm.querySelector("input[name='phone'], input[type='tel']")?.value || user.phone,
            address: profileForm.querySelector("textarea[name='address'], textarea")?.value || user.address
        };
        Store.setUser(updated);
        if (window.BiteBuddy?.toast) {
            window.BiteBuddy.toast("Profile updated successfully!", "success");
        } else {
            alert("Profile updated successfully!");
        }
    });
});
