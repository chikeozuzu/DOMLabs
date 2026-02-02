document.addEventListener('DOMContentLoaded', () => {
	const regForm = document.getElementById('registration');
	const errorDisplay = document.getElementById('errorDisplay');

	function showError(message, el) {
		errorDisplay.style.display = 'block';
		errorDisplay.textContent = message;
		if (el && typeof el.focus === 'function') el.focus();
	}

	function clearError() {
		errorDisplay.style.display = 'none';
		errorDisplay.textContent = '';
	}

	function loadUsers() {
		try {
			const raw = localStorage.getItem('users');
			return raw ? JSON.parse(raw) : [];
		} catch (e) {
			return [];
		}
	}

	function saveUsers(users) {
		localStorage.setItem('users', JSON.stringify(users));
	}

	function validateUsername(username) {
		if (!username) return 'The username cannot be blank.';
		if (username.length < 4) return 'The username must be at least four characters long.';
		const uniqueChars = new Set(username.split(''));
		if (uniqueChars.size < 2) return 'The username must contain at least two unique characters.';
		if (!/^[A-Za-z0-9]+$/.test(username)) return 'The username cannot contain any special characters or whitespace.';
		return null;
	}

	function validateEmail(email) {
		const emailLower = (email || '').toLowerCase();
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(emailLower)) return 'The email must be a valid email address.';
		if (emailLower.endsWith('@example.com') || emailLower.endsWith('.example.com')) return 'The email must not be from the domain "example.com."';
		return null;
	}

	function validatePassword(password, username) {
		if ((password || '').length < 12) return 'Passwords must be at least 12 characters long.';
		if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) return 'Passwords must have at least one uppercase and one lowercase letter.';
		if (!/[0-9]/.test(password)) return 'Passwords must contain at least one number.';
		if (!/[!@#$%^&*(),.?"{}\[\]\\/<>;:'`~_+=\-|]/.test(password)) return 'Passwords must contain at least one special character.';
		if (/password/i.test(password)) return 'Passwords cannot contain the word "password" (uppercase, lowercase, or mixed).';
		if (username && password.toLowerCase().includes(username.toLowerCase())) return 'Passwords cannot contain the username.';
		return null;
	}

	regForm.addEventListener('submit', (e) => {
		e.preventDefault();
		clearError();

		const form = e.target;
		const usernameEl = form.querySelector('[name="username"]');
		const emailEl = form.querySelector('[name="email"]');
		const passwordEl = form.querySelector('[name="password"]');
		const passwordCheckEl = form.querySelector('[name="passwordCheck"]');
		const termsEl = form.querySelector('[name="terms"]');

		const username = (usernameEl.value || '').trim();
		const email = (emailEl.value || '').trim();
		const password = passwordEl.value || '';
		const passwordCheck = passwordCheckEl.value || '';

		// Username validation
		const uErr = validateUsername(username);
		if (uErr) return showError(uErr, usernameEl);

		// Username uniqueness
		const users = loadUsers();
		const usernameLower = username.toLowerCase();
		if (users.some(u => u.username === usernameLower)) return showError('that username is already taken', usernameEl);

		// Email validation
		const eErr = validateEmail(email);
		if (eErr) return showError(eErr, emailEl);

		// Password validation
		const pErr = validatePassword(password, username);
		if (pErr) return showError(pErr, passwordEl);

		// Passwords match
		if (password !== passwordCheck) return showError('Both passwords must match.', passwordCheckEl);

		// Terms
		if (!termsEl.checked) return showError('The terms and conditions must be accepted.', termsEl);

		// All good: store user
		const newUser = {
			username: usernameLower,
			email: email.toLowerCase(),
			password: password,
		};
		users.push(newUser);
		saveUsers(users);

		// Clear form and show success
		form.reset();
		errorDisplay.style.display = 'block';
		errorDisplay.style.color = 'green';
		errorDisplay.textContent = 'Registration successful.';
		setTimeout(() => {
			errorDisplay.style.color = '';
			clearError();
		}, 4000);
	});

	// Login form handling
	const loginForm = document.getElementById('login');
	if (loginForm) {
		loginForm.addEventListener('submit', (e) => {
			e.preventDefault();
			clearError();

			const form = e.target;
			const usernameEl = form.querySelector('[name="username"]');
			const passwordEl = form.querySelector('[name="password"]');
			const persistEl = form.querySelector('[name="persist"]');

			const username = (usernameEl.value || '').trim();
			const password = passwordEl.value || '';

			if (!username) return showError('The username cannot be blank.', usernameEl);

			const users = loadUsers();
			const found = users.find(u => u.username === username.toLowerCase());
			if (!found) return showError('The username must exist (within localStorage).', usernameEl);

			if (!password) return showError('The password cannot be blank.', passwordEl);
			if (found.password !== password) return showError('The password must be correct (validate against localStorage).', passwordEl);

			// Success
			form.reset();
			errorDisplay.style.display = 'block';
			errorDisplay.style.color = 'green';
			if (persistEl && persistEl.checked) {
				errorDisplay.textContent = 'Login successful. You will be kept logged in.';
			} else {
				errorDisplay.textContent = 'Login successful.';
			}
			setTimeout(() => {
				errorDisplay.style.color = '';
				clearError();
			}, 4000);
		});
	}
});
