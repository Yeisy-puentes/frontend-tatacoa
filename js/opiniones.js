(function () {
    const STORAGE_KEY = "tatacoa-opiniones-reviews";
    const FILTER_KEY = "tatacoa-opiniones-filter";
    const SORT_KEY = "tatacoa-opiniones-sort";
    const FORM_RATING_KEY = "tatacoa-opiniones-form-rating";
    const LIKES_KEY = "tatacoa-opiniones-likes";

    const defaultReviews = [
        {
            id: 1,
            nombre: "María González",
            experiencia: "Desierto Rojo - Tour Completo",
            comentario: "Excelente experiencia. El recorrido estuvo muy bien organizado y la guía fue muy atenta durante todo el viaje.",
            calificacion: 5,
            fecha: "15 Marzo 2026",
            verificado: true,
            utiles: 24,
            colorAvatar: "green"
        },
        {
            id: 2,
            nombre: "Carlos Ramírez",
            experiencia: "Atardecer en la Tatacoa",
            comentario: "El paisaje superó mis expectativas. Ideal para quienes buscan una experiencia tranquila y visualmente impactante.",
            calificacion: 4,
            fecha: "10 Marzo 2026",
            verificado: true,
            utiles: 16,
            colorAvatar: "orange"
        },
        {
            id: 3,
            nombre: "Ana Torres",
            experiencia: "Ruta Fotográfica",
            comentario: "Muy buena atención y mucha disposición para resolver dudas. Repetiría el recorrido sin pensarlo.",
            calificacion: 5,
            fecha: "02 Marzo 2026",
            verificado: false,
            utiles: 19,
            colorAvatar: "blue"
        },
        {
            id: 4,
            nombre: "Luis Pérez",
            experiencia: "Caminata Interpretativa",
            comentario: "Una experiencia completa, segura y con paisajes increíbles. El servicio cumplió con lo prometido.",
            calificacion: 4,
            fecha: "25 Febrero 2026",
            verificado: true,
            utiles: 11,
            colorAvatar: "red"
        },
        {
            id: 5,
            nombre: "Paula Rojas",
            experiencia: "Noche de Observación",
            comentario: "La actividad fue interesante, aunque me hubiera gustado un poco más de tiempo en algunos puntos del recorrido.",
            calificacion: 3,
            fecha: "18 Febrero 2026",
            verificado: false,
            utiles: 7,
            colorAvatar: "brown"
        },
        {
            id: 6,
            nombre: "Daniel Castro",
            experiencia: "Tour Familiar Tatacoa",
            comentario: "Perfecto para ir en familia. La logística fue clara y el ambiente muy agradable de principio a fin.",
            calificacion: 5,
            fecha: "06 Enero 2026",
            verificado: true,
            utiles: 28,
            colorAvatar: "green"
        }
    ];

    const monthMap = {
        enero: 0,
        febrero: 1,
        marzo: 2,
        abril: 3,
        mayo: 4,
        junio: 5,
        julio: 6,
        agosto: 7,
        septiembre: 8,
        octubre: 9,
        noviembre: 10,
        diciembre: 11
    };

    const avatarColors = ["green", "orange", "blue", "red", "brown"];

    const state = {
        reviews: [],
        activeFilter: loadState(FILTER_KEY, "all"),
        activeSort: loadState(SORT_KEY, "recentes"),
        formRating: Number(loadState(FORM_RATING_KEY, "0")) || 0,
        likes: {},
        refs: {}
    };

    function loadState(key, fallback) {
        try {
            return localStorage.getItem(key) || fallback;
        } catch (error) {
            return fallback;
        }
    }

    function saveState(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            return;
        }
    }

    function loadReviews() {
        try {
            const storedReviews = localStorage.getItem(STORAGE_KEY);

            if (!storedReviews) {
                return [...defaultReviews];
            }

            const parsedReviews = JSON.parse(storedReviews);
            return Array.isArray(parsedReviews) && parsedReviews.length > 0
                ? parsedReviews
                : [...defaultReviews];
        } catch (error) {
            return [...defaultReviews];
        }
    }

    function saveReviews() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.reviews));
        } catch (error) {
            return;
        }
    }

    function loadLikes() {
        try {
            const storedLikes = localStorage.getItem(LIKES_KEY);
            return storedLikes ? JSON.parse(storedLikes) : {};
        } catch (error) {
            return {};
        }
    }

    function saveLikes() {
        try {
            localStorage.setItem(LIKES_KEY, JSON.stringify(state.likes));
        } catch (error) {
            return;
        }
    }

    function toggleLike(reviewId) {
        if (!state.likes[reviewId]) {
            state.likes[reviewId] = {
                count: 0,
                liked: false
            };
        }

        const liked = state.likes[reviewId];
        if (liked.liked) {
            liked.count = Math.max(0, liked.count - 1);
            liked.liked = false;
        } else {
            liked.count += 1;
            liked.liked = true;
        }

        saveLikes();
        renderReviewList();
    }

    function getInitials(name) {
        const parts = String(name || "").trim().split(/\s+/).filter(Boolean);

        if (parts.length === 0) {
            return "--";
        }

        if (parts.length === 1) {
            return parts[0].slice(0, 2).toUpperCase();
        }

        return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
    }

    function createStars(rating) {
        return Array.from({ length: 5 }, (_, index) => {
            const iconClass = index < rating ? "fa-solid fa-star" : "fa-regular fa-star";
            return `<i class="${iconClass}"></i>`;
        }).join("");
    }

    function parseSpanishDate(dateLabel) {
        if (!dateLabel) {
            return 0;
        }

        const normalized = String(dateLabel).trim().toLowerCase();
        const match = normalized.match(/^(\d{1,2})\s+([a-záéíóúñ]+)\s+(\d{4})$/i);

        if (!match) {
            return 0;
        }

        const day = Number(match[1]);
        const monthName = match[2];
        const year = Number(match[3]);
        const monthIndex = monthMap[monthName];

        if (typeof monthIndex !== "number") {
            return 0;
        }

        return new Date(year, monthIndex, day).getTime();
    }

    function formatCurrentDate() {
        const formatter = new Intl.DateTimeFormat("es-ES", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });

        const formatted = formatter.format(new Date());
        return formatted.charAt(0).toUpperCase() + formatted.slice(1);
    }

    function pickAvatarColor(name) {
        const normalizedName = String(name || "").trim().toLowerCase();
        const hash = Array.from(normalizedName).reduce((sum, character) => sum + character.charCodeAt(0), 0);
        return avatarColors[hash % avatarColors.length];
    }

    function getFilteredReviews() {
        const reviews = state.reviews.filter((review) => {
            if (state.activeFilter === "all") {
                return true;
            }

            return review.calificacion === Number(state.activeFilter);
        });

        return reviews.sort((firstReview, secondReview) => {
            if (state.activeSort === "mejor") {
                if (secondReview.calificacion !== firstReview.calificacion) {
                    return secondReview.calificacion - firstReview.calificacion;
                }

                return parseSpanishDate(secondReview.fecha) - parseSpanishDate(firstReview.fecha);
            }

            if (state.activeSort === "antiguas") {
                return parseSpanishDate(firstReview.fecha) - parseSpanishDate(secondReview.fecha);
            }

            return parseSpanishDate(secondReview.fecha) - parseSpanishDate(firstReview.fecha);
        });
    }

    function buildDistribution() {
        const totalReviews = state.reviews.length;
        const distribution = [5, 4, 3, 2, 1].map((rating) => {
            const total = state.reviews.filter((review) => review.calificacion === rating).length;
            const percentage = totalReviews === 0 ? 0 : Math.round((total / totalReviews) * 100);

            return {
                rating,
                total,
                percentage
            };
        });

        return distribution;
    }

    function renderSummary() {
        const totalReviews = state.reviews.length;
        const averageRating = totalReviews === 0
            ? 0
            : state.reviews.reduce((sum, review) => sum + review.calificacion, 0) / totalReviews;
        const verifiedPercentage = totalReviews === 0
            ? 0
            : Math.round((state.reviews.filter((review) => review.calificacion >= 4).length / totalReviews) * 100);
        const distribution = buildDistribution();

        if (state.refs.ratingAverage) {
            state.refs.ratingAverage.textContent = averageRating.toFixed(1);
        }

        if (state.refs.ratingAverageStars) {
            state.refs.ratingAverageStars.innerHTML = createStars(Math.round(averageRating));
        }

        if (state.refs.ratingText) {
            state.refs.ratingText.textContent = `Basado en ${totalReviews} opiniones`;
        }

        if (state.refs.recommendationText) {
            state.refs.recommendationText.textContent = `${verifiedPercentage}% recomiendan este destino`;
        }

        if (state.refs.ratingDistribution) {
            state.refs.ratingDistribution.innerHTML = distribution
                .map((item) => {
                    return `
                        <div class="rating-row" data-rating-row="${item.rating}">
                            <div class="rating-label">
                                ${item.rating} <i class="fa-solid fa-star"></i>
                            </div>
                            <div class="progress-bar">
                                <div class="progress" style="width: ${item.percentage}%"></div>
                            </div>
                            <div class="rating-count">${item.total}</div>
                        </div>
                    `;
                })
                .join("");
        }
    }

    function renderFormStars() {
        if (!state.refs.formStars) {
            return;
        }

        state.refs.formStars.innerHTML = Array.from({ length: 5 }, (_, index) => {
            const rating = index + 1;
            const iconClass = rating <= state.formRating ? "fa-solid fa-star selected" : "fa-regular fa-star";
            return `<i class="${iconClass}" data-rating="${rating}" aria-hidden="true"></i>`;
        }).join("");
    }

    function syncFilterButtons() {
        if (!state.refs.filterButtons) {
            return;
        }

        const buttons = state.refs.filterButtons.querySelectorAll(".filter-btn");

        buttons.forEach((button) => {
            const isActive = button.dataset.filter === state.activeFilter;
            button.classList.toggle("active", isActive);
        });
    }

    function syncSortSelect() {
        if (state.refs.sortSelect) {
            state.refs.sortSelect.value = state.activeSort;
        }
    }

    function escapeHTML(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;")
            .replace(/`/g, "&#96;");
    }

    function renderReviewCard(review) {
        const likeData = state.likes[review.id] || { count: review.utiles, liked: false };
        const iconClass = likeData.liked ? "fa-solid fa-heart" : "fa-regular fa-heart";
        const likeCount = likeData.count;
        const safeNombre = escapeHTML(review.nombre);
        const safeInitials = escapeHTML(getInitials(review.nombre));
        const safeExperiencia = escapeHTML(review.experiencia);
        const safeFecha = escapeHTML(review.fecha);
        const safeComentario = escapeHTML(review.comentario);
        const likeActionLabel = likeData.liked ? "Quitar marca de útil" : "Marcar como útil";
        const likeAriaLabel = `${likeActionLabel}. ${likeCount} personas la encontraron útil`;

        return `
            <article class="review-item-card" data-review-id="${review.id}">
                <div class="review-item-header">
                    <div class="review-user">
                        <div class="review-avatar ${review.colorAvatar}">${safeInitials}</div>
                        <div class="review-user-copy">
                            <div class="review-user-line">
                                <h4 class="review-user-name">${safeNombre}</h4>
                                ${review.verificado ? '<span class="review-badge"><i class="fa-solid fa-circle-check"></i> Verificado</span>' : ""}
                            </div>
                            <p class="review-experience">${safeExperiencia}</p>
                        </div>
                    </div>
                    <div class="review-date">${safeFecha}</div>
                </div>

                <div class="review-item-stars">
                    ${createStars(review.calificacion)}
                </div>

                <p class="review-comment">${safeComentario}</p>

                <div class="review-item-footer">
                    <button class="review-like-btn ${likeData.liked ? "liked" : ""}" data-review-id="${review.id}" type="button" aria-pressed="${likeData.liked}" aria-label="${likeAriaLabel}">
                        <i class="${iconClass}" aria-hidden="true"></i>
                        <span class="like-count">${likeCount} personas la encontraron útil</span>
                    </button>
                    <div class="review-item-score">
                        ${review.calificacion.toFixed(1)} / 5
                    </div>
                </div>
            </article>
        `;
    }

    function renderReviewList() {
        if (!state.refs.reviewList) {
            return;
        }

        const filteredReviews = getFilteredReviews();

        if (filteredReviews.length === 0) {
            state.refs.reviewList.innerHTML = `
                <div class="review-empty">
                    No hay opiniones para este filtro. Prueba con otra calificación u orden.
                </div>
            `;
            return;
        }

        state.refs.reviewList.innerHTML = filteredReviews.map(renderReviewCard).join("");
    }

    function renderReviews() {
        renderSummary();
        renderFormStars();
        syncFilterButtons();
        syncSortSelect();
        renderReviewList();
    }

    function updateCharacterCount() {
        if (!state.refs.commentField || !state.refs.commentCount) {
            return;
        }

        state.refs.commentCount.textContent = `Mínimo 10 caracteres • ${state.refs.commentField.value.length} caracteres`;
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        const nameInput = document.getElementById("review-name");
        const commentField = document.getElementById("review-comment");
        const name = nameInput ? nameInput.value.trim() : "";
        const comment = commentField ? commentField.value.trim() : "";

        if (!name || !comment || comment.length < 10 || state.formRating === 0) {
            return;
        }

        const newReview = {
            id: Date.now(),
            nombre: name,
            experiencia: "Experiencia compartida desde el formulario",
            comentario: comment,
            calificacion: state.formRating,
            fecha: formatCurrentDate(),
            verificado: false,
            utiles: 0,
            colorAvatar: pickAvatarColor(name)
        };

        state.reviews = [newReview, ...state.reviews];
        saveReviews();
        state.formRating = 0;
        saveState(FORM_RATING_KEY, String(state.formRating));

        if (nameInput) {
            nameInput.value = "";
        }

        if (commentField) {
            commentField.value = "";
        }

        updateCharacterCount();
        renderReviews();
    }

    function setFormRating(rating) {
        state.formRating = rating;
        saveState(FORM_RATING_KEY, String(state.formRating));
        renderFormStars();
    }

    function bindEvents() {
        if (state.refs.filterButtons) {
            state.refs.filterButtons.addEventListener("click", (event) => {
                const button = event.target.closest(".filter-btn");

                if (!button) {
                    return;
                }

                state.activeFilter = button.dataset.filter || "all";
                saveState(FILTER_KEY, state.activeFilter);
                renderReviews();
            });
        }

        if (state.refs.sortSelect) {
            state.refs.sortSelect.addEventListener("change", (event) => {
                state.activeSort = event.target.value;
                saveState(SORT_KEY, state.activeSort);
                renderReviews();
            });
        }

        if (state.refs.formStars) {
            state.refs.formStars.addEventListener("click", (event) => {
                const star = event.target.closest("i[data-rating]");

                if (!star) {
                    return;
                }

                setFormRating(Number(star.dataset.rating));
            });
        }

        if (state.refs.reviewForm) {
            state.refs.reviewForm.addEventListener("submit", handleFormSubmit);
        }

        if (state.refs.commentField) {
            state.refs.commentField.addEventListener("input", updateCharacterCount);
        }

        if (state.refs.reviewList) {
            state.refs.reviewList.addEventListener("click", (event) => {
                const likeBtn = event.target.closest(".review-like-btn");

                if (!likeBtn) {
                    return;
                }

                const reviewId = Number(likeBtn.dataset.reviewId);
                toggleLike(reviewId);
            });
        }
    }

    function renderShell() {
        const container = document.getElementById("reviews-container");

        if (!container) {
            return false;
        }

        container.innerHTML = `
            <section class="opiniones-section">
                <h2 class="opiniones-title">Opiniones de Nuestros Viajeros</h2>

                <div class="opiniones-card">
                    <div class="rating-left">
                        <h1 id="rating-average" class="rating-number">0.0</h1>
                        <div id="rating-average-stars" class="stars"></div>
                        <p id="rating-text" class="rating-text"></p>
                        <div class="recommendation">
                            <i class="fa-solid fa-arrow-trend-up"></i>
                            <span id="recommendation-text"></span>
                        </div>
                    </div>

                    <div id="rating-distribution" class="rating-right"></div>
                </div>
            </section>

            <section class="review-form-section">
                <form id="review-form" class="review-card">
                    <h3 class="review-title">
                        <i class="fa-regular fa-message"></i>
                        Deja tu Opinión
                    </h3>

                    <p class="review-subtitle">Comparte tu experiencia con otros viajeros</p>

                    <div class="review-top">
                        <div class="input-group">
                            <label for="review-name">
                                <i class="fa-regular fa-user"></i>
                                Tu Nombre *
                            </label>

                            <input
                                id="review-name"
                                type="text"
                                placeholder="Escribe tu nombre"
                                autocomplete="name"
                            >
                        </div>

                        <div class="rating-group">
                            <label>
                                <i class="fa-regular fa-star"></i>
                                Calificación *
                            </label>

                            <div id="form-rating-stars" class="rating-stars"></div>
                        </div>
                    </div>

                    <div class="textarea-group">
                        <label for="review-comment">
                            <i class="fa-regular fa-message"></i>
                            Tu Experiencia *
                        </label>

                        <textarea
                            id="review-comment"
                            placeholder="Cuéntanos sobre tu experiencia en el tour..."
                        ></textarea>

                        <small id="review-comment-count">Mínimo 10 caracteres • 0 caracteres</small>
                    </div>

                    <div class="button-container">
                        <button class="review-btn" type="submit">
                            <i class="fa-regular fa-paper-plane"></i>
                            Enviar Opinión
                        </button>
                    </div>
                </form>
            </section>

            <section class="filter-section">
                <div class="filter-card">
                    <div class="filter-left">
                        <div class="filter-title">
                            <i class="fa-solid fa-filter"></i>
                            <span>Filtrar por:</span>
                        </div>

                        <div id="review-filter-buttons" class="filter-buttons">
                            <button class="filter-btn active" type="button" data-filter="all">Todas</button>
                            <button class="filter-btn" type="button" data-filter="5">5 <i class="fa-regular fa-star"></i></button>
                            <button class="filter-btn" type="button" data-filter="4">4 <i class="fa-regular fa-star"></i></button>
                            <button class="filter-btn" type="button" data-filter="3">3 <i class="fa-regular fa-star"></i></button>
                            <button class="filter-btn" type="button" data-filter="2">2 <i class="fa-regular fa-star"></i></button>
                            <button class="filter-btn" type="button" data-filter="1">1 <i class="fa-regular fa-star"></i></button>
                        </div>
                    </div>

                    <div class="filter-right">
                        <label for="ordenar">Ordenar:</label>
                        <select id="ordenar">
                            <option value="recentes">Más recientes</option>
                            <option value="antiguas">Más antiguas</option>
                            <option value="mejor">Mejor calificadas</option>
                        </select>
                    </div>
                </div>
            </section>

            <section class="review-list-section">
                <div id="review-list" class="review-list"></div>
            </section>
        `;

        state.refs = {
            ratingAverage: document.getElementById("rating-average"),
            ratingAverageStars: document.getElementById("rating-average-stars"),
            ratingText: document.getElementById("rating-text"),
            recommendationText: document.getElementById("recommendation-text"),
            ratingDistribution: document.getElementById("rating-distribution"),
            reviewForm: document.getElementById("review-form"),
            formStars: document.getElementById("form-rating-stars"),
            filterButtons: document.getElementById("review-filter-buttons"),
            sortSelect: document.getElementById("ordenar"),
            commentField: document.getElementById("review-comment"),
            commentCount: document.getElementById("review-comment-count"),
            reviewList: document.getElementById("review-list")
        };

        return true;
    }

    function initializeReviewsPage() {
        const hasRendered = renderShell();

        if (!hasRendered) {
            return;
        }

        state.reviews = loadReviews();
        state.likes = loadLikes();
        renderReviews();
        bindEvents();
        updateCharacterCount();
    }

    document.addEventListener("DOMContentLoaded", initializeReviewsPage);
})();
