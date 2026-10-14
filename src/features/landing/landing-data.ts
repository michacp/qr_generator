export const HOW_IT_WORKS = [
    {
        title: "Elige el tipo de QR",
        text: "URL, WhatsApp, Wi-Fi, contacto, SMS, email, texto o ubicación.",
    },
    {
        title: "Completa los datos y personaliza",
        text: "Ves la vista previa al instante mientras cambias colores, puntos, esquinas y logo.",
    },
    {
        title: "Descarga y usa",
        text: "Baja tu QR en PNG, JPG, WebP o SVG, en el tamaño que necesites.",
    },
] as const;

export const QR_TYPE_DESCRIPTIONS = [
    {
        title: "QR de URL",
        text: "Lleva a una página web, un menú digital, un catálogo o un artículo.",
    },
    {
        title: "QR de contacto (vCard)",
        text: "Al escanear, el celular ofrece guardar nombre, teléfono, email y empresa en la agenda.",
    },
    {
        title: "QR de Wi-Fi",
        text: "Guarda el nombre de la red, la contraseña y el tipo de seguridad para conectarse sin escribir nada.",
    },
    {
        title: "QR de WhatsApp",
        text: "Abre un chat con tu número y un mensaje ya escrito.",
    },
    {
        title: "QR de SMS",
        text: "Abre la app de mensajes con el número y el texto listos para enviar.",
    },
    {
        title: "QR de email",
        text: "Abre el correo con destinatario, asunto y mensaje predefinidos.",
    },
    {
        title: "QR de texto",
        text: "Muestra un texto simple de hasta 500 caracteres, útil para códigos de inventario o notas.",
    },
    {
        title: "QR de ubicación",
        text: "Abre Google Maps en unas coordenadas específicas.",
    },
] as const;

export const FAQ_ITEMS = [
    {
        question: "¿Es realmente gratis?",
        answer:
            "Sí. Generar y descargar códigos QR no cuesta nada: no hay límite de códigos ni marcas de agua.",
    },
    {
        question: "¿Los códigos QR caducan?",
        answer:
            "No. Son estáticos: la información queda dentro de la imagen, así que el QR funciona para siempre mientras el enlace o la información a la que apunta siga existiendo.",
    },
    {
        question: "¿Necesito registrarme?",
        answer:
            "No. Eliges el tipo de QR, completas los datos y descargas. No pedimos cuenta ni correo.",
    },
    {
        question: "¿Qué diferencia hay entre PNG y SVG?",
        answer:
            "PNG es una imagen de píxeles, ideal para redes sociales y páginas web. SVG es vectorial: puedes imprimirlo en cualquier tamaño (afiches, vallas, camisetas) sin que se pixele.",
    },
    {
        question: "¿Puedo agregar mi logo al código QR?",
        answer:
            "Sí. Arrastra tu imagen PNG o JPG a la zona del logo y se centra y ajusta sola. Con logo, el QR usa más corrección de errores, pero revisa siempre que escanee bien antes de imprimirlo.",
    },
    {
        question: "¿Se guardan mis datos o mi logo?",
        answer:
            "No. Todo se procesa en tu navegador: lo que escribes y el logo que subes no se envían a ningún servidor.",
    },
    {
        question: "¿Puedo cambiar el destino de un QR que ya imprimí?",
        answer:
            "No. Los QR estáticos no se pueden editar. Si cambia el enlace o los datos, tienes que generar un código nuevo.",
    },
    {
        question: "¿Cómo hago un QR de WhatsApp?",
        answer:
            "Elige el tipo WhatsApp, selecciona tu país y escribe tu número tal como lo marcas: el código de país se agrega solo. También puedes pegar el número completo con +. Si quieres, agrega un mensaje predefinido.",
    },
] as const;