# Génère une "assiette" SVG (vue de dessus, fond transparent) par étape du parcours.
# Les images sont locales : aucun serveur tiers, donc rien à déclarer côté RGPD.
import pathlib

out = pathlib.Path(__file__).resolve().parent.parent / "public" / "images" / "plates"
out.mkdir(parents=True, exist_ok=True)

plates = {
    "bac-pro": ("2019", "2022"),
    "bts-se": ("2024", "2025"),
    "kart": ("FÉV.", "MAI 25"),
    "smart-moov": ("JUIN", "JUIL. 25"),
    "bts-sio": ("2025", "2027"),
    "ipssi": ("NOV.", "DÉC. 25"),
}

TEMPLATE = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <circle cx="200" cy="200" r="186" fill="#f4f6f2" stroke="#0a0a0a" stroke-width="8"/>
  <circle cx="200" cy="200" r="146" fill="none" stroke="#0a0a0a" stroke-width="3" stroke-dasharray="10 8"/>
  <circle cx="200" cy="200" r="104" fill="#0a0a0a"/>
  <text x="200" y="196" text-anchor="middle" font-family="Impact, 'Arial Black', sans-serif" font-size="46" fill="#f4f6f2">{a}</text>
  <text x="200" y="244" text-anchor="middle" font-family="Impact, 'Arial Black', sans-serif" font-size="40" fill="#f4f6f2">{b}</text>
</svg>
"""

for name, (a, b) in plates.items():
    (out / f"{name}.svg").write_text(TEMPLATE.format(a=a, b=b), encoding="utf-8")
print("ok", len(plates))
