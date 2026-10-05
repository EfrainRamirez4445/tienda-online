// ===== VALIDACIÓN DEL FORMULARIO DE CONTACTO =====
const form = document.getElementById("formContacto");

// Solo se ejecuta en la página que tiene el formulario
if (form) {
  const nombre = document.getElementById("nombre");
  const correo = document.getElementById("correo");
  const mensaje = document.getElementById("mensaje");

  // Marca un campo como válido o inválido (clases de Bootstrap)
  function validar(campo, esValido) {
    campo.classList.toggle("is-valid", esValido);
    campo.classList.toggle("is-invalid", !esValido);
    return esValido;
  }

  const validarNombre = () => validar(nombre, nombre.value.trim().length >= 3);
  const validarCorreo = () => validar(correo, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value));
  const validarMensaje = () => validar(mensaje, mensaje.value.trim().length >= 10);

  // Retroalimentación en tiempo real mientras el usuario escribe
  nombre.addEventListener("input", validarNombre);
  correo.addEventListener("input", validarCorreo);
  mensaje.addEventListener("input", validarMensaje);

  // Al enviar, se revisan los tres campos
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const ok = validarNombre() & validarCorreo() & validarMensaje();
    if (ok) {
      document.getElementById("exito").classList.remove("d-none");
      form.reset();
      [nombre, correo, mensaje].forEach(c => c.classList.remove("is-valid"));
    }
  });
}
// ===== CARRUSEL DE IMÁGENES =====
const slides = document.querySelectorAll(".carrusel .slide");

// Solo se ejecuta en la página de inicio
if (slides.length > 0) {
  let actual = 0;

  // Muestra la diapositiva indicada y oculta las demás
  function mostrar(n) {
    slides[actual].classList.remove("activo");
    actual = (n + slides.length) % slides.length;
    slides[actual].classList.add("activo");
  }

  document.getElementById("btnNext").addEventListener("click", () => mostrar(actual + 1));
  document.getElementById("btnPrev").addEventListener("click", () => mostrar(actual - 1));

  // Cambio automático cada 4 segundos
  setInterval(() => mostrar(actual + 1), 4000);
}

// ===== INTERACCIÓN CON LOS PRODUCTOS =====
const productos = document.querySelectorAll(".producto");

productos.forEach(function (producto) {

  // Resaltar al pasar el ratón por encima
  producto.addEventListener("mouseenter", () => producto.classList.add("resaltado"));
  producto.addEventListener("mouseleave", () => producto.classList.remove("resaltado"));

  // Mostrar u ocultar detalles al hacer clic
  producto.addEventListener("click", function () {
    let detalle = producto.querySelector(".detalle");

    // Si no existe el detalle, se crea
    if (!detalle) {
      detalle = document.createElement("p");
      detalle.className = "detalle text-muted small mt-2";
      detalle.textContent = producto.dataset.detalle ||
        "Disponible en varias tallas. Envío gratis en compras mayores a $50.";
      producto.appendChild(detalle);
    } else {
      // Si ya existe, se oculta o se muestra
      detalle.classList.toggle("d-none");
    }
  });
});