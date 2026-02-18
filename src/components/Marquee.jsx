const COUNTRIES = [
    '🇺🇸 United States',
    '🇬🇧 United Kingdom',
    '🇩🇪 Germany',
    '🇫🇷 France',
    '🇯🇵 Japan',
    '🇦🇺 Australia',
    '🇨🇦 Canada',
    '🇦🇪 UAE',
    '🇸🇦 Saudi Arabia',
    '🇧🇷 Brazil',
    '🇰🇷 South Korea',
    '🇸🇬 Singapore',
    '🇳🇱 Netherlands',
    '🇮🇹 Italy',
    '🇪🇸 Spain',
    '🇲🇾 Malaysia',
    '🇿🇦 South Africa',
    '🇰🇪 Kenya',
    '🇳🇬 Nigeria',
    '🇲🇽 Mexico',
];

export default function Marquee() {
    const items = [...COUNTRIES, ...COUNTRIES];

    return (
        <div className="relative py-6 bg-bg-mid border-y border-[var(--border-gold)] overflow-hidden">
            <div className="marquee-track">
                {items.map((country, i) => (
                    <span
                        key={i}
                        className="flex-shrink-0 px-8 font-body text-sm text-muted tracking-wider whitespace-nowrap"
                    >
                        {country}
                    </span>
                ))}
            </div>
        </div>
    );
}
