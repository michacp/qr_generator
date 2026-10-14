export type Country = {
    iso: string;
    name: string;
    dial: string; // dígitos que se anteponen al número local
    display?: string; // cómo se muestra, si es distinto de "+dial"
};

export const DEFAULT_COUNTRY = "EC";

const RAW_COUNTRIES: Country[] = [
    { iso: "EC", name: "Ecuador", dial: "593" },
    // Argentina: WhatsApp exige el 9 después del 54 en números móviles
    { iso: "AR", name: "Argentina", dial: "549", display: "+54 9" },
    { iso: "DE", name: "Alemania", dial: "49" },
    { iso: "BO", name: "Bolivia", dial: "591" },
    { iso: "BR", name: "Brasil", dial: "55" },
    { iso: "CA", name: "Canadá", dial: "1" },
    { iso: "CL", name: "Chile", dial: "56" },
    { iso: "CO", name: "Colombia", dial: "57" },
    { iso: "CR", name: "Costa Rica", dial: "506" },
    { iso: "SV", name: "El Salvador", dial: "503" },
    { iso: "ES", name: "España", dial: "34" },
    { iso: "US", name: "Estados Unidos", dial: "1" },
    { iso: "FR", name: "Francia", dial: "33" },
    { iso: "GT", name: "Guatemala", dial: "502" },
    { iso: "HN", name: "Honduras", dial: "504" },
    { iso: "IT", name: "Italia", dial: "39" },
    { iso: "MX", name: "México", dial: "52" },
    { iso: "NI", name: "Nicaragua", dial: "505" },
    { iso: "PA", name: "Panamá", dial: "507" },
    { iso: "PY", name: "Paraguay", dial: "595" },
    { iso: "PE", name: "Perú", dial: "51" },
    { iso: "PT", name: "Portugal", dial: "351" },
    { iso: "GB", name: "Reino Unido", dial: "44" },
    { iso: "DO", name: "República Dominicana", dial: "1" },
    { iso: "UY", name: "Uruguay", dial: "598" },
    { iso: "VE", name: "Venezuela", dial: "58" },
];

// Ecuador primero y el resto en orden alfabético
export const COUNTRIES: Country[] = [...RAW_COUNTRIES].sort((a, b) => {
    if (a.iso === DEFAULT_COUNTRY) return -1;
    if (b.iso === DEFAULT_COUNTRY) return 1;
    return a.name.localeCompare(b.name, "es");
});

export function getCountry(iso: string): Country {
    return COUNTRIES.find((c) => c.iso === iso) ?? COUNTRIES[0];
}

export function countryLabel(country: Country): string {
    return `${country.name} (${country.display ?? `+${country.dial}`})`;
}