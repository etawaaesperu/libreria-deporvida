export function AboutView() {
  return (
    <div className="about-page">
      <h2>Sobre Nosotros</h2>

      <p>
        Somos Librería Deporvida, un espacio dedicado a la venta y difusión de
        libros para todo tipo de lectores. Nuestro objetivo es acercar el
        conocimiento, la cultura y el entretenimiento a través de una variedad
        de publicaciones.
      </p>

      <p>
        Contamos con libros de diferentes temáticas, incluyendo deporte,
        historia, literatura, educación, análisis y otros contenidos pensados
        para quienes disfrutan aprender y descubrir nuevas ideas.
      </p>

      <p>
        Creemos que cada libro tiene una historia que contar y una enseñanza que
        compartir. Por eso trabajamos para ofrecer títulos de calidad y
        acompañar a nuestros clientes en su camino de lectura.
      </p>

      <h3>Que leer sea el deporte de nuestras vidas.</h3>

      <br />

      <button
        className="btn btn-primary"
        onClick={() => window.location.href = '#home'}
      >
        INICIO
      </button>
    </div>
  );
}