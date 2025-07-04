document.addEventListener('DOMContentLoaded', () => {
    // Navbar Toggler (Burger Menu)
    const navSlide = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-links li');

        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');

            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Burger Animation
            burger.classList.toggle('toggle');
        });

        // Close nav when a link is clicked (for smooth scrolling)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    navLinks.forEach(item => item.style.animation = ''); // Reset animation
                }
            });
        });
    };

    navSlide();


    // 1. Selamat datang di Halaman Beranda "Hi Name!"
    const greetingElement = document.getElementById('greeting');
    const storedUserName = localStorage.getItem('userName');

    if (storedUserName) {
        greetingElement.textContent = `Hi ${storedUserName}!`;
    } else {
        let userName = prompt("Halo! Siapa nama Anda?");
        if (userName) {
            greetingElement.textContent = `Hi ${userName}!`;
            localStorage.setItem('userName', userName); // Simpan nama di localStorage
        } else {
            greetingElement.textContent = `Selamat Datang!`; // Default jika tidak ada nama
        }
    }

    // 2. Validasi Formulir "Message Us" & tampilkan nilai
    const contactForm = document.getElementById('contactForm');
    const formSubmissionResult = document.getElementById('formSubmissionResult');
    const resultName = document.getElementById('resultName');
    const resultEmail = document.getElementById('resultEmail');
    const resultPhone = document.getElementById('resultPhone');
    const resultMessage = document.getElementById('resultMessage');
    const closeResultBtn = formSubmissionResult.querySelector('.btn-close-result');

    // Fungsi untuk menampilkan pesan error
    const showError = (elementId, message) => {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    };

    // Fungsi untuk menyembunyikan pesan error
    const hideError = (elementId) => {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    };

    // Fungsi validasi email sederhana
    const isValidEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    // Fungsi validasi nomor telepon (hanya angka)
    const isValidPhone = (phone) => {
        return /^\d+$/.test(phone);
    };


    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Mencegah form submit secara default

        let isValid = true;

        // Ambil nilai dari input
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const messageInput = document.getElementById('message');

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const message = messageInput.value.trim();

        // Reset semua pesan error
        hideError('nameError');
        hideError('emailError');
        hideError('phoneError');
        hideError('messageError');

        // --- Validasi yang Lebih Baik ---

        // Validasi Nama
        if (name === '') {
            showError('nameError', 'Nama lengkap tidak boleh kosong.');
            isValid = false;
        }

        // Validasi Email
        if (email === '') {
            showError('emailError', 'Alamat email tidak boleh kosong.');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('emailError', 'Format email tidak valid.');
            isValid = false;
        }

        // Validasi Nomor Telepon (Opsional, tapi jika diisi harus angka)
        if (phone !== '' && !isValidPhone(phone)) {
            showError('phoneError', 'Nomor telepon harus berupa angka.');
            isValid = false;
        }

        // Validasi Pesan
        if (message === '') {
            showError('messageError', 'Pesan tidak boleh kosong.');
            isValid = false;
        }

        if (isValid) {
            // Tampilkan hasil di div
            resultName.textContent = name;
            resultEmail.textContent = email;
            resultPhone.textContent = phone === '' ? 'Tidak ada' : phone;
            resultMessage.textContent = message;

            formSubmissionResult.style.display = 'block'; // Tampilkan div hasil
            contactForm.reset(); // Kosongkan form setelah submit

            // Gulir ke hasil submit
            formSubmissionResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });

    // Event listener untuk tombol tutup hasil submit
    closeResultBtn.addEventListener('click', () => {
        formSubmissionResult.style.display = 'none';
    });


    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Adjust scroll position to account for fixed header
                const headerOffset = document.querySelector('.main-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20; // -20 for a little extra space

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Animate elements on scroll (contoh sederhana)
    const animateOnScroll = () => {
        const sections = document.querySelectorAll('section');
        const triggerBottom = window.innerHeight * 0.8; // Trigger when 80% of viewport is scrolled

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < triggerBottom) {
                section.classList.add('fade-in-up'); // Add a class for animation
            } else {
                section.classList.remove('fade-in-up');
            }
        });
    };
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});